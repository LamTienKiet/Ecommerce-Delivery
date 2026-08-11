import { Link } from "react-router-dom";
import type { ProductResponse } from "../../../type_auth_api/products/product.api";
import { getImageUrl } from "../../../utils/image";
import { addToCart as apiAddToCart } from "../../../services/cart.service";
interface ProductCardProps {
  product: ProductResponse;
}

export default function ProductCard({ product }: ProductCardProps) {
  const getCategoryName = (id: number) => {
    if (product.category?.name) {
      return product.category.name;
    }
    switch (id) {
      case 1:
        return "Pasta";
      case 2:
        return "Khai vị";
      case 3:
        return "Món chính";
      case 4:
        return "Món Nướng";
      case 5:
        return "Tráng Miệng";
      default:
        return "Món ăn";
    }
  };

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigating to detail page if button is inside a Link or similar
    try {
      await apiAddToCart({ productId: product.id, quantity: 1 });
      alert(`Đã thêm 1 x ${product.name} vào giỏ hàng!`);
    } catch (err) {
      console.error(err);
      alert("Có lỗi xảy ra khi thêm vào giỏ hàng. Bạn đã đăng nhập chưa?");
    }
  };

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-emerald-950 bg-[#16251e] transition-all duration-300 hover:-translate-y-2 hover:border-[#B7913C] hover:shadow-2xl hover:shadow-[#B7913C]/10 flex flex-col h-full">
      {/* Product Image */}
      <Link
        to={`/detail/${product.id}`}
        className="block relative h-56 w-full overflow-hidden"
      >
        <img
          src={getImageUrl(product.imageUrl)}
          alt={product.name}
          className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-110"
        />
        {/* Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#16251e] via-transparent to-transparent opacity-80" />

        {/* Float Badges */}
        <div className="absolute top-4 left-4 flex gap-2">
          <span className="rounded-md bg-[#B7913C] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#121B16]">
            {getCategoryName(product.categoryId)}
          </span>
          {product.price > 500000 && (
            <span className="rounded-md bg-rose-900/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
              Chef Select
            </span>
          )}
        </div>

        {/* Preparation Time */}
        <div className="absolute bottom-4 right-4 flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1 text-xs text-[#F1E9D8] backdrop-blur-sm">
          <svg
            className="w-3.5 h-3.5 text-[#B7913C]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{product.preparationTime} phút</span>
        </div>
      </Link>

      {/* Body Content */}
      <div className="flex flex-col flex-grow p-6">
        <div className="flex items-center justify-between gap-2">
          <span
            className={`inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider ${
              product.isAvailable ? "text-emerald-400" : "text-rose-400"
            }`}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-current" />
            {product.isAvailable ? "Còn hàng" : "Hết hàng"}
          </span>
        </div>

        {/* Product Name */}
        <Link to={`/detail/${product.id}`}>
          <h3 className="mt-3 font-serif text-xl font-medium text-[#F1E9D8] transition-colors group-hover:text-[#B7913C] line-clamp-1 hover:text-[#B7913C]">
            {product.name}
          </h3>
        </Link>

        {/* Product Description */}
        <p className="mt-2 text-sm leading-relaxed text-[#A9B4A4] line-clamp-3 flex-grow">
          {product.description}
        </p>

        {/* Divider */}
        <div className="my-5 border-t border-[#2a3c31]" />

        {/* Footer Area */}
        <div className="flex items-center justify-between mt-auto">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-widest text-[#A9B4A4]">
              Giá bán
            </span>
            <span className="font-serif text-2xl font-semibold text-[#B7913C]">
              {product.price.toLocaleString("vi-VN")}₫
            </span>
          </div>

          <button
            disabled={!product.isAvailable}
            onClick={handleAddToCart}
            className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-300 ${
              product.isAvailable
                ? "bg-[#B7913C] text-[#121B16] hover:bg-[#c9a34d] hover:shadow-lg hover:shadow-[#B7913C]/20 active:scale-95"
                : "bg-emerald-950/40 text-emerald-850 cursor-not-allowed border border-emerald-950"
            }`}
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
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
            <span>Đặt món</span>
          </button>
        </div>
      </div>
    </div>
  );
}
