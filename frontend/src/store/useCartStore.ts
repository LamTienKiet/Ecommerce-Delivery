import { create } from "zustand";
import { getCart } from "../services/cart.service";

interface CartStore {
  cartCount: number;
  fetchCartCount: () => Promise<void>;
  clearCartCount: () => void;
}

export const useCartStore = create<CartStore>((set) => ({
  cartCount: 0,
  fetchCartCount: async () => {
    try {
      const res = await getCart();
      if (res && res.cartItems) {
        // Tính tổng số lượng các món trong giỏ
        const count = res.cartItems.reduce((sum, item) => sum + item.quantity, 0);
        set({ cartCount: count });
      }
    } catch (error) {
      console.error("Failed to fetch cart count:", error);
    }
  },
  clearCartCount: () => set({ cartCount: 0 }),
}));
