import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../../assets/css/checkout.css';

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
};

export const CheckoutPage = () => {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('cash');

  // Giả lập dữ liệu đơn hàng (từ giỏ hàng truyền qua)
  const orderItems = [
    {
      id: 1,
      name: 'Classic Beef Wellington',
      quantity: 1,
      price: 1550000,
      image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&q=80&w=100&h=100'
    },
    {
      id: 2,
      name: 'Château Margaux 2015 (Ly)',
      quantity: 2,
      price: 850000,
      image: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&q=80&w=100&h=100'
    }
  ];

  const subtotal = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = 50000;
  const total = subtotal + deliveryFee;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Viết logic xử lý tạo đơn hàng ở đây
    
    // Sau khi tạo thành công, chuyển hướng về trang lịch sử đơn hàng
    navigate('/order');
  };

  return (
    <div className="checkout-page">
      <div className="checkout-wrap">
        <header className="checkout-page-head">
          <Link to="/cart" className="cart-back-link" style={{ marginBottom: '20px', display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--ink-dim)', fontSize: '12.5px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            <svg viewBox="0 0 24 24" fill="none" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{ width: '14px', height: '14px', stroke: 'currentColor' }}>
              <path d="M15 18l-6-6 6-6" />
            </svg>
            Quay lại giỏ hàng
          </Link>
          <span className="checkout-eyebrow">Thanh toán an toàn</span>
          <h1>Hoàn Tất Đơn Hàng</h1>
        </header>

        <form className="checkout-grid" onSubmit={handleSubmitOrder}>
          <div className="checkout-main">
            
            {/* Delivery Information */}
            <section className="checkout-section">
              <h2>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                Thông tin giao hàng
              </h2>
              
              <div className="checkout-row">
                <div className="checkout-form-group">
                  <label>Họ và tên người nhận</label>
                  <input type="text" className="checkout-input" placeholder="Ví dụ: Nguyễn Văn A" required />
                </div>
                <div className="checkout-form-group">
                  <label>Số điện thoại</label>
                  <input type="tel" className="checkout-input" placeholder="090 123 4567" required />
                </div>
              </div>

              <div className="checkout-form-group">
                <label>Địa chỉ giao hàng</label>
                <input type="text" className="checkout-input" placeholder="Số nhà, tên đường, phường/xã, quận/huyện..." required />
              </div>

              <div className="checkout-form-group">
                <label>Ghi chú cho nhà hàng (Tùy chọn)</label>
                <input type="text" className="checkout-input" placeholder="Ví dụ: Không hành, ít cay..." />
              </div>
            </section>

            {/* Payment Methods */}
            <section className="checkout-section">
              <h2>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="14" x="2" y="5" rx="2"></rect>
                  <line x1="2" x2="22" y1="10" y2="10"></line>
                </svg>
                Phương thức thanh toán
              </h2>

              <label className={`payment-method ${paymentMethod === 'cash' ? 'is-active' : ''}`}>
                <input 
                  type="radio" 
                  name="payment" 
                  value="cash" 
                  checked={paymentMethod === 'cash'}
                  onChange={() => setPaymentMethod('cash')}
                />
                <div className="payment-method-details">
                  <div className="payment-method-name">Tiền mặt khi nhận hàng (COD)</div>
                  <div className="payment-method-desc">Thanh toán trực tiếp cho nhân viên giao hàng</div>
                </div>
              </label>

              <label className={`payment-method ${paymentMethod === 'bank' ? 'is-active' : ''}`}>
                <input 
                  type="radio" 
                  name="payment" 
                  value="bank" 
                  checked={paymentMethod === 'bank'}
                  onChange={() => setPaymentMethod('bank')}
                />
                <div className="payment-method-details">
                  <div className="payment-method-name">Chuyển khoản ngân hàng</div>
                  <div className="payment-method-desc">Chuyển khoản qua quét mã QR Code</div>
                </div>
              </label>
            </section>
          </div>

          {/* Order Summary Sidebar */}
          <aside className="checkout-summary">
            <h2>Tóm tắt đơn hàng</h2>
            
            <div className="checkout-items">
              {orderItems.map(item => (
                <div key={item.id} className="checkout-item">
                  <img src={item.image} alt={item.name} className="checkout-item-thumb" />
                  <div className="checkout-item-info">
                    <div className="checkout-item-name">{item.name}</div>
                    <div className="checkout-item-price">{formatCurrency(item.price)} x {item.quantity}</div>
                  </div>
                  <div className="checkout-item-total">{formatCurrency(item.price * item.quantity)}</div>
                </div>
              ))}
            </div>

            <div className="cart-promo" style={{ display: 'flex', gap: '10px', marginTop: '20px', marginBottom: '20px' }}>
              <input type="text" placeholder="Mã giảm giá" style={{ flex: 1, background: 'transparent', border: '1px solid var(--hairline-strong)', color: 'var(--ink)', padding: '12px 14px', fontSize: '13px', outline: 'none' }} />
              <button type="button" style={{ padding: '0 18px', border: '1px solid var(--gold)', background: 'none', color: 'var(--gold)', fontSize: '11.5px', textTransform: 'uppercase', cursor: 'pointer' }}>Áp Dụng</button>
            </div>

            <div className="checkout-line">
              <span>Tạm tính ({orderItems.length} món)</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>
            <div className="checkout-line">
              <span>Phí giao hàng</span>
              <span>{formatCurrency(deliveryFee)}</span>
            </div>
            
            <div className="checkout-line-total">
              <span className="label">Tổng cộng</span>
              <span className="amount">{formatCurrency(total)}</span>
            </div>

            <button type="submit" className="checkout-submit-btn">
              Đặt Hàng
            </button>
            <div style={{ marginTop: '16px', fontSize: '11.5px', color: 'var(--ink-faint)', textAlign: 'center' }}>
              Bằng việc Đặt hàng, bạn đồng ý với Điều khoản của LaTiuKy
            </div>
          </aside>
        </form>
      </div>
    </div>
  );
};
