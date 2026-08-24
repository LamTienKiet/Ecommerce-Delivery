import { useState, useEffect } from "react";
import "../../../assets/css/order.css";

// Import service và type
import { getMyOrders } from "../../../services/order.service";
import type { OrderResponse } from "../../../type_auth_api/order/order.api";
import { getImageUrl } from "../../../utils/image";

// Giả lập dữ liệu món ăn Âu (Fine Dining)

const TABS = [
  { id: "ALL", label: "Tất cả" },
  { id: "PENDING", label: "Chờ xác nhận" },
  { id: "PREPARING", label: "Đang chuẩn bị" },
  { id: "DELIVERING", label: "Đang giao" },
  { id: "COMPLETED", label: "Hoàn thành" },
  { id: "CANCELLED", label: "Đã hủy" },
];

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
};

const getStatusLabel = (status: string) => {
  const tab = TABS.find((t) => t.id === status);
  return tab ? tab.label : status;
};

export const OrderPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("ALL");
  const [orders, setOrders] = useState<OrderResponse[]>([]);

  useEffect(() => {
    async function fetchOrder() {
      try {
        setIsLoading(true);
        const res = await getMyOrders();
        setOrders(res);
      } catch (err) {
        console.log("Failed to fetch Data", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchOrder();
  }, []);

  const displayOrders =
    activeTab === "ALL"
      ? orders
      : orders.filter((order) => order.currentStatus === activeTab);

  return (
    <div className="order-page">
      <header className="order-header">
        <div className="order-logo">
          LA <em>TiuKy</em>
        </div>
      </header>

      <div className="order-wrap">
        <div className="order-page-head">
          <span className="order-eyebrow">Trải nghiệm ẩm thực</span>
          <h1>Lịch sử Đặt món</h1>
        </div>

        {/* Tabs Navigation */}
        <div className="order-tabs">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`order-tab ${activeTab === tab.id ? "is-active" : ""}`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Orders List */}
        <div>
          {isLoading ? (
            <div className="order-empty">
              <p>Đang tải lịch sử đơn hàng...</p>
            </div>
          ) : displayOrders.length === 0 ? (
            <div className="order-empty">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ margin: "0 auto" }}
              >
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
              <h2>Không có đơn hàng nào</h2>
              <p>Bạn chưa có đơn đặt món nào trong trạng thái này.</p>
            </div>
          ) : (
            displayOrders.map((order) => (
              <div key={order.id} className="order-card">
                {/* Order Header */}
                <div className="order-card-header">
                  <div>
                    <span className="order-id">Mã đơn: {order.id}</span>
                    <span className="order-date">
                      {new Date(order.createdAt).toLocaleString()}
                    </span>
                  </div>
                  <div>
                    <span className={`order-status ${order.currentStatus}`}>
                      {getStatusLabel(order.currentStatus)}
                    </span>
                  </div>
                </div>

                {/* Order Items */}
                <div className="order-items">
                  {order.orderItems.map((item) => (
                    <div key={item.id} className="order-item">
                      <img
                        src={getImageUrl(item.product.imageUrl)}
                        alt={item.product.name}
                        className="order-item-thumb"
                      />

                      <div className="order-item-details">
                        <div className="order-item-name">
                          {item.product.name}
                        </div>
                        {item.note && (
                          <div
                            className="order-item-note"
                            style={{ fontStyle: "italic", marginTop: "2px" }}
                          >
                            Ghi chú: {item.note}
                          </div>
                        )}
                      </div>

                      <div className="order-item-price-qty">
                        <div className="order-item-price">
                          {formatCurrency(item.price)}
                        </div>
                        <div className="order-item-qty">x {item.quantity}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Order Footer */}
                <div className="order-card-footer">
                  <div>
                    <span className="order-total-label">Tổng hóa đơn:</span>
                    <span className="order-total-amount">
                      {formatCurrency(order.totalAmount)}
                    </span>
                  </div>

                  <div className="order-actions">
                    {order.currentStatus === "COMPLETED" && (
                      <button className="order-btn order-btn-primary">
                        Đánh giá món
                      </button>
                    )}
                    <button className="order-btn">Đặt lại món này</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
