export type RegisterFormErrors = {
  fullName?: string;
  username?: string;
  email?: string;
  phone?: string;
  password?: string;
  confirmPassword?: string;
  agree?: string;
};

export type LoginFormErrors = {
  username?: string;
  password?: string;
  remember?: string;
};

export interface RegisterRequest {
  fullName: string;
  username: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  id: number;
  fullName: string;
  username: string;
  role: string;
  phone: number;
  email: string;
}

export interface RegisterResponse {
  id: number;
  fullName: string;
  username: string;
  email: string;
  phone: string;
}
