import axios from "axios";
import {
  type RegisterRequest,
  type RegisterResponse,
  type LoginRequest,
  type LoginResponse,
} from "../type_auth_api/auth.api";

const API_URL = `${import.meta.env.VITE_API_URL}/auth`;

export async function registerApi(
  data: RegisterRequest,
): Promise<RegisterResponse> {
  const res = await axios.post<RegisterResponse>(`${API_URL}/register`, data);

  return res.data;
}

export async function loginApi(data: LoginRequest): Promise<LoginResponse> {
  const res = await axios.post<LoginResponse>(`${API_URL}/login`, data);
  return res.data;
}
