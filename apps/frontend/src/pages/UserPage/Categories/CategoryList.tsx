import { useEffect, useState } from "react";
import { getCategory } from "../../../services/category.service";
import type { CategoryResponse } from "../../../type_auth_api/category/category.api";
import { CategoryCard } from "./CategoryCard";

export const CategoryList = () => {
  const [categories, setCategories] = useState<CategoryResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("name-asc");

  useEffect(() => {
    async function fetchCategories() {
      try {
        setLoading(true);
        setError(null);
        const data = await getCategory();
        setCategories(data || []);
      } catch (err) {
        console.error("Failed to fetch categories from database:", err);
        setError(
          "Không thể tải danh sách danh mục từ cơ sở dữ liệu. Vui lòng kiểm tra lại kết nối máy chủ.",
        );
      } finally {
        setLoading(false);
      }
    }
    fetchCategories();
  }, []);

  // Filter categories by search term
  const filteredCategories = categories.filter((cat) => {
    const term = searchTerm.toLowerCase();
    return (
      cat.name.toLowerCase().includes(term) ||
      (cat.description && cat.description.toLowerCase().includes(term))
    );
  });

  // Sort categories
  const sortedCategories = [...filteredCategories].sort((a, b) => {
    if (sortBy === "name-asc") {
      return a.name.localeCompare(b.name, "vi");
    }
    if (sortBy === "name-desc") {
      return b.name.localeCompare(a.name, "vi");
    }
    return 0;
  });

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-4">
        <div className="w-12 h-12 border-4 border-[#B7913C] border-t-transparent rounded-full animate-spin"></div>
        <p className="text-[#A9B4A4] font-medium tracking-wide">
          Đang tải danh mục thượng hạng...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20 border border-rose-900/40 bg-rose-950/10 rounded-2xl max-w-2xl mx-auto px-6">
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
        <h3 className="text-lg font-serif text-[#F1E9D8] font-medium">
          Lỗi kết nối máy chủ
        </h3>
        <p className="text-sm text-[#A9B4A4]/80 mt-2">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-emerald-950/60 border border-[#2a3c31] px-5 py-2.5 text-sm font-semibold text-[#B7913C] hover:bg-[#B7913C] hover:text-[#121B16] transition-all duration-300"
        >
          Tải lại trang
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Category Toolbar (Search and Sort) */}
      <div className="border border-[#2a3c31] bg-[#16251e] rounded-2xl p-6 flex flex-col md:flex-row items-center gap-4 justify-between shadow-xl">
        {/* Search Input */}
        <div className="relative w-full md:flex-1 min-w-[280px]">
          <span className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
            <svg
              className="w-5 h-5 text-[#A9B4A4]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </span>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Tìm kiếm danh mục thực đơn..."
            className="w-full rounded-xl border border-[#2a3c31] bg-[#121B16] pl-11 pr-4 py-3 text-[#F1E9D8] placeholder:text-[#6C7A6F] outline-none focus:border-[#B7913C] focus:ring-1 focus:ring-[#B7913C] transition duration-200 text-sm"
          />
        </div>

        {/* Sort Controls */}
        <div className="w-full md:w-auto">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full rounded-xl border border-[#2a3c31] bg-[#121B16] px-4 py-3 text-[#F1E9D8] outline-none focus:border-[#B7913C] text-sm cursor-pointer transition duration-200"
          >
            <option value="name-asc">Sắp xếp tên: A-Z</option>
            <option value="name-desc">Sắp xếp tên: Z-A</option>
          </select>
        </div>
      </div>

      {/* Grid List */}
      {sortedCategories.length > 0 ? (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {sortedCategories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 border border-dashed border-[#2a3c31] rounded-2xl">
          <svg
            className="w-12 h-12 mx-auto text-[#6C7A6F] mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h3 className="text-lg font-serif text-[#F1E9D8] font-medium">
            Không tìm thấy danh mục
          </h3>
          <p className="text-sm text-[#A9B4A4] mt-2">
            Quý khách vui lòng thử tìm kiếm với từ khóa khác.
          </p>
        </div>
      )}
    </div>
  );
};
