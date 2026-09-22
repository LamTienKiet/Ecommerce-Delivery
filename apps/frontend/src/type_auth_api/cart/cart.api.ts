import type { ProductResponse } from "../products/product.api";

export interface CreateCartRequest {
  productId: number;
  quantity: number;
  note?: string;
}

export interface CartItemResponse {
  id: number;
  productId: number;
  quantity: number;
  note?: string;
  product: ProductResponse;
}

export interface CartResponse {
  id: number;
  cartItems: CartItemResponse[];
}
