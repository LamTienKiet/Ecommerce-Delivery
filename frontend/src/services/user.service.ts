import axiosClient from "../utils/axiosClient";

export interface User {
  id: number;
  accountId: number;
  fullName: string;
  phone: string | null;
  avatar: string | null;
  birthday: string | null;
  gender: string | null;
  address: string | null;
  createdAt: string;
  updatedAt: string;
  account: {
    id: number;
    username: string;
    email: string;
    status: string;
    roleId: number;
    createdAt: string;
    updatedAt: string;
    role: {
      id: number;
      name: string;
    }
  }
}

export async function getAllUsers(): Promise<User[]> {
  return await axiosClient.get<any, User[]>("/user");
}

export async function updateUserAccount(id: number, data: { status?: string; roleName?: string }) {
  return await axiosClient.patch(`/user/${id}`, data);
}
