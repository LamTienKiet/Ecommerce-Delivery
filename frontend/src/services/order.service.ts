import type {
  CreateOrderRequest,
  OrderResponse,
} from "../type_auth_api/order/order.api";
import axiosClient from "../utils/axiosClient";

export async function createOrder(
  data: CreateOrderRequest,
): Promise<OrderResponse> {
  return await axiosClient.post<any, OrderResponse>("/order", data);
}
// Lấy danh sách đơn hàng của người dùng hiện tại
export async function getMyOrders(): Promise<OrderResponse[]> {
  return await axiosClient.get<any, OrderResponse[]>("/order");
}
// Lấy chi tiết một đơn hàng theo ID
export async function getOrderById(orderId: number): Promise<OrderResponse> {
  return await axiosClient.get<any, OrderResponse>(`/order/${orderId}`);
}

export async function cancelOrder(orderId: number): Promise<OrderResponse> {
  return await axiosClient.put<any, OrderResponse>(`/order/${orderId}/cancel`);
}

export async function getAllOrders(): Promise<OrderResponse[]> {
  return await axiosClient.get<any, OrderResponse[]>("/order");
}

export async function updateOrderStatus(
  orderId: number,
  status: string,
): Promise<OrderResponse> {
  return await axiosClient.put<any, OrderResponse>(`/order/${orderId}/status`, {
    status,
  });
}
