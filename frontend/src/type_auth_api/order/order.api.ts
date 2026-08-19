import type { CartItemResponse } from "../cart/cart.api";
import { ProductResponse } from "../products/product.api";

export interface OrderItemRequest {
  productId: number;
  quantity: number;
  price?: number;
}

export interface CreateOrderRequest {
  fullName: string;
  phone: string;
  address: string;
  note?: string;
  paymentMethod: string;
  items?: OrderItemRequest[];
}

export interface OrderItemResponse {
  id: number;
  orderId: number;
  productId: number;
  quantity: number;
  price: number;
  product: ProductResponse;
}

export interface OrderResponse {
  id: number;
  userId: number;
  totalAmount: number;
  status: string; // 'PENDING' | 'PREPARING' | 'DELIVERING' | 'COMPLETED' | 'CANCELLED'
  fullName: string;
  phone: string;
  address: string;
  note?: string;
  paymentMethod: string;
  createdAt: string;
  orderItems: OrderItemResponse[];
}
