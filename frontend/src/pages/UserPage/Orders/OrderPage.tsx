import { useState } from 'react';
import '../../../assets/css/order.css'; // Nhúng CSS giao diện tối (dark theme)

// Giả lập dữ liệu món ăn Âu (Fine Dining)
const MOCK_ORDERS = [
  {
    id: 'ORD-2023-1001',
    date: '24/11/2023 19:30',
    status: 'COMPLETED',
    statusText: 'Đã Thưởng Thức',
    totalAmount: 3250000,
    items: [
      {
        id: 1,
        name: 'Classic Beef Wellington',
        description: 'Kèm sốt rượu vang đỏ và khoai tây nghiền nấm Truffle',
        quantity: 1,
        price: 1550000,
        image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&q=80&w=200&h=200',
      },
      {
        id: 2,
        name: 'Château Margaux 2015 (Ly)',
        description: 'Vang đỏ vùng Bordeaux',
        quantity: 2,
        price: 850000,
        image: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&q=80&w=200&h=200',
      },
    ],
  },
  {
    id: 'ORD-2023-1002',
    date: '25/11/2023 11:45',
    status: 'PREPARING',
    statusText: 'Đang Chuẩn Bị',
    totalAmount: 850000,
    items: [
      {
        id: 3,
        name: 'Pan-seared Foie Gras',
        description: 'Gan ngỗng Pháp áp chảo, mứt sung và bánh mì brioche',
        quantity: 1,
        price: 850000,
        image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&q=80&w=200&h=200',
      },
    ],
  },
  {
    id: 'ORD-2023-1003',
    date: '26/11/2023 18:00',
    status: 'DELIVERING',
    statusText: 'Đang Giao',
    totalAmount: 1450000,
    items: [
      {
        id: 4,
        name: 'Truffle Mushroom Risotto',
        description: 'Cơm Ý nấm Truffle với phô mai Parmesan 24 tháng',
        quantity: 1,
        price: 550000,
        image: 'https://images.unsplash.com/photo-1633337474563-1d00eea386fb?auto=format&fit=crop&q=80&w=200&h=200',
      },
      {
        id: 5,
        name: 'Lobster Thermidor',
        description: 'Tôm hùm nướng sốt kem phô mai Gruyère',
        quantity: 1,
        price: 900000,
        image: 'https://images.unsplash.com/photo-1559742811-822873691fc8?auto=format&fit=crop&q=80&w=200&h=200',
      },
    ],
  },
  {
    id: 'ORD-2023-1004',
    date: '20/11/2023 12:30',
    status: 'CANCELLED',
    statusText: 'Đã Hủy',
    totalAmount: 1200000,
    items: [
      {
        id: 6,
        name: 'Set Menu Dành Cho 2 Người',
        description: 'Appetizer, Main course (Salmon), Dessert',
        quantity: 1,
        price: 1200000,
        image: 'https://images.unsplash.com/photo-1544025162-8315ea07525b?auto=format&fit=crop&q=80&w=200&h=200',
      },
    ],
  },
];

const TABS = [
  { id: 'ALL', label: 'Tất cả' },
  { id: 'PENDING', label: 'Chờ xác nhận' },
  { id: 'PREPARING', label: 'Đang chuẩn bị' },
  { id: 'DELIVERING', label: 'Đang giao' },
  { id: 'COMPLETED', label: 'Hoàn thành' },
  { id: 'CANCELLED', label: 'Đã hủy' },
];

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
};

export const OrderPage = () => {
  const [activeTab, setActiveTab] = useState('ALL');

  const displayOrders = activeTab === 'ALL' 
    ? MOCK_ORDERS 
    : MOCK_ORDERS.filter(order => order.status === activeTab);

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
              className={`order-tab ${activeTab === tab.id ? 'is-active' : ''}`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Orders List */}
        <div>
          {displayOrders.length === 0 ? (
            <div className="order-empty">
              <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" style={{ margin: "0 auto" }}>
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
                    <span className="order-date">{order.date}</span>
                  </div>
                  <div>
                    <span className={`order-status ${order.status}`}>
                      {order.statusText}
                    </span>
                  </div>
                </div>

                {/* Order Items */}
                <div className="order-items">
                  {order.items.map((item) => (
                    <div key={item.id} className="order-item">
                      <img src={item.image} alt={item.name} className="order-item-thumb" />
                      
                      <div className="order-item-details">
                        <div className="order-item-name">{item.name}</div>
                        <div className="order-item-note">{item.description}</div>
                      </div>
                      
                      <div className="order-item-price-qty">
                        <div className="order-item-price">{formatCurrency(item.price)}</div>
                        <div className="order-item-qty">x {item.quantity}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Order Footer */}
                <div className="order-card-footer">
                  <div>
                    <span className="order-total-label">Tổng hóa đơn:</span>
                    <span className="order-total-amount">{formatCurrency(order.totalAmount)}</span>
                  </div>
                  
                  <div className="order-actions">
                    {order.status === 'COMPLETED' && (
                      <button className="order-btn order-btn-primary">
                        Đánh giá món
                      </button>
                    )}
                    <button className="order-btn">
                      Đặt lại món này
                    </button>
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
