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
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "70vh",
        background: "var(--surface)",
        padding: "20px",
      }}
    >
      <div
        style={{
          background: "var(--surface)",
          border: "1px solid var(--hairline-strong)",
          padding: "40px",
          textAlign: "center",
          maxWidth: "400px",
          width: "100%",
        }}
      >
        {status === "success" ? (
          <>
            <div
              style={{
                color: "var(--gold)",
                fontSize: "64px",
                marginBottom: "20px",
              }}
            >
              ✓
            </div>
            <h2
              style={{
                fontSize: "24px",
                marginBottom: "10px",
                color: "var(--ink)",
                fontWeight: 400,
              }}
            >
              Thanh Toán Thành Công!
            </h2>
            <p style={{ color: "var(--ink-faint)", marginBottom: "30px" }}>
              Cảm ơn bạn đã đặt hàng. Đơn hàng <strong>#{orderId}</strong> của
              bạn đang được chuẩn bị.
            </p>
          </>
        ) : (
          <>
            <div
              style={{
                color: "#d9534f",
                fontSize: "64px",
                marginBottom: "20px",
              }}
            >
              ✕
            </div>
            <h2
              style={{
                fontSize: "24px",
                marginBottom: "10px",
                color: "var(--ink)",
                fontWeight: 400,
              }}
            >
              Thanh Toán Thất Bại
            </h2>
            <p style={{ color: "var(--ink-faint)", marginBottom: "30px" }}>
              Rất tiếc, quá trình thanh toán cho đơn hàng{" "}
              <strong>#{orderId}</strong> không thành công hoặc đã bị huỷ.
            </p>
          </>
        )}

        <button
          onClick={() => navigate("/order")}
          style={{
            background: "var(--ink)",
            color: "var(--surface)",
            border: "none",
            padding: "12px 24px",
            fontSize: "13px",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            cursor: "pointer",
            width: "100%",
          }}
        >
          Xem lịch sử đơn hàng
        </button>
      </div>
    </div>
  );
};
