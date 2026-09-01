import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getOrderById } from "../../../services/order.service";
import type { OrderResponse } from "../../../type_auth_api/order/order.api";
import { getImageUrl } from "../../../utils/image";
import "../../../assets/css/order-detail.css";

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
};

const STATUS_STEPS = [
  { id: "PENDING", label: "Chờ xác nhận" },
  { id: "PREPARING", label: "Đang chuẩn bị" },
  { id: "DELIVERING", label: "Đang giao" },
  { id: "COMPLETED", label: "Hoàn thành" },
];

export const OrderDetail = () => {
  const { id } = useParams();
  const [order, setOrder] = useState<OrderResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchOrderDetail() {
      try {
        if (!id) return;
        setIsLoading(true);
        const res = await getOrderById(Number(id));
        setOrder(res);
      } catch (err) {
        console.error("Lỗi khi tải chi tiết đơn hàng:", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchOrderDetail();
  }, [id]);

  if (isLoading) {
    return (
      <div className="order-detail-page">
        <div className="order-detail-wrap">
          <p>Đang tải chi tiết đơn hàng...</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="order-detail-page">
        <div className="order-detail-wrap">
          <h2>Không tìm thấy đơn hàng</h2>
          <Link to="/order">Quay lại danh sách</Link>
        </div>
      </div>
    );
  }

  const isCancelled = order.currentStatus === "CANCELLED";
  const histories = order.histories || [];

  return (
    <div className="order-detail-page">
      <div className="order-detail-wrap">
        <header className="order-detail-head">
          <Link to="/order" className="back-link">
            &larr; Quay lại danh sách
          </Link>
          <div className="head-title">
            <h1>Chi Tiết Đơn Hàng #{order.id}</h1>
            <span className={`status-badge ${order.currentStatus}`}>
              {isCancelled ? "Đã Hủy" : order.currentStatus}
            </span>
          </div>
          <p className="order-date">
            Đặt lúc: {new Date(order.createdAt).toLocaleString("vi-VN")}
          </p>
        </header>

        {/* --- TIMELINE THEO DÕI TRẠNG THÁI --- */}
        <section className="tracking-section">
          <h2>Trạng thái Đơn hàng</h2>
          {isCancelled ? (
            <div className="cancelled-alert">
              Đơn hàng này đã bị hủy. Cảm ơn bạn đã quan tâm.
            </div>
          ) : (
            <div className="timeline">
              {STATUS_STEPS.map((step, index) => {
                const historyRecord = histories.find(
                  (h) => h.status === step.id,
                );
                const isCompleted = !!historyRecord;
                const isActive = isCompleted;

                return (
                  <div
                    key={step.id}
                    className={`timeline-step ${isActive ? "active" : ""}`}
                  >
                    <div className="timeline-icon">
                      {isActive ? (
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      ) : (
                        <div className="timeline-dot" />
                      )}
                    </div>
                    <div className="timeline-content">
                      <div className="timeline-title">{step.label}</div>
                      {isCompleted && (
                        <div className="timeline-time">
                          {new Date(historyRecord.createdAt).toLocaleString(
                            "vi-VN",
                          )}
                        </div>
                      )}
                    </div>
                    {index < STATUS_STEPS.length - 1 && (
                      <div className="timeline-connector"></div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </section>

        <div className="detail-grid">
          {/* Cột trái: Thông tin nhận hàng & Thanh toán */}
          <div className="detail-info">
            <section className="info-box">
              <h3>Thông tin người nhận</h3>
              <p>
                <strong>Họ tên:</strong> {order.fullName}
              </p>
              <p>
                <strong>Số điện thoại:</strong> {order.phone}
              </p>
              <p>
                <strong>Địa chỉ:</strong> {order.shippingAddress}
              </p>
              {order.note && (
                <p>
                  <strong>Ghi chú:</strong> {order.note}
                </p>
              )}
            </section>

            <section className="info-box">
              <h3>Thanh toán</h3>
              <p>
                <strong>Phương thức:</strong>{" "}
                {order.payment?.paymentMethod?.toUpperCase()}
              </p>
              <p>
                <strong>Trạng thái:</strong>{" "}
                <span className={`payment-status ${order.payment?.status}`}>
                  {order.payment?.status || "PENDING"}
                </span>
              </p>
            </section>
          </div>

          {/* Cột phải: Danh sách món ăn & Hóa đơn */}
          <div className="detail-items">
            <section className="info-box">
              <h3>Hóa đơn</h3>
              <div className="item-list">
                {order.orderItems.map((item) => (
                  <div key={item.id} className="item-row">
                    <img
                      src={getImageUrl(item.product.imageUrl)}
                      alt={item.product.name}
                    />
                    <div className="item-details">
                      <div className="item-name">{item.product.name}</div>
                      <div className="item-qty">Số lượng: {item.quantity}</div>
                      {item.note && item.note.trim() !== "" && (
                        <div className="item-qty">Ghi chú: {item.note}</div>
                      )}
                    </div>
                    <div className="item-price">
                      {formatCurrency(item.price * item.quantity)}
                    </div>
                  </div>
                ))}
              </div>
              <div className="invoice-total">
                <span>Tổng thanh toán</span>
                <span className="total-amount">
                  {formatCurrency(order.totalAmount)}
                </span>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};
