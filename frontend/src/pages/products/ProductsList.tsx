import React from "react";
import { ProductCard } from "./ProductCard";
import type { Product, Category, StockStatus } from "./ProductCard";

const CATEGORIES: Category[] = ["Khai Vị", "Món Chính", "Tráng Miệng", "Đồ Uống"];


const STOCK_LABEL: Record<StockStatus, string> = {
  in: "Còn Hàng",
  low: "Sắp Hết",
  out: "Hết Hàng",
};

interface ProductListProps {
  products: Product[]; // Các món ăn sau khi lọc để hiển thị
  totalProducts: number; // Tổng số món ăn ban đầu (chưa lọc)
  activeCategory: Category | "Tất Cả";
  onCategoryChange: (cat: Category | "Tất Cả") => void;
  search: string;
  onSearchChange: (search: string) => void;
  viewMode: "table" | "grid";
  onViewModeChange: (mode: "table" | "grid") => void;
  onAddProduct?: () => void;
  onEditProduct?: (product: Product) => void;
  onDeleteProduct?: (id: string) => void;
}

export const ProductList: React.FC<ProductListProps> = ({
  products,
  totalProducts,
  activeCategory,
  onCategoryChange,
  search,
  onSearchChange,
  viewMode,
  onViewModeChange,
  onAddProduct,
  onEditProduct,
  onDeleteProduct,
}) => {
  const stockBadgeStyle = (status: StockStatus) => {
    switch (status) {
      case "in":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "low":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "out":
        return "bg-rose-50 text-rose-700 border-rose-200";
      default:
        return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  const stockDotStyle = (status: StockStatus) => {
    switch (status) {
      case "in":
        return "bg-emerald-500";
      case "low":
        return "bg-amber-500";
      case "out":
        return "bg-rose-500";
      default:
        return "bg-slate-400";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Controls */}
      <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
        {/* Category Tabs */}
        <div className="flex flex-wrap gap-1.5 order-2 md:order-1">
          {(["Tất Cả", ...CATEGORIES] as const).map((cat) => (
            <button
              key={cat}
              type="button"
              className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all duration-200 cursor-pointer ${
                activeCategory === cat
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/15"
                  : "bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-slate-900"
              }`}
              onClick={() => onCategoryChange(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Right-side search, view switch, and add product btn */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto order-1 md:order-2 justify-end">
          {/* Search bar */}
          <div className="relative w-full sm:w-60">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-slate-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="11" cy="11" r="7" strokeWidth="2" />
                <path d="M21 21l-4.3-4.3" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </span>
            <input
              type="text"
              placeholder="Tìm món ăn..."
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs text-slate-700 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
            />
          </div>

          {/* Toggle View Mode and Add Button */}
          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
            {/* View Switcher */}
            <div className="bg-slate-50 p-1 rounded-xl border border-slate-200 flex items-center">
              <button
                type="button"
                onClick={() => onViewModeChange("table")}
                className={`p-1.5 rounded-lg transition-all duration-200 cursor-pointer ${
                  viewMode === "table"
                    ? "bg-white text-indigo-600 shadow-xs"
                    : "text-slate-400 hover:text-slate-600"
                }`}
                title="Dạng bảng"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => onViewModeChange("grid")}
                className={`p-1.5 rounded-lg transition-all duration-200 cursor-pointer ${
                  viewMode === "grid"
                    ? "bg-white text-indigo-600 shadow-xs"
                    : "text-slate-400 hover:text-slate-600"
                }`}
                title="Dạng lưới"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
                </svg>
              </button>
            </div>

            {/* Add product button */}
            <button
              onClick={onAddProduct}
              className="bg-indigo-600 hover:bg-indigo-700 active:scale-98 text-white font-bold py-2 px-4 rounded-xl flex items-center gap-2 text-xs transition-all duration-200 cursor-pointer shadow-lg shadow-indigo-600/10"
              type="button"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                width={14}
                height={14}
              >
                <path d="M12 5v14M5 12h14" />
              </svg>
              Thêm Món Mới
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      {products.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-xs py-16 px-4 text-center">
          <svg
            className="w-12 h-12 text-slate-300 mx-auto mb-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
            />
          </svg>
          <h3 className="font-semibold text-slate-700 text-sm">Không tìm thấy món ăn phù hợp</h3>
          <p className="text-xs text-slate-400 mt-1">
            Vui lòng thử lại với từ khóa khác hoặc thay đổi bộ lọc danh mục.
          </p>
        </div>
      ) : viewMode === "table" ? (
        /* Table View */
        <div className="bg-white rounded-2xl border border-slate-100 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 text-slate-400 text-[10px] font-bold uppercase tracking-wider border-b border-slate-100">
                  <th className="px-6 py-4">Món Ăn</th>
                  <th className="px-6 py-4">Danh Mục</th>
                  <th className="px-6 py-4">Giá</th>
                  <th className="px-6 py-4">Tồn Kho</th>
                  <th className="px-6 py-4">Cập Nhật</th>
                  <th className="px-6 py-4 text-center">Thao Tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs text-slate-600">
                {products.map((p) => {
                  const isImageUrl =
                    p.thumbColor.startsWith("http") ||
                    p.thumbColor.startsWith("/") ||
                    p.thumbColor.startsWith("data:");

                  return (
                    <tr key={p.id} className="hover:bg-slate-50/40 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          {isImageUrl ? (
                            <img
                              src={p.thumbColor}
                              alt={p.name}
                              className="w-10 h-10 rounded-xl object-cover border border-slate-100 shrink-0"
                            />
                          ) : (
                            <div
                              className="w-10 h-10 rounded-xl border border-slate-100 shrink-0"
                              style={{ background: p.thumbColor }}
                            />
                          )}
                          <div>
                            <div className="font-bold text-slate-800 text-xs">{p.name}</div>
                            <div className="text-[10px] text-slate-400 line-clamp-1 max-w-[200px] mt-0.5">
                              {p.description}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-semibold text-slate-500">{p.category}</td>
                      <td className="px-6 py-4 font-bold text-indigo-600">{p.price}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[10px] font-semibold border ${stockBadgeStyle(
                            p.stockStatus
                          )}`}
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${stockDotStyle(p.stockStatus)}`} />
                          {STOCK_LABEL[p.stockStatus]} ({p.stock})
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-400 font-medium">{p.updatedAt}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => onEditProduct?.(p)}
                            className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all duration-200"
                            type="button"
                            title="Sửa"
                          >
                            <svg
                              className="w-4 h-4"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M12 20h9" />
                              <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" />
                            </svg>
                          </button>
                          <button
                            onClick={() => onDeleteProduct?.(p.id)}
                            className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-all duration-200"
                            type="button"
                            title="Xoá"
                          >
                            <svg
                              className="w-4 h-4"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M3 6h18" />
                              <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0-1 14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2L4 6" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Grid View */
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onEdit={onEditProduct}
              onDelete={onDeleteProduct}
            />
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      <div className="bg-white px-6 py-4 rounded-2xl border border-slate-100 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <span className="text-xs text-slate-400 font-medium">
          Hiển thị <span className="font-bold text-slate-700">{products.length}</span> trong tổng số{" "}
          <span className="font-bold text-slate-700">{totalProducts}</span> món
        </span>
        <div className="flex items-center gap-1">
          <button
            type="button"
            className="w-8 h-8 rounded-lg text-xs font-semibold flex items-center justify-center bg-indigo-600 text-white shadow-sm shadow-indigo-600/10 cursor-pointer"
          >
            1
          </button>
          <button
            type="button"
            className="w-8 h-8 rounded-lg text-xs font-semibold flex items-center justify-center hover:bg-slate-50 text-slate-600 hover:text-slate-800 transition-colors cursor-pointer"
          >
            2
          </button>
          <button
            type="button"
            className="w-8 h-8 rounded-lg text-xs font-semibold flex items-center justify-center hover:bg-slate-50 text-slate-600 hover:text-slate-800 transition-colors cursor-pointer"
          >
            3
          </button>
        </div>
      </div>
    </div>
  );
};
