import { CategoryStats } from "./components/categories/CategoryStats";
import { CategoryToolbar } from "./components/categories/CategoryToolbar";
import { CategoryTable } from "./components/categories/CategoryTable";
import React, { useEffect, useState } from "react";
import type {
  CategoryResponse,
  CreateCategoryRequest,
} from "../../type_auth_api/category/category.api";
import toast from "react-hot-toast";

import {
  createCategory,
  deleteCategory,
  getCategory,
  updateCategory,
} from "../../services/category.service";
export const CategoryAdmin = () => {
  const [categories, setCategories] = useState<CategoryResponse[]>([]);
  const [loading, setLoading] = useState<boolean | null>(false);
  const [error, setError] = useState<string | null>("");
  const [formData, setFormData] = useState<CreateCategoryRequest>({
    name: "",
    description: "",
  });
  const [editingCategoryId, setEditingCategoryId] = useState<number | null>(
    null,
  );
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");

  const handleOpenCreateModal = () => {
    setModalMode("create");
    setEditingCategoryId(null);
    setFormData({
      name: "",
      description: "",
    });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleOpenEditModal = (category: CategoryResponse) => {
    setModalMode("edit");
    setEditingCategoryId(category.id);
    setFormData({
      name: category.name,
      description: category.description,
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
              <p className="mt-1.5 text-sm text-slate-500 leading-relaxed">Bạn có chắc chắn muốn xóa danh mục này không? Hành động này không thể hoàn tác.</p>
            </div>
          </div>
        </div>
        <div className="flex border-t border-slate-100 bg-slate-50">
          <button 
            onClick={async () => { 
              toast.dismiss(t.id); 
              try {
                await deleteCategory(id);
                setCategories((prev) => prev.filter((c) => c.id !== id));
                toast.success("Xóa danh mục thành công!");
              } catch (err) {
                console.error("Failed to delete category", err);
                setError("Không thể xóa danh mục");
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

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      toast.error("Tên không được để trống");
      return;
    }
    if (!formData.description.trim()) {
      toast.error("Vui lòng nhập mô tả");
      return;
    }

    try {
      if (modalMode === "create") {
        const newCategory = await createCategory(formData);
        setCategories((prev) => [...prev, newCategory]);
        toast.success("Thêm danh mục mới thành công");
      } else {
        if (editingCategoryId === null) return;
        const updatedCategory = await updateCategory(
          editingCategoryId,
          formData,
        );
        setCategories((prev) =>
          prev.map((c) => (c.id === editingCategoryId ? updatedCategory : c)),
        );
        toast.success("Cập danh mục thành công");
      }
      setIsModalOpen(false);
    } catch (err) {
      console.error(err);
      toast.error(
        modalMode === "create"
          ? "Không thể thêm danh mục."
          : "Không thể cập nhật danh mục.",
      );
    }
  };

  useEffect(() => {
    async function fetchCategories() {
      try {
        setLoading(true);
        setError(null);
        const data = await getCategory();
        setCategories(data);
      } catch (err) {
        console.error("Failed to fetch data from Database", err);
        setError(
          "Không thể tải danh sách danh mục từ cơ sở dữ liệu. Vui lòng kiểm tra lại",
        );
      } finally {
        setLoading(false);
      }
    }
    fetchCategories();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-4">
        <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-slate-500 font-medium tracking-wide">
          Đang tải dữ liệu danh mục từ Database...
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
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
            Quản Lý Danh Mục
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Danh sách các danh mục thực đơn và mô tả chi tiết.
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
          Thêm Danh Mục Mới
        </button>
      </div>

      {/* Stats row (Hiển thị chỉ số thực tế từ DB) */}
      <CategoryStats total={categories.length} />

      {/* Toolbar / Filters (Bạn tự kết nối logic lọc tại đây) */}
      <CategoryToolbar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        categories={categories}
      />

      {/* Table section (Truyền thẳng dữ liệu DB, không lọc) */}
      <CategoryTable
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
                  ? "Thêm Danh Mục Mới"
                  : "Chỉnh Sửa Danh Mục"}
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
                  Tên danh mục <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Ví dụ: Món Khai Vị"
                  value={formData.name}
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
                  name="description"
                  placeholder="Nhập mô tả cho danh mục này..."
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
