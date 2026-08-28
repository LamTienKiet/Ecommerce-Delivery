import { apiClient } from './api';

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
  const response = await apiClient.get('/dashboard/stats');
  return response.data;
};
