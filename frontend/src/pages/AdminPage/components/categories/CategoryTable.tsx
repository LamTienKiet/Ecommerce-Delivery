import type { ProductResponse } from "../../../../type_auth_api/products/product.api";
import type { CategoryResponse } from "../../../../type_auth_api/category/category.api";
import { getImageUrl } from "../../../../utils/image";

interface CategoryTableProps {
  categories: CategoryResponse[];
  onEdit?: (category: CategoryResponse) => void;
  onDelete?: (id: number) => void;
}

export const CategoryTable = ({
  categories,
  onEdit,
  onDelete,
}: CategoryTableProps) => {
  // Helper to map category names and styles

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/75 border-b border-slate-100 text-slate-400 text-xs font-bold uppercase tracking-wider">
              <th className="px-6 py-4">Danh Mục</th>
              <th className="px-6 py-4 text-center">Mô Tả</th>
              <th className="px-6 py-4 text-center">Hành Động</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm text-slate-600">
            {categories.map((cate) => {
              return (
                <tr
                  key={cate.id}
                  className="hover:bg-slate-50/50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3.5">
                      <div>
                        <h4 className="font-bold text-slate-900 text-base">
                          {cate.name}
                        </h4>
                        <p className="text-xs text-slate-400 mt-0.5 line-clamp-1 max-w-sm">
                          {cate.description}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center space-x-2">
                      <button
                        title="Sửa"
                        onClick={() => onEdit?.(cate)}
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
                        onClick={() => onDelete?.(cate.id)}
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
            {categories.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="text-center py-10 text-slate-400 font-medium"
                >
                  Không tìm thấy danh mục nào khớp với bộ lọc.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
