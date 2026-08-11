import type {
  CartItemResponse,
  CartResponse,
  CreateCartRequest,
} from "../type_auth_api/cart/cart.api";
import axiosClient from "../utils/axiosClient";

export async function addToCart(
  data: CreateCartRequest,
): Promise<CartItemResponse> {
  return await axiosClient.post<any, CartItemResponse>("/cart", data);
}

export async function getCart(): Promise<CartResponse> {
  return await axiosClient.get<any, CartResponse>("/cart");
}

export async function removeItem(cartItemId: number) {
  return await axiosClient.delete(`/cart/item/${cartItemId}`);
}
export async function clearCart() {
  return await axiosClient.delete(`/cart/clear`);
}
