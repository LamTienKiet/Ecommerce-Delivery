import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export const PaymentReturnPage: React.FC = () => {
  const [status, setStatus] = useState<string | null>(null);
  const [orderId, setOrderId] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Parse query params (e.g. ?status=success&orderId=123)
    const searchParams = new URLSearchParams(location.search);
    setStatus(searchParams.get("status"));
    setOrderId(searchParams.get("orderId"));
  }, [location.search]);

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#B7913C] opacity-[0.03] rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative w-full max-w-md bg-[#16251e] border border-[#2a3c31] rounded-2xl p-10 text-center shadow-2xl shadow-black/50 z-10 transform transition-all">
        {status === "success" ? (
          <>
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-[#B7913C]/10 mb-8 border border-[#B7913C]/20 shadow-[0_0_30px_rgba(183,145,60,0.15)] animate-pulse">
              <svg
                className="h-12 w-12 text-[#B7913C]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
            </div>
            <h2 className="font-serif text-3xl mb-4 text-[#F1E9D8] tracking-wide">
              Thanh Toán Thành Công!
            </h2>
            <p className="text-[#A9B4A4] mb-10 leading-relaxed text-sm">
              Cảm ơn bạn đã đặt hàng. Đơn hàng <strong className="text-[#B7913C]">#{orderId}</strong> của bạn đang được đầu bếp chuẩn bị.
            </p>
          </>
        ) : (
          <>
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-red-900/20 mb-8 border border-red-500/20 shadow-[0_0_30px_rgba(220,38,38,0.15)]">
              <svg
                className="h-12 w-12 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </div>
            <h2 className="font-serif text-3xl mb-4 text-[#F1E9D8] tracking-wide">
              Thanh Toán Thất Bại
            </h2>
            <p className="text-[#A9B4A4] mb-10 leading-relaxed text-sm">
              Rất tiếc, quá trình thanh toán cho đơn hàng <strong className="text-red-400">#{orderId}</strong> không thành công hoặc đã bị huỷ.
            </p>
          </>
        )}

        <div className="space-y-4">
          <button
            onClick={() => navigate("/order")}
            className="w-full py-3.5 px-6 rounded-xl bg-[#B7913C] text-[#121B16] font-semibold tracking-wide hover:bg-[#F1E9D8] transition-all duration-300 shadow-lg shadow-[#B7913C]/20 hover:shadow-[#F1E9D8]/30 hover:-translate-y-0.5"
          >
            Xem lịch sử đơn hàng
          </button>
          
          <button
            onClick={() => navigate("/")}
            className="w-full py-3.5 px-6 rounded-xl bg-transparent border border-[#2a3c31] text-[#A9B4A4] font-medium tracking-wide hover:border-[#B7913C] hover:text-[#B7913C] transition-all duration-300"
          >
            Về trang chủ
          </button>
        </div>
      </div>
    </div>
  );
};
