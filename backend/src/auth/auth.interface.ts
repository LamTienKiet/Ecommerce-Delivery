export interface AuthInput {
  username: string;
  password: string;
}
export interface SignInData {
  id: number;
  accountId: number;
  username: string;
  role: string;
  email: string;
  fullName: string;
  phone: string | null;
}
export interface AuthResult {
  accessToken: string;
  refreshToken: string;
  id: number;
  username: string;
  role: string;
  email: string;
  fullName: string;
  phone: string | null;
}

export interface SignUpData {
  fullName: string;
  username: string;
  password: string;
  phone: string;
  email: string;
  confirmPassword: string;
}
