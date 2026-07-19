export interface AuthInput {
  username: string;
  password: string;
}
export interface SignInData {
  id: number;
  accountId: number;
  username: string;
  role: string;
}
export interface AuthResult {
  accessToken: string;
  username: string;
  id: number;
  role: string;
}

export interface SignUpData {
  fullName: string;
  username: string;
  password: string;
  phone: string;
  email: string;
  confirmPassword: string;
}
