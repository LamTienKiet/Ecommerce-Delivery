import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../../assets/css/checkout.css";

// Import các types và services gọi API
import { getCart } from "../../../services/cart.service";
import { createOrder } from "../../../services/order.service";
import type { CreateOrderRequest } from "../../../type_auth_api/order/order.api";
import type { CartItemResponse } from "../../../type_auth_api/cart/cart.api";
import { getImageUrl } from "../../../utils/image";
import { useCartStore } from "../../../store/useCartStore";
import toast from "react-hot-toast";

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
};

export const CheckoutPage = () => {
  const navigate = useNavigate();
  // State quản lý giỏ hàng và loading
  const [cartItems, setCartItems] = useState<CartItemResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false); // Trạng thái khi bấm nút Đặt Hàng
  // State quản lý thông tin form giao hàng
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");
  const [note, setNote] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cash");

  const [orderType, setOrderType] = useState<"delivery" | "pickup">("delivery");
  const [promoInput, setPromoInput] = useState("");
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [promoError, setPromoError] = useState("");

  const [formErrors, setFormErrors] = useState<{
    fullName?: string;
    phone?: string;
    shippingAddress?: string;
  }>({});

  useEffect(() => {
    async function fetchCartData() {
      try {
        setIsLoading(true);
        const res = await getCart();
        // Cập nhật state nếu có dữ liệu
        if (res && res.cartItems) {
          setCartItems(res.cartItems);
        }
      } catch (error) {
        console.error("Lỗi khi tải giỏ hàng:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchCartData();
  }, []);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + Number(item.product.price * item.quantity),
    0,
  );
  const deliveryFee = orderType === "delivery" ? 35000 : 0;
  const discount = appliedPromo ? Math.round(subtotal * 0.1) : 0;
  const total = subtotal + deliveryFee - discount;

  function applyPromo() {
    setPromoError("");
    if (promoInput.trim().toUpperCase() === "LATIUKY10") {
      setAppliedPromo("LATIUKY10");
    } else {
      setAppliedPromo(null);
      setPromoError("Mã giảm giá không hợp lệ hoặc đã hết hạn.");
    }
  }

  const { fetchCartCount } = useCartStore();

  const validateForm = () => {
    const errors: { fullName?: string; phone?: string; shippingAddress?: string } = {};
    if (!fullName.trim()) {
      errors.fullName = "Vui lòng nhập họ và tên";
    }
    if (!phone.trim()) {
      errors.phone = "Vui lòng nhập số điện thoại";
    } else if (!/^(0[3|5|7|8|9])+([0-9]{8})$/.test(phone)) {
      errors.phone = "Số điện thoại không hợp lệ (VD: 0912345678)";
    }
    
    if (orderType === "delivery" && (!shippingAddress || !shippingAddress.trim())) {
      errors.shippingAddress = "Vui lòng nhập địa chỉ giao hàng";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cartItems.length === 0) {
      toast.error("Giỏ hàng của bạn đang trống");
      return;
    }
    
    if (!validateForm()) {
      return;
    }

    // TODO: Viết logic xử lý tạo đơn hàng ở đây
    try {
      setIsSubmitting(true);
      const orderPayload: CreateOrderRequest = {
        fullName,
        phone,
        shippingAddress:
          orderType === "delivery"
            ? shippingAddress
            : "Tự đến lấy tại nhà hàng",
        note,
        paymentMethod,
      };

      const response = await createOrder(orderPayload);
      await fetchCartCount(); // Xóa số 0 trên giỏ hàng

      if (response.vnpayUrl) {
        window.location.href = response.vnpayUrl;
        return;
      }

      toast.success("Đặt hàng thành công");
      navigate("/order");
    } catch (err) {
      console.error("Lỗi khi đặt hàng:", err);
      toast.error("Đã xảy ra lỗi khi tạo đơn hàng. Vui lòng thử lại!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="checkout-page">
      <div className="checkout-wrap">
        <header className="checkout-page-head">
          <Link
            to="/cart"
            className="cart-back-link"
            style={{
              marginBottom: "20px",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              color: "var(--ink-dim)",
              fontSize: "12.5px",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ width: "14px", height: "14px", stroke: "currentColor" }}
            >
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
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                Thông tin nhận hàng
              </h2>

              <div
                style={{ display: "flex", gap: "10px", marginBottom: "20px" }}
              >
                <button
                  type="button"
                  style={{
                    flex: 1,
                    padding: "12px",
                    background:
                      orderType === "delivery"
                        ? "var(--gold-faint)"
                        : "transparent",
                    border: `1px solid ${orderType === "delivery" ? "var(--gold)" : "var(--hairline-strong)"}`,
                    color:
                      orderType === "delivery" ? "var(--gold)" : "var(--ink)",
                    cursor: "pointer",
                    textTransform: "uppercase",
                    fontSize: "12px",
                    letterSpacing: "0.05em",
                  }}
                  onClick={() => setOrderType("delivery")}
                >
                  Giao Hàng
                </button>
                <button
                  type="button"
                  style={{
                    flex: 1,
                    padding: "12px",
                    background:
                      orderType === "pickup"
                        ? "var(--gold-faint)"
                        : "transparent",
                    border: `1px solid ${orderType === "pickup" ? "var(--gold)" : "var(--hairline-strong)"}`,
                    color:
                      orderType === "pickup" ? "var(--gold)" : "var(--ink)",
                    cursor: "pointer",
                    textTransform: "uppercase",
                    fontSize: "12px",
                    letterSpacing: "0.05em",
                  }}
                  onClick={() => setOrderType("pickup")}
                >
                  Tự Đến Lấy
                </button>
              </div>

              <div className="checkout-row">
                <div className={`checkout-form-group ${formErrors.fullName ? "has-error" : ""}`}>
                  <label>Họ và tên người nhận</label>
                  <input
                    type="text"
                    className="checkout-input"
                    placeholder="Ví dụ: Nguyễn Văn A"
                    value={fullName}
                    onChange={(e) => {
                      setFullName(e.target.value);
                      if (formErrors.fullName) setFormErrors({ ...formErrors, fullName: undefined });
                    }}
                  />
                  {formErrors.fullName && <div className="checkout-error-text" style={{color: "#d9534f", fontSize: "12px", marginTop: "4px"}}>{formErrors.fullName}</div>}
                </div>
                <div className={`checkout-form-group ${formErrors.phone ? "has-error" : ""}`}>
                  <label>Số điện thoại</label>
                  <input
                    type="tel"
                    className="checkout-input"
                    placeholder="0901234567"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      if (formErrors.phone) setFormErrors({ ...formErrors, phone: undefined });
                    }}
                  />
                  {formErrors.phone && <div className="checkout-error-text" style={{color: "#d9534f", fontSize: "12px", marginTop: "4px"}}>{formErrors.phone}</div>}
                </div>
              </div>

              {orderType === "delivery" && (
                <div className={`checkout-form-group ${formErrors.shippingAddress ? "has-error" : ""}`}>
                  <label>Địa chỉ giao hàng</label>
                  <input
                    type="text"
                    className="checkout-input"
                    placeholder="Số nhà, tên đường, phường/xã, quận/huyện..."
                    value={shippingAddress ?? ""}
                    onChange={(e) => {
                      setShippingAddress(e.target.value);
                      if (formErrors.shippingAddress) setFormErrors({ ...formErrors, shippingAddress: undefined });
                    }}
                  />
                  {formErrors.shippingAddress && <div className="checkout-error-text" style={{color: "#d9534f", fontSize: "12px", marginTop: "4px"}}>{formErrors.shippingAddress}</div>}
                </div>
              )}

              <div className="checkout-form-group">
                <label>Ghi chú cho nhà hàng (Tùy chọn)</label>
                <input
                  type="text"
                  className="checkout-input"
                  placeholder="Ví dụ: Không hành, ít cay..."
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                />
              </div>
            </section>

            {/* Payment Methods */}
            <section className="checkout-section">
              <h2>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="20" height="14" x="2" y="5" rx="2"></rect>
                  <line x1="2" x2="22" y1="10" y2="10"></line>
                </svg>
                Phương thức thanh toán
              </h2>

              <label
                className={`payment-method ${paymentMethod === "cash" ? "is-active" : ""}`}
              >
                <input
                  type="radio"
                  name="payment"
                  value="cash"
                  checked={paymentMethod === "cash"}
                  onChange={() => setPaymentMethod("cash")}
                />
                <div className="payment-method-details">
                  <div className="payment-method-name">
                    Tiền mặt khi nhận hàng (COD)
                  </div>
                  <div className="payment-method-desc">
                    Thanh toán trực tiếp cho nhân viên giao hàng
                  </div>
                </div>
              </label>

              <label
                className={`payment-method ${paymentMethod === "bank" ? "is-active" : ""}`}
              >
                <input
                  type="radio"
                  name="payment"
                  value="bank"
                  checked={paymentMethod === "bank"}
                  onChange={() => setPaymentMethod("bank")}
                />
                <div className="payment-method-details">
                  <div className="payment-method-name">
                    Chuyển khoản VNPay
                  </div>
                  <div className="payment-method-desc">
                    Chuyển khoản qua cổng thanh toán VNPay
                  </div>
                </div>
              </label>
            </section>
          </div>

          {/* Order Summary Sidebar */}
          <aside className="checkout-summary">
            <h2>Tóm tắt đơn hàng</h2>

            <div className="checkout-items">
              {cartItems.map((item) => (
                <div key={item.id} className="checkout-item">
                  <img
                    src={getImageUrl(item.product.imageUrl)}
                    alt={item.product.name}
                    className="checkout-item-thumb"
                  />
                  <div className="checkout-item-info">
                    <div className="checkout-item-name">
                      {item.product.name}
                    </div>
                    {item.note && (
                      <div className="checkout-item-note" style={{ fontSize: "12px", color: "var(--ink-faint)", marginTop: "2px", fontStyle: "italic" }}>
                        Ghi chú: {item.note}
                      </div>
                    )}
                    <div className="checkout-item-price">
                      {formatCurrency(item.product.price)} x {item.quantity}
                    </div>
                  </div>
                  <div className="checkout-item-total">
                    {formatCurrency(item.product.price * item.quantity)}
                  </div>
                </div>
              ))}
            </div>

            <div
              className="cart-promo"
              style={{
                display: "flex",
                gap: "10px",
                marginTop: "20px",
                marginBottom: "20px",
              }}
            >
              <input
                type="text"
                placeholder="Mã giảm giá"
                value={promoInput}
                onChange={(e) => setPromoInput(e.target.value)}
                style={{
                  flex: 1,
                  background: "transparent",
                  border: "1px solid var(--hairline-strong)",
                  color: "var(--ink)",
                  padding: "12px 14px",
                  fontSize: "13px",
                  outline: "none",
                }}
              />
              <button
                type="button"
                onClick={applyPromo}
                style={{
                  padding: "0 18px",
                  border: "1px solid var(--gold)",
                  background: "none",
                  color: "var(--gold)",
                  fontSize: "11.5px",
                  textTransform: "uppercase",
                  cursor: "pointer",
                }}
              >
                Áp Dụng
              </button>
            </div>

            {promoError && (
              <div
                style={{
                  color: "#d9534f",
                  fontSize: "12px",
                  marginBottom: "15px",
                }}
              >
                {promoError}
              </div>
            )}
            {appliedPromo && (
              <div
                style={{
                  color: "var(--gold)",
                  fontSize: "12px",
                  marginBottom: "15px",
                }}
              >
                Đã áp dụng mã {appliedPromo} — giảm 10%
              </div>
            )}

            <div className="checkout-line">
              <span>Tạm tính ({cartItems.length} món)</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>
            <div className="checkout-line">
              <span>Phí giao hàng</span>
              <span>
                {deliveryFee > 0 ? formatCurrency(deliveryFee) : "Miễn phí"}
              </span>
            </div>
            {discount > 0 && (
              <div className="checkout-line" style={{ color: "var(--gold)" }}>
                <span>Giảm giá</span>
                <span>−{formatCurrency(discount)}</span>
              </div>
            )}

            <div className="checkout-line-total">
              <span className="label">Tổng cộng</span>
              <span className="amount">{formatCurrency(total)}</span>
            </div>

            <button
              type="submit"
              className="checkout-submit-btn"
              disabled={isSubmitting || isLoading}
            >
              {isLoading ? "Đang xử lý..." : " Đặt hàng"}
            </button>
            <div
              style={{
                marginTop: "16px",
                fontSize: "11.5px",
                color: "var(--ink-faint)",
                textAlign: "center",
              }}
            >
              Bằng việc Đặt hàng, bạn đồng ý với Điều khoản của LaTiuKy
            </div>
          </aside>
        </form>
      </div>
    </div>
  );
};
