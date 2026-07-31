import { useEffect, useState } from "react";
import type {
  ProductResponse,
  CreateProductRequest,
  UpdateProductRequest,
} from "../../type_auth_api/products/product.api";
import type {
  CategoryResponse,
  CreateCategoryRequest,
} from "../../type_auth_api/category/category.api";
import { getCategory } from "../../services/category.service";
import { createProducts, getProducts } from "../../services/product.service";
import { ProductStats } from "./components/ProductStats";
import { ProductToolbar } from "./components/ProductToolbar";
import { ProductTable } from "./components/ProductTable";
import { create } from "axios";

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

  // Khai báo state phục vụ bộ lọc & tìm kiếm (Tự phát triển logic lọc sau)
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");

  // Khai báo state phục vụ modal thêm/sửa (Tự phát triển logic CRUD sau)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");

  // Tải dữ liệu thực tế từ Database
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError(null);
        const [productsData, categoriesData] = await Promise.all([
          getProducts(),
          getCategory(),
        ]);

        setProducts(productsData);
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
  }, []);

  // Tính toán nhanh chỉ số thống kê
  const total = products.length;
  const available = products.filter((p) => p.isAvailable).length;
  const unavailable = total - available;
  const totalCategories = categories.length;

  // useEffect(()=>{
  //   async function (params:type) {

  //   }
  // })

  const handleOpenCreateModal = () => {
    setModalMode("create");
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (product: ProductResponse) => {
    setModalMode("edit");
    console.log("Edit product: ", product);
    setIsModalOpen(true);
  };

  const handleDeleteProduct = (id: number) => {
    console.log("Delete product ID: ", id);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
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
          : type === "number"
            ? Number(value)
            : value,
    });
  };

  const handleCreateProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate
    if (!formData.name.trim()) {
      return alert("Tên không được để trống");
    }

    if (formData.name.length < 5) {
      return alert("Tên món ăn quá ngắn");
    }

    if (formData.price <= 0) {
      return alert("Giá tiền phải lớn hơn 0");
    }

    if (formData.preparationTime < 5) {
      return alert("Thời gian chuẩn bị ít nhất phải 5 phút");
    }

    if (!formData.imageUrl.trim()) {
      return alert("Vui lòng nhập link ảnh");
    }

    if (formData.categoryId === 0) {
      return alert("Vui lòng chọn danh mục");
    }

    if (!formData.description.trim()) {
      return alert("Vui lòng nhập mô tả");
    }

    try {
      const newProduct = await createProducts(formData);
      setProducts((prev) => [...prev, newProduct]);

      setFormData({
        name: "",
        description: "",
        imageUrl: "",
        price: 0,
        isAvailable: true,
        preparationTime: 15,
        categoryId: 0,
      });

      setIsModalOpen(false);

      alert("Thêm sản phẩm thành công!");
    } catch (err) {
      console.error(err);
      setError("Không thể thêm sản phẩm.");
    }
  };

  const handleEditProduct = (e: React.FormEvent<UpdateProductRequest>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
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

      {/* Table section (Truyền thẳng dữ liệu DB, không lọc) */}
      <ProductTable
        products={products}
        categories={categories}
        onEdit={handleOpenEditModal}
        onDelete={handleDeleteProduct}
      />

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
              onSubmit={handleCreateProduct}
            >
              {/* Name */}
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                  Tên món ăn <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
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
                    required
                    min={0}
                    value={formData.price}
                    onChange={handleChange}
                    defaultValue={0}
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
                    min={5}
                    defaultValue={15}
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
                        defaultChecked
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

              {/* Image URL */}
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                  Link ảnh món ăn
                </label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  value={formData.imageUrl}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 bg-slate-50/50"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                  Mô tả chi tiết
                </label>
                <textarea
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
                  type="submit"
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
