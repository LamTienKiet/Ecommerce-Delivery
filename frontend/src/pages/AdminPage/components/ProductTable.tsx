import type { ProductResponse } from "../../../type_auth_api/products/product.api";
import type { CategoryResponse } from "../../../type_auth_api/category/category.api";
import { getImageUrl } from "../../../utils/image";

interface ProductTableProps {
  products: ProductResponse[];
  categories: CategoryResponse[];
  onEdit?: (product: ProductResponse) => void;
  onDelete?: (id: number) => void;
}

export const ProductTable = ({
  products,
  categories,
  onEdit,
  onDelete,
}: ProductTableProps) => {
  // Helper to map category names and styles
  const getCategoryLabel = (catId: number) => {
    const category = categories.find((c) => c.id === catId);
    const label = category ? category.name : "Khác";

    switch (catId) {
      case 1:
        return {
          label,
          bg: "bg-blue-50 text-blue-700 border-blue-100",
        };
      case 2:
        return {
          label,
          bg: "bg-indigo-50 text-indigo-700 border-indigo-100",
        };
      case 3:
        return {
          label,
          bg: "bg-purple-50 text-purple-700 border-purple-100",
        };
      case 4:
        return {
          label,
          bg: "bg-amber-50 text-amber-700 border-amber-100",
        };
      default:
        return {
          label,
          bg: "bg-slate-50 text-slate-700 border-slate-100",
        };
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/75 border-b border-slate-100 text-slate-400 text-xs font-bold uppercase tracking-wider">
              <th className="px-6 py-4">Món Ăn</th>
              <th className="px-6 py-4">Danh Mục</th>
              <th className="px-6 py-4 text-right">Giá Bán</th>
              <th className="px-6 py-4 text-center">Chuẩn Bị</th>
              <th className="px-6 py-4 text-center">Trạng Thái</th>
              <th className="px-6 py-4 text-center">Hành Động</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm text-slate-600">
            {products.map((p) => {
              const cat = getCategoryLabel(p.categoryId);
              return (
                <tr
                  key={p.id}
                  className="hover:bg-slate-50/50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3.5">
                      <img
                        src={getImageUrl(p.imageUrl)}
                        alt={p.name}
                        className="w-12 h-12 rounded-xl object-cover shadow-sm border border-slate-200/50"
                      />
                      <div>
                        <h4 className="font-bold text-slate-900 text-base">
                          {p.name}
                        </h4>
                        <p className="text-xs text-slate-400 mt-0.5 line-clamp-1 max-w-sm">
                          {p.description}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${cat.bg}`}
                    >
                      {cat.label}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right font-extrabold text-slate-900 text-base">
                    {p.price.toLocaleString("vi-VN")}đ
                  </td>
                  <td className="px-6 py-4 text-center font-medium">
                    ⏱ {p.preparationTime} phút
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${
                        p.isAvailable
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-250"
                          : "bg-rose-50 text-rose-700 border border-rose-250"
                      }`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${p.isAvailable ? "bg-emerald-500" : "bg-rose-500"}`}
                      />
                      {p.isAvailable ? "Còn hàng" : "Hết hàng"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center space-x-2">
                      <button
                        title="Sửa"
                        onClick={() => onEdit?.(p)}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-indigo-600 hover:bg-slate-100 transition"
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
                            strokeWidth="2"
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                          />
                        </svg>
                      </button>
                      <button
                        title="Xóa"
                        onClick={() => onDelete?.(p.id)}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-slate-100 transition"
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
                            strokeWidth="2"
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
            {products.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="text-center py-10 text-slate-400 font-medium"
                >
                  Không tìm thấy món ăn nào khớp với bộ lọc.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
