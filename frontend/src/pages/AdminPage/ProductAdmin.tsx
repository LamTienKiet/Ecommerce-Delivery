import { useEffect, useState } from "react";
import type {
  ProductResponse,
  CreateProductRequest,
} from "../../type_auth_api/products/product.api";
import type { CategoryResponse } from "../../type_auth_api/category/category.api";
import { getCategory } from "../../services/category.service";
import {
  createProducts,
  getProducts,
  updateProduct,
  deleteProduct,
  uploadProductImage,
} from "../../services/product.service";
import { getImageUrl } from "../../utils/image";
import { ProductStats } from "./components/products/ProductStats";
import { ProductToolbar } from "./components/products/ProductToolbar";
import { ProductTable } from "./components/products/ProductTable";
import toast from "react-hot-toast";

export const ProductAdmin = () => {
  const [products, setProducts] = useState<ProductResponse[]>([]);
  const [categories, setCategories] = useState<CategoryResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<CreateProductRequest>({
    name: "",
    description: "",
    imageUrl: "",
    price: 0,
    isAvailable: true,
    preparationTime: 15,
    categoryId: 1,
  });
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [editingProductId, setEditingProductId] = useState<number | null>(null);

  // Khai báo state phục vụ bộ lọc & tìm kiếm
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");

  // Khai báo state phục vụ modal thêm/sửa
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");

  // Khai báo state phục vụ phân trang
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  // Tải dữ liệu thực tế từ Database
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError(null);
        const [productsData, categoriesData] = await Promise.all([
          getProducts(currentPage, 10), // Phân trang 10 sản phẩm/trang
          getCategory(),
        ]);

        setProducts(productsData.data);
        setTotalPages(productsData.meta.totalPages);
        setCategories(categoriesData);
      } catch (err) {
        console.error("Failed to fetch data from Database", err);
        setError(
          "Không thể tải danh sách món ăn từ cơ sở dữ liệu. Vui lòng kiểm tra lại",
        );
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [currentPage]);

  // Tính toán nhanh chỉ số thống kê
  const total = products.length;
  const available = products.filter((p) => p.isAvailable).length;
  const unavailable = total - available;
  const totalCategories = categories.length;

  // Lọc sản phẩm theo các bộ lọc của ProductToolbar
  const filteredProducts = products.filter((product) => {
    // 1. Lọc theo từ khóa tìm kiếm (tên hoặc mô tả)
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (product.description &&
        product.description.toLowerCase().includes(searchTerm.toLowerCase()));

    // 2. Lọc theo danh mục (category) từ DB
    const matchesCategory =
      selectedCategory === "all" ||
      product.categoryId === Number(selectedCategory);

    // 3. Lọc theo trạng thái phục vụ
    const matchesStatus =
      selectedStatus === "all" ||
      (selectedStatus === "available" && product.isAvailable) ||
      (selectedStatus === "unavailable" && !product.isAvailable);

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleOpenCreateModal = () => {
    setModalMode("create");
    setEditingProductId(null);
    setFormData({
      name: "",
      description: "",
      imageUrl: "",
      price: 0,
      isAvailable: true,
      preparationTime: 15,
      categoryId: categories[0]?.id || 1,
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (product: ProductResponse) => {
    setModalMode("edit");
    setEditingProductId(product.id);
    setFormData({
      name: product.name,
      description: product.description,
      imageUrl: product.imageUrl,
      price: product.price,
      isAvailable: product.isAvailable,
      preparationTime: product.preparationTime,
      categoryId: product.categoryId,
    });
    setIsModalOpen(true);
  };

  const handleDeleteProduct = async (id: number) => {
    toast.custom((t) => (
      <div className={`${t.visible ? 'animate-enter' : 'animate-leave'} max-w-sm w-full bg-white shadow-2xl rounded-2xl pointer-events-auto flex flex-col ring-1 ring-black/5 overflow-hidden`}>
        <div className="p-5">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center">
              <svg className="w-5 h-5 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
            </div>
            <div className="flex-1 pt-0.5">
              <p className="text-sm font-bold text-slate-900">Xác nhận xóa</p>
              <p className="mt-1.5 text-sm text-slate-500 leading-relaxed">Bạn có chắc chắn muốn xóa món ăn này không? Hành động này không thể hoàn tác.</p>
            </div>
          </div>
        </div>
        <div className="flex border-t border-slate-100 bg-slate-50">
          <button 
            onClick={async () => { 
              toast.dismiss(t.id); 
              try {
                await deleteProduct(id);
                setProducts((prev) => prev.filter((p) => p.id !== id));
                toast.success("Xóa món ăn thành công!");
              } catch (err) {
                console.error("Failed to delete product:", err);
                toast.error("Không thể xóa món ăn. Vui lòng thử lại!");
              }
            }} 
            className="w-full border-r border-slate-100 px-4 py-3.5 flex items-center justify-center text-sm font-bold text-rose-600 hover:bg-rose-100 hover:text-rose-700 transition-colors"
          >
            Xác nhận Xóa
          </button>
          <button 
            onClick={() => toast.dismiss(t.id)} 
            className="w-full px-4 py-3.5 flex items-center justify-center text-sm font-bold text-slate-600 hover:bg-slate-200 transition-colors"
          >
            Hủy Bỏ
          </button>
        </div>
      </div>
    ), { duration: Infinity, position: 'top-center' });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProductId(null);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]:
        type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : name === "categoryId" || type === "number"
            ? Number(value)
            : value,
    });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Chỉ chấp nhận file ảnh!");
      return;
    }

    try {
      setIsUploading(true);
      const res = await uploadProductImage(file);
      setFormData((prev) => ({
        ...prev,
        imageUrl: res.url,
      }));
    } catch (err) {
      console.error("Upload failed:", err);
      toast.error("Tải ảnh lên thất bại. Vui lòng thử lại!");
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveImage = () => {
    setFormData((prev) => ({
      ...prev,
      imageUrl: "",
    }));
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate
    if (!formData.name.trim()) {
      toast.error("Tên không được để trống");
      return;
    }

    if (formData.name.length < 5) {
      toast.error("Tên món ăn quá ngắn");
      return;
    }

    if (formData.price <= 0) {
      toast.error("Giá tiền phải lớn hơn 0");
      return;
    }

    if (formData.preparationTime < 5) {
      toast.error("Thời gian chuẩn bị ít nhất phải 5 phút");
      return;
    }

    if (!formData.imageUrl.trim()) {
      toast.error("Vui lòng tải lên ảnh món ăn");
      return;
    }

    if (!formData.categoryId) {
      toast.error("Vui lòng chọn danh mục");
      return;
    }

    if (!formData.description.trim()) {
      toast.error("Vui lòng nhập mô tả");
      return;
    }

    try {
      if (modalMode === "create") {
        const newProduct = await createProducts(formData);
        setProducts((prev) => [...prev, newProduct]);
        toast.success("Thêm sản phẩm thành công!");
      } else {
        if (editingProductId === null) return;
        const updatedProduct = await updateProduct(editingProductId, formData);
        setProducts((prev) =>
          prev.map((p) => (p.id === editingProductId ? updatedProduct : p)),
        );
        toast.success("Cập nhật sản phẩm thành công!");
      }

      setFormData({
        name: "",
        description: "",
        imageUrl: "",
        price: 0,
        isAvailable: true,
        preparationTime: 15,
        categoryId: categories[0]?.id || 1,
      });
      setEditingProductId(null);
      setIsModalOpen(false);
    } catch (err) {
      console.error(err);
      toast.error(
        modalMode === "create"
          ? "Không thể thêm sản phẩm."
          : "Không thể cập nhật sản phẩm.",
      );
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-4">
        <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-slate-500 font-medium tracking-wide">
          Đang tải dữ liệu thực đơn từ Database...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20 border border-rose-100 bg-rose-50/50 rounded-2xl max-w-2xl mx-auto px-6">
        <svg
          className="w-12 h-12 mx-auto text-rose-500 mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
        <h3 className="text-lg font-bold text-slate-900">Lỗi tải dữ liệu</h3>
        <p className="text-sm text-slate-500 mt-2">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 transition"
        >
          Tải lại trang
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in text-slate-800">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
            Quản Lý Thực Đơn
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Danh sách món ăn, cấu hình giá, thời gian chuẩn bị và trạng thái
            phục vụ.
          </p>
        </div>
        <button
          onClick={handleOpenCreateModal}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-600/10 active:scale-95 duration-150"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.5"
              d="M12 4v16m8-8H4"
            />
          </svg>
          Thêm Món Mới
        </button>
      </div>

      {/* Stats row (Hiển thị chỉ số thực tế từ DB) */}
      <ProductStats
        total={total}
        available={available}
        unavailable={unavailable}
        totalCategories={totalCategories}
      />

      {/* Toolbar / Filters (Bạn tự kết nối logic lọc tại đây) */}
      <ProductToolbar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        categories={categories}
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
      />

      {/* Table section (Đã được lọc theo bộ lọc trên toolbar) */}
      <ProductTable
        products={filteredProducts}
        categories={categories}
        onEdit={handleOpenEditModal}
        onDelete={handleDeleteProduct}
      />

      {/* Giao diện Phân Trang */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center bg-white p-4 rounded-2xl border border-slate-100 shadow-sm mt-4">
          <button
            onClick={() => setCurrentPage(1)}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded-lg border border-[#2a3c31] text-[#B7913C] font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#16251e] transition-colors"
          >
            Đầu
          </button>

          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 font-medium transition"
          >
            Trang trước
          </button>

          <span className="text-slate-600 font-medium text-sm">
            Trang {currentPage} / {totalPages}
          </span>

          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 font-medium transition"
          >
            Trang sau
          </button>

          <button
            onClick={() => setCurrentPage(totalPages)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 rounded-lg border border-[#2a3c31] text-[#B7913C] font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#16251e] transition-colors"
          >
            Cuối
          </button>
        </div>
      )}

      {/* CREATE / EDIT OVERLAY MODAL (Giao diện Modal tĩnh) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm transition-opacity">
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-xl max-h-[90vh] overflow-hidden flex flex-col scale-100 transition-transform duration-300">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-extrabold text-slate-900 text-lg">
                {modalMode === "create"
                  ? "Thêm Món Ăn Mới"
                  : "Chỉnh Sửa Món Ăn"}
              </h3>
              <button
                onClick={handleCloseModal}
                className="text-slate-400 hover:text-slate-600 rounded-lg p-1.5 hover:bg-slate-50 transition"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.5"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <form
              className="flex-1 overflow-y-auto p-6 space-y-4"
              onSubmit={handleFormSubmit}
            >
              {/* Name */}
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                  Tên món ăn <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Ví dụ: Bít Tết Sốt Nấm"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 bg-slate-50/50"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Category */}
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                    Danh mục
                  </label>
                  <select
                    name="categoryId"
                    className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 bg-slate-50/50"
                    value={formData.categoryId}
                    onChange={handleChange}
                  >
                    {categories.map((cate) => (
                      <option key={cate.id} value={cate.id}>
                        {cate.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Price */}
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                    Giá bán (VND) <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="price"
                    required
                    min={0}
                    value={formData.price}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 bg-slate-50/50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Preparation Time */}
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                    Chuẩn bị (Phút)
                  </label>
                  <input
                    type="number"
                    name="preparationTime"
                    min={5}
                    value={formData.preparationTime}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 bg-slate-50/50"
                  />
                </div>

                {/* Status Toggle */}
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                    Trạng thái phục vụ
                  </label>
                  <div className="flex items-center h-[42px]">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        name="isAvailable"
                        className="sr-only peer"
                        checked={formData.isAvailable}
                        onChange={handleChange}
                      />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                      <span className="ml-3 text-sm font-semibold text-slate-700">
                        Còn hàng / Phục vụ
                      </span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Image Upload Area */}
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                  Ảnh món ăn <span className="text-rose-500">*</span>
                </label>

                {isUploading ? (
                  <div className="w-full h-40 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center space-y-2 bg-slate-50/50">
                    <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-xs text-slate-400 font-medium">
                      Đang tải ảnh lên...
                    </p>
                  </div>
                ) : formData.imageUrl ? (
                  <div className="relative w-full h-40 border border-slate-200 rounded-2xl overflow-hidden group shadow-sm bg-slate-50">
                    <img
                      src={getImageUrl(formData.imageUrl)}
                      alt="Product preview"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <label className="cursor-pointer bg-white text-slate-800 hover:bg-slate-50 p-2.5 rounded-xl shadow-md transition active:scale-95 duration-100 flex items-center gap-2 text-xs font-bold">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                          />
                        </svg>
                        Thay đổi ảnh
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          className="hidden"
                        />
                      </label>
                      <button
                        type="button"
                        onClick={handleRemoveImage}
                        className="bg-rose-600 text-white hover:bg-rose-700 p-2.5 rounded-xl shadow-md transition active:scale-95 duration-100 flex items-center gap-2 text-xs font-bold"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                        Xóa ảnh
                      </button>
                    </div>
                  </div>
                ) : (
                  <label className="border-2 border-dashed border-slate-200 hover:border-indigo-500 hover:bg-indigo-50/5 cursor-pointer rounded-2xl h-40 flex flex-col items-center justify-center p-6 text-center transition group">
                    <div className="p-3 bg-indigo-50 rounded-2xl group-hover:scale-110 duration-200 transition text-indigo-600 mb-3">
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2-2V6"
                        />
                      </svg>
                    </div>
                    <span className="text-sm font-bold text-slate-800">
                      Tải ảnh lên từ máy tính
                    </span>
                    <span className="text-xs text-slate-400 mt-1">
                      Chấp nhận JPG, PNG, GIF, WEBP
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                )}
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                  Mô tả chi tiết
                </label>
                <textarea
                  name="description"
                  placeholder="Nhập nguyên liệu, hương vị hoặc lưu ý chế biến..."
                  rows={3}
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 bg-slate-50/50 resize-none"
                />
              </div>

              {/* Modal Actions Footer */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-5 py-2.5 text-sm font-semibold text-slate-500 hover:text-slate-700 rounded-xl hover:bg-slate-100 transition duration-150"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 text-sm font-semibold text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 shadow-lg shadow-indigo-600/10 transition duration-150"
                >
                  Lưu thay đổi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
