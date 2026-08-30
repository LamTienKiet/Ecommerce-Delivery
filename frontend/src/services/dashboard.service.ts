import axiosClient from "../utils/axiosClient";

export interface DashboardStatsResponse {
  totalRevenue: number;
  totalOrders: number;
  activeProducts: number;
  totalCustomers: number;
  statusDistribution: {
    status: string;
    count: number;
  }[];
  recentOrders: {
    id: string;
    rawId: number;
    customer: string;
    items: string;
    amount: string;
    status: string;
    time: string;
  }[];
}

export const getDashboardStats = async (): Promise<DashboardStatsResponse> => {
  return await axiosClient.get<any, DashboardStatsResponse>('/dashboard/stats');
};
