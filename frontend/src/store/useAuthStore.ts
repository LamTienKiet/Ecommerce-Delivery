import { create } from "zustand";

interface User {
  id: number;
  username: string;
  role: string;
  email: string;
  fullName: string;
  phone: string | null;
}

interface AuthenState {
  user: User | null;
  token: string | null;
  login: (user: User, token: string) => void;
  logout: () => void;
}

const storedUser = localStorage.getItem("user");
const storedToken = localStorage.getItem("token");

export const useAuthStore = create<AuthenState>((set) => ({
  user: storedUser ? JSON.parse(storedUser) : null,
  token: storedToken,
  login: (user, token) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    set({ user, token });
  },
  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    set({ user: null, token: null });
  },
}));
