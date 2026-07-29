import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import type { ProductResponse } from "../../../type_auth_api/products/product.api";
import { getProductById } from "../../../services/product.service";
import { getCategoryById } from "../../../services/category.service";

export const ProductDetail = () => {
  const [product, setProduct] = useState<ProductResponse | null>(null);
  const [categoryName, setCategoryName] = useState<string>("Món ăn");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    async function fetchProductDetail(idNum: number) {
      try {
        setLoading(true);
        setError(null);
        const res = await getProductById(idNum);
        setProduct(res);
        try {
          const cat = await getCategoryById(res.categoryId);
          setCategoryName(cat.name);
        } catch (catErr) {
          console.log("Failed to fetch category details", catErr);
          setCategoryName(getCategoryName(res.categoryId));
        }
      } catch (err) {
        console.log("Failed to fetch data", err);
        setError("Không thể lấy dữ liệu chi tiết của món ăn từ máy chủ.");
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchProductDetail(Number(id));
    } else {
      setError("Không tìm thấy thông tin món ăn yêu cầu.");
      setLoading(false);
    }
  }, [id]);

  const getCategoryName = (id: number) => {
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



  if (loading) {
    return (
      <div className="animate-pulse space-y-8 max-w-6xl mx-auto py-6">
        {/* Back Link Skeleton */}
        <div className="h-5 w-32 bg-[#16251e] rounded-md"></div>

        {/* Main Grid Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Column Skeleton */}
          <div className="h-[400px] md:h-[500px] bg-[#16251e] rounded-3xl"></div>

          {/* Details Column Skeleton */}
          <div className="space-y-6 py-4">
            <div className="h-4 w-24 bg-[#16251e] rounded"></div>
            <div className="h-12 w-3/4 bg-[#16251e] rounded"></div>
            <div className="h-8 w-1/3 bg-[#16251e] rounded"></div>
            <div className="h-24 w-full bg-[#16251e] rounded-xl"></div>
            <div className="h-10 w-1/4 bg-[#16251e] rounded"></div>
            <div className="h-14 w-full bg-[#16251e] rounded-xl"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="text-center py-20 border border-rose-950 bg-[#0d1411] rounded-3xl max-w-2xl mx-auto px-6 shadow-2xl">
        <svg
          className="w-16 h-16 mx-auto text-rose-500 mb-6 animate-bounce"
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
        <h3 className="text-2xl font-serif text-[#F1E9D8] font-medium mb-3">
          Không thể hiển thị món ăn
        </h3>
        <p className="text-sm text-[#A9B4A4] mb-8 max-w-md mx-auto">
          {error || "Món ăn yêu cầu không tồn tại hoặc đã ngừng phục vụ."}
        </p>
        <Link
          to="/menu"
          className="inline-flex items-center gap-2 rounded-xl bg-emerald-950/60 border border-[#2a3c31] px-6 py-3 text-sm font-semibold text-[#B7913C] hover:bg-[#B7913C] hover:text-[#121B16] transition-all duration-300"
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
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Quay lại thực đơn
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-4">
      {/* Back Link */}
      <Link
        to="/menu"
        className="inline-flex items-center gap-2 text-sm text-[#A9B4A4] hover:text-[#B7913C] transition-colors duration-300 mb-8 group"
      >
        <svg
          className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        Trở về thực đơn
      </Link>

      {/* Main Container Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Left Column: Product Image */}
        <div className="relative overflow-hidden rounded-3xl border border-[#2a3c31] bg-[#16251e] shadow-2xl shadow-black/40 group">
          <img
            src={`/images/${product.imageUrl}`}
            alt={product.name}
            className="w-full h-[350px] sm:h-[450px] md:h-[500px] object-cover transition-transform duration-750 ease-out group-hover:scale-105"
          />
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

          {/* Badges on image */}
          <div className="absolute top-6 left-6 flex gap-2">
            <span className="rounded-lg bg-[#B7913C] px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-[#121B16] shadow-lg">
              {categoryName}
            </span>
          </div>

          <div className="absolute top-6 right-6">
            <span
              className={`rounded-lg px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-white shadow-lg ${
                product.isAvailable ? "bg-emerald-700/90" : "bg-rose-800/90"
              }`}
            >
              {product.isAvailable ? "Sẵn sàng phục vụ" : "Hết món"}
            </span>
          </div>
        </div>

        {/* Right Column: Product Info */}
        <div className="flex flex-col h-full py-2">
          {/* Category */}
          <span className="text-xs uppercase tracking-widest text-[#B7913C] font-bold block mb-3">
            {categoryName}
          </span>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-medium text-white tracking-tight leading-tight mb-4">
            {product.name}
          </h1>

          {/* Price & Prep Time Row */}
          <div className="flex flex-wrap items-center gap-6 mb-8 pb-6 border-b border-[#2a3c31]">
            <span className="text-3xl md:text-4xl font-serif font-semibold text-[#B7913C]">
              {(product.price * quantity).toLocaleString("vi-VN")}₫
            </span>

            <div className="h-6 w-[1px] bg-[#2a3c31] hidden sm:block" />

            <div className="flex items-center gap-2 text-[#A9B4A4] text-sm">
              <svg
                className="w-5 h-5 text-[#B7913C]"
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
              <span>
                Chuẩn bị: <strong>{product.preparationTime} phút</strong>
              </span>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-3 mb-8">
            <h3 className="text-xs uppercase tracking-widest text-[#F1E9D8] font-bold">
              Mô tả món ăn
            </h3>
            <p className="text-[#A9B4A4] text-sm leading-relaxed font-light">
              {product.description ||
                "Món ăn thượng hạng mang hương vị châu Âu đặc sắc được chế biến tỉ mỉ từ các nguyên liệu tươi ngon nhất trong ngày bởi bếp trưởng nhà hàng."}
            </p>
          </div>

          {/* Quantity & Order Button */}
          <div className="space-y-6 pt-6 border-t border-[#2a3c31]">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-end gap-6">
              {/* Quantity Selector */}
              <div className="flex flex-col gap-2">
                <span className="text-[10px] uppercase tracking-widest text-[#A9B4A4] font-semibold">
                  Số lượng
                </span>
                <div className="flex items-center border border-[#2a3c31] rounded-xl bg-[#0f1814] overflow-hidden self-start">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-4 py-3 text-[#A9B4A4] hover:text-[#B7913C] hover:bg-[#16251e] transition-colors duration-200"
                    disabled={!product.isAvailable}
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
                        d="M20 12H4"
                      />
                    </svg>
                  </button>
                  <span className="px-4 py-2 text-[#F1E9D8] font-semibold w-12 text-center select-none">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="px-4 py-3 text-[#A9B4A4] hover:text-[#B7913C] hover:bg-[#16251e] transition-colors duration-200"
                    disabled={!product.isAvailable}
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
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <div className="flex-grow">
                <button
                  disabled={!product.isAvailable}
                  className={`w-full flex items-center justify-center gap-3 rounded-xl py-3.5 px-6 text-sm font-bold tracking-wider uppercase transition-all duration-300 ${
                    product.isAvailable
                      ? "bg-[#B7913C] text-[#121B16] hover:bg-[#c9a34d] hover:shadow-xl hover:shadow-[#B7913C]/20 active:scale-[0.98] cursor-pointer"
                      : "bg-[#2a3c31]/30 text-[#A9B4A4]/40 cursor-not-allowed border border-[#2a3c31]/50"
                  }`}
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
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    />
                  </svg>
                  <span>
                    {product.isAvailable ? "Đặt món ngay" : "Tạm hết món"}
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Policy Badges */}
          <div className="grid grid-cols-2 gap-4 mt-8 pt-6 border-t border-[#2a3c31]/40 text-[11px] text-[#A9B4A4]">
            <div className="flex items-center gap-2">
              <svg
                className="w-4 h-4 text-[#B7913C] shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
              <span>Chuẩn Vệ Sinh An Toàn 100%</span>
            </div>
            <div className="flex items-center gap-2">
              <svg
                className="w-4 h-4 text-[#B7913C] shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span>Hương vị trọn vẹn tại bàn</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
