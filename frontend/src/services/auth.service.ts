import axiosClient from "../utils/axiosClient";
import {
  type RegisterRequest,
  type RegisterResponse,
  type LoginRequest,
  type LoginResponse,
} from "../type_auth_api/auth.api";

export async function registerApi(
  data: RegisterRequest,
): Promise<RegisterResponse> {
  return await axiosClient.post<any, RegisterResponse>("/auth/register", data);
}

export async function loginApi(data: LoginRequest): Promise<LoginResponse> {
  return await axiosClient.post<any, LoginResponse>("/auth/login", data);
}
