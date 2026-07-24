import React from "react";

export type Category = "Khai Vị" | "Món Chính" | "Tráng Miệng" | "Đồ Uống";
export type StockStatus = "in" | "low" | "out";

export interface Product {
  id: string;
  name: string;
  description: string;
  category: Category;
  price: string;
  stock: number;
  stockStatus: StockStatus;
  updatedAt: string;
  thumbColor: string; // placeholder cho ProductImage — thay bằng image URL khi có ảnh thật
}

interface ProductCardProps {
  product: Product;
  onEdit?: (product: Product) => void;
  onDelete?: (id: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onEdit,
  onDelete,
}) => {
  // Kiểm tra xem thumbColor là URL ảnh hay là mã màu/gradient
  const isImageUrl =
    product.thumbColor.startsWith("http") ||
    product.thumbColor.startsWith("/") ||
    product.thumbColor.startsWith("data:");

  const statusConfig = {
    in: {
      bg: "bg-emerald-50 text-emerald-700 border-emerald-200",
      dot: "bg-emerald-500",
      label: "Còn Hàng",
    },
    low: {
      bg: "bg-amber-50 text-amber-700 border-amber-200",
      dot: "bg-amber-500",
      label: "Sắp Hết",
    },
    out: {
      bg: "bg-rose-50 text-rose-700 border-rose-200",
      dot: "bg-rose-500",
      label: "Hết Hàng",
    },
  };

  const currentStatus = statusConfig[product.stockStatus] || statusConfig.in;

  return (
    <div className="group bg-white rounded-2xl border border-slate-100 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col h-full">
      {/* Thumbnail Container */}
      <div className="relative aspect-video w-full overflow-hidden bg-slate-100 flex items-center justify-center">
        {isImageUrl ? (
          <img
            src={product.thumbColor}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div
            className="w-full h-full group-hover:scale-105 transition-transform duration-500"
            style={{ background: product.thumbColor }}
          />
        )}

        {/* Category Badge */}
        <span className="absolute top-3 left-3 bg-slate-900/75 backdrop-blur-xs text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md shadow-xs">
          {product.category}
        </span>

        {/* Stock Badge */}
        <span
          className={`absolute top-3 right-3 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[11px] font-semibold bg-white/90 backdrop-blur-xs shadow-xs border ${currentStatus.bg}`}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${currentStatus.dot}`} />
          {currentStatus.label} ({product.stock})
        </span>
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <h4 className="font-bold text-slate-800 text-base line-clamp-1 group-hover:text-indigo-600 transition-colors duration-200">
            {product.name}
          </h4>
          <p className="text-xs text-slate-400 mt-1 line-clamp-2 h-8 leading-relaxed">
            {product.description}
          </p>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-50 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-slate-400 block uppercase font-medium tracking-wider">
              Giá bán
            </span>
            <span className="text-base font-extrabold text-indigo-600">
              {product.price}
            </span>
          </div>

          <div className="text-right">
            <span className="text-[10px] text-slate-400 block uppercase font-medium tracking-wider">
              Cập nhật
            </span>
            <span className="text-xs font-semibold text-slate-600">
              {product.updatedAt}
            </span>
          </div>
        </div>
      </div>

      {/* Actions Section */}
      <div className="px-4 py-3 bg-slate-50/50 border-t border-slate-100 flex items-center justify-end gap-2">
        <button
          onClick={() => onEdit?.(product)}
          className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 border border-transparent hover:border-indigo-100 transition-all duration-200"
          type="button"
          title="Sửa món ăn"
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
          onClick={() => onDelete?.(product.id)}
          className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-100 transition-all duration-200"
          type="button"
          title="Xoá món ăn"
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
    </div>
  );
};
