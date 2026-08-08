import axios from "axios";
import type {
  CartItemResponse,
  CartResponse,
  CreateCartRequest,
} from "../type_auth_api/cart/cart.api";

const API_URL = `${import.meta.env.VITE_API_URL}/cart`;

export async function addToCart(
  data: CreateCartRequest,
): Promise<CartItemResponse> {
  const res = await axios.post<CartItemResponse>(API_URL, data);
  return res.data;
}

export async function getCart(): Promise<CartResponse> {
  const res = await axios.get<CartResponse>(API_URL);
  return res.data;
}

export async function removeItem(cartItemId: number) {
  const res = await axios.delete(`${API_URL}/${cartItemId}`);
  return res.data;
}

export async function clearCart(userId: number) {
  const res = await axios.delete(`${API_URL}/${userId}`);
  return res.data;
}
