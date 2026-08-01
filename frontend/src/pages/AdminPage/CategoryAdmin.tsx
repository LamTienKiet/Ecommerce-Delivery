import { CategoryStats } from "./components/categories/CategoryStats";
import { CategoryToolbar } from "./components/categories/CategoryToolbar";
import { CategoryTable } from "./components/categories/CategoryTable";
import React, { useEffect, useState } from "react";
import type {
  CategoryResponse,
  CreateCategoryRequest,
} from "../../type_auth_api/category/category.api";
export const CategoryAdmin = () => {
  const [categories, setCategories] = useState<CategoryResponse[]>([]);
  const [loading, setLoading] = useState<boolean | null>(false);
  const [error, setError] = useState<string | null>("");
  const [formData, setFormData] = useState<CreateCategoryRequest>({
    name: "",
    description: "",
  });
  const [isUploading, setIsUploading] = useState<boolean>(false);
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

  const handleCloseModal = () => {};

  const handleOpenEditModal = () => {};

  const handleDeleteProduct = () => {};

  const handleFormSubmit = () => {};

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  <div className="space-y-6 animate-fade-in text-slate-800">
    <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
      <div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
          Quản Lý Thực Đơn
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Danh sách món ăn, cấu hình giá, thời gian chuẩn bị và trạng thái phục
          vụ.
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
    <CategoryStats total={total} />

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
              {modalMode === "create" ? "Thêm Món Ăn Mới" : "Chỉnh Sửa Món Ăn"}
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
  </div>;
};
