import { useEffect, useMemo, useState } from "react";
import "../../../assets/css/cart.css";
import type { CartItemResponse } from "../../../type_auth_api/cart/cart.api";
import { getCart } from "../../../services/cart.service";
// ---------- Types khớp với schema Cart / CartItem / Product ----------

interface CartLineItem {
  id: string;
  productId: string;
  name: string;
  note?: string;
  unitPrice: number; // VNĐ
  quantity: number;
  thumbColor: string; // placeholder cho ProductImage
}

type OrderType = "delivery" | "pickup";

const INITIAL_ITEMS: CartLineItem[] = [
  {
    id: "CI-1",
    productId: "P-004",
    name: "Bò Wellington Sốt Truffle",
    note: "Chín vừa (medium)",
    unitPrice: 890000,
    quantity: 1,
    thumbColor: "linear-gradient(160deg,#3A2226,#1C1416)",
  },
  {
    id: "CI-2",
    productId: "P-006",
    name: "Risotto Nấm Porcini",
    unitPrice: 380000,
    quantity: 2,
    thumbColor: "linear-gradient(160deg,#4C4130,#241F16)",
  },
  {
    id: "CI-3",
    productId: "P-007",
    name: "Crème Brûlée Vani Madagascar",
    unitPrice: 145000,
    quantity: 1,
    thumbColor: "linear-gradient(160deg,#EFE6D3,#C9BB9C)",
  },
];

const DELIVERY_FEE = 35000;
const PROMO_CODE = "LECELLIER10"; // giảm 10%

const formatVnd = (n: number) => n.toLocaleString("vi-VN") + "₫";

export function CartPage() {
  const [items, setItems] = useState<CartLineItem[]>(INITIAL_ITEMS);
  const [orderType, setOrderType] = useState<OrderType>("delivery");
  const [promoInput, setPromoInput] = useState("");
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [promoError, setPromoError] = useState("");
  const [cartItem, setCartItem] = useState<CartItemResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchItem() {
      try {
        setLoading(true);
        setError(null);
        const data = await getCart();
        setCartItem(data || []);
      } catch (err) {}
    }
  });

  function updateQuantity(id: string, delta: number) {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item,
      ),
    );
  }

  function removeItem(id: string) {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }

  function applyPromo() {
    setPromoError("");
    if (promoInput.trim().toUpperCase() === PROMO_CODE) {
      setAppliedPromo(PROMO_CODE);
    } else {
      setAppliedPromo(null);
      setPromoError("Mã giảm giá không hợp lệ hoặc đã hết hạn.");
    }
  }

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0),
    [items],
  );
  const deliveryFee = orderType === "delivery" ? DELIVERY_FEE : 0;
  const discount = appliedPromo ? Math.round(subtotal * 0.1) : 0;
  const total = subtotal + deliveryFee - discount;

  return (
    <div className="cart-page">
      <header className="cart-header">
        <div className="cart-logo">
          LE <em>CELLIER</em>
        </div>
        <a className="cart-back-link" href="/menu">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
          Tiếp Tục Chọn Món
        </a>
      </header>

      <div className="cart-wrap">
        <div className="cart-page-head">
          <span className="cart-eyebrow">Trước khi đặt món</span>
          <h1>Giỏ Hàng Của Bạn</h1>
          {items.length > 0 && (
            <div className="count">{items.length} món trong giỏ hàng</div>
          )}
        </div>

        {items.length === 0 ? (
          <EmptyCart />
        ) : (
          <div className="cart-grid">
            <div className="cart-items">
              {items.map((item) => (
                <div className="cart-item" key={item.id}>
                  <div
                    className="cart-item-thumb"
                    style={{ background: item.thumbColor }}
                  />

                  <div>
                    <div className="cart-item-name">{item.name}</div>
                    {item.note && (
                      <div className="cart-item-note">{item.note}</div>
                    )}
                    <div className="cart-item-unit-price">
                      {formatVnd(item.unitPrice)} / phần
                    </div>
                  </div>

                  <div className="cart-item-qty">
                    <div className="cart-qty">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, -1)}
                        disabled={item.quantity <= 1}
                      >
                        −
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="cart-item-total">
                    {formatVnd(item.unitPrice * item.quantity)}
                  </div>

                  <div className="cart-item-remove">
                    <button
                      className="cart-remove-btn"
                      type="button"
                      title="Xoá khỏi giỏ hàng"
                      onClick={() => removeItem(item.id)}
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M3 6h18" />
                        <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0-1 14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2L4 6" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <aside className="cart-summary">
              <h2>Tóm Tắt Đơn Hàng</h2>

              <div className="cart-order-type">
                <button
                  type="button"
                  className={orderType === "delivery" ? "is-active" : ""}
                  onClick={() => setOrderType("delivery")}
                >
                  Giao Hàng
                </button>
                <button
                  type="button"
                  className={orderType === "pickup" ? "is-active" : ""}
                  onClick={() => setOrderType("pickup")}
                >
                  Tự Đến Lấy
                </button>
              </div>

              <div className="cart-promo">
                <input
                  type="text"
                  placeholder="Mã giảm giá"
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value)}
                />
                <button type="button" onClick={applyPromo}>
                  Áp Dụng
                </button>
              </div>
              {promoError && (
                <div className="cart-promo-msg is-error">{promoError}</div>
              )}
              {appliedPromo && (
                <div className="cart-promo-msg">
                  Đã áp dụng mã {appliedPromo} — giảm 10%
                </div>
              )}

              <div className="cart-line">
                <span>Tạm tính</span>
                <span>{formatVnd(subtotal)}</span>
              </div>
              <div className="cart-line">
                <span>Phí giao hàng</span>
                <span>
                  {deliveryFee > 0 ? formatVnd(deliveryFee) : "Miễn phí"}
                </span>
              </div>
              {discount > 0 && (
                <div className="cart-line discount">
                  <span>Giảm giá</span>
                  <span>−{formatVnd(discount)}</span>
                </div>
              )}

              <div className="cart-line-total">
                <span className="label">Tổng Cộng</span>
                <span className="amount">{formatVnd(total)}</span>
              </div>

              <button className="cart-checkout-btn" type="button">
                Tiến Hành Thanh Toán
              </button>
              <div className="cart-summary-note">
                {orderType === "delivery"
                  ? "Thời gian giao dự kiến: 35–45 phút"
                  : "Món sẽ sẵn sàng sau khoảng 20 phút"}
              </div>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}

function EmptyCart() {
  return (
    <div className="cart-empty">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ margin: "0 auto" }}
      >
        <circle cx="9" cy="21" r="1" />
        <circle cx="19" cy="21" r="1" />
        <path d="M2 3h2l2.4 12.4a2 2 0 0 0 2 1.6h9.2a2 2 0 0 0 2-1.6L22 7H6" />
      </svg>
      <h2>Giỏ hàng của bạn đang trống</h2>
      <p>Hãy quay lại thực đơn để chọn những món bạn yêu thích.</p>
      <a href="/menu">
        <button
          type="button"
          style={{
            padding: "15px 32px",
            background: "transparent",
            border: "1px solid var(--gold)",
            color: "var(--ink)",
            fontSize: 11.5,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            cursor: "pointer",
          }}
        >
          Xem Thực Đơn
        </button>
      </a>
    </div>
  );
}
