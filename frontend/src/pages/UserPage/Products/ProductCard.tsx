import { Link } from "react-router-dom";
import type { ProductResponse } from "../../../type_auth_api/products/product.api";
import { getImageUrl } from "../../../utils/image";
import { addToCart as apiAddToCart } from "../../../services/cart.service";
import { useCartStore } from "../../../store/useCartStore";
import { useState } from "react";
import toast from "react-hot-toast";

interface ProductCardProps {
  product: ProductResponse;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { fetchCartCount } = useCartStore();
  const [isAdding, setIsAdding] = useState<number | null>(null);
  const [showNoteInput, setShowNoteInput] = useState(false);
  const [note, setNote] = useState("");

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
    e.preventDefault(); 
    if (!product.isAvailable) return;
    
    setIsAdding(product.id);
    try {
      await apiAddToCart({ productId: product.id, quantity: 1, note: note || undefined });
      await fetchCartCount();
      toast.success(`Đã thêm 1 x ${product.name} vào giỏ hàng!`);
      setShowNoteInput(false);
      setNote("");
    } catch (err) {
      console.error(err);
      toast.error("Có lỗi xảy ra khi thêm vào giỏ hàng. Bạn đã đăng nhập chưa?");
    } finally {
      setIsAdding(null);
    }
  };

  return (
    <div
      className={`group relative flex flex-col bg-[#16251e] border border-[#2a3c31] rounded-2xl overflow-hidden hover:border-[#B7913C] transition-all duration-500 hover:shadow-2xl hover:shadow-[#B7913C]/10 ${!product.isAvailable ? 'opacity-50 grayscale' : ''}`}
    >
      {/* Product Image */}
      <Link
        to={`/detail/${product.id}`}
        className={`block relative h-56 w-full overflow-hidden ${!product.isAvailable ? 'pointer-events-none' : ''}`}
      >
        <img
          src={getImageUrl(product.imageUrl)}
          alt={product.name}
          className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-110"
        />
        {/* Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#16251e] via-transparent to-transparent opacity-80" />

        {/* Float Badges */}
        <div className="absolute top-4 left-4 flex gap-2 z-20">
          <span className="rounded-md bg-[#B7913C] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#121B16]">
            {getCategoryName(product.categoryId)}
          </span>
          {product.price > 500000 && (
            <span className="rounded-md bg-rose-900/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
              Chef Select
            </span>
          )}
          {!product.isAvailable && (
            <span className="px-3 py-1 bg-[#d9534f]/90 text-white text-[10px] font-bold tracking-widest uppercase rounded-full backdrop-blur-sm border border-[#d9534f]/50">
              Tạm Ngưng Bán
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

      <div className="flex flex-col flex-grow p-6">
        <Link to={`/detail/${product.id}`} className={!product.isAvailable ? 'pointer-events-none' : ''}>
          <h3 className="font-serif text-xl font-medium text-white mb-2 line-clamp-1 group-hover:text-[#B7913C] transition-colors duration-300">
            {product.name}
          </h3>
        </Link>
        <p className="text-[#A9B4A4] text-sm leading-relaxed mb-6 line-clamp-2 flex-grow">
          {product.description}
        </p>

        <div className="mt-auto border-t border-[#2a3c31] pt-4 min-h-[70px] flex flex-col justify-end">
          {!showNoteInput ? (
            <div className="flex items-end justify-between gap-3">
              <div className="flex flex-col">
                <span className="text-[10px] text-[#A9B4A4] uppercase tracking-widest mb-1.5">Giá</span>
                <span className="text-2xl font-serif font-bold text-[#B7913C] leading-none">
                  {new Intl.NumberFormat("vi-VN").format(product.price)}
                  <span className="text-sm ml-1 font-sans">₫</span>
                </span>
              </div>

              <button
                onClick={(e) => { e.preventDefault(); if (product.isAvailable) setShowNoteInput(true); }}
                disabled={!product.isAvailable}
                className={`py-2 px-10 h-[38px] rounded-lg flex items-center justify-center gap-1.5 font-medium text-sm transition-all duration-300 ${
                  !product.isAvailable
                    ? "bg-gray-800 text-gray-500 cursor-not-allowed border border-gray-700"
                    : "bg-[#B7913C] text-[#121B16] hover:bg-[#F1E9D8] shadow-lg shadow-[#B7913C]/20 hover:shadow-[#F1E9D8]/30 hover:-translate-y-0.5"
                }`}
                title={!product.isAvailable ? "Món này đang tạm ngưng" : "Thêm vào giỏ hàng"}
              >
                <svg
                  className="w-4 h-4 shrink-0"
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
                <span className="whitespace-nowrap">{!product.isAvailable ? "Tạm ngưng" : "Thêm"}</span>
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-2 w-full animate-[fadeIn_0.3s_ease-out]">
              <input
                type="text"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Ghi chú (ít cay, không hành...)"
                className="w-full bg-[#121B16] border border-[#2a3c31] rounded-lg px-3 py-2 text-sm text-[#F1E9D8] focus:border-[#B7913C] focus:outline-none transition-colors"
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleAddToCart(e as any);
                  if (e.key === 'Escape') setShowNoteInput(false);
                }}
              />
              <div className="flex gap-2 w-full">
                <button
                  onClick={(e) => { e.preventDefault(); setShowNoteInput(false); setNote(""); }}
                  className="flex-1 py-1.5 px-3 rounded-lg border border-[#2a3c31] text-[#A9B4A4] text-xs font-medium hover:text-white transition-colors"
                >
                  Hủy
                </button>
                <button
                  onClick={handleAddToCart}
                  disabled={isAdding === product.id}
                  className="flex-[2] py-1.5 px-3 rounded-lg bg-[#B7913C] text-[#121B16] text-xs font-bold hover:bg-[#F1E9D8] transition-colors"
                >
                  {isAdding === product.id ? "Đang thêm..." : "Xác nhận thêm"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
