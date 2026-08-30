import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DashboardService {
  constructor(private prisma: PrismaService) {}

  async getStats() {
    // 1. Tổng doanh thu (Các đơn hàng đã hoàn thành)
    const revenueAgg = await this.prisma.order.aggregate({
      where: { currentStatus: 'COMPLETED' },
      _sum: { totalAmount: true },
    });
    const totalRevenue = revenueAgg._sum.totalAmount
      ? Number(revenueAgg._sum.totalAmount)
      : 0;

    // 2. Tổng số đơn hàng (Tất cả trừ Hủy)
    const totalOrders = await this.prisma.order.count({
      where: { currentStatus: { not: 'CANCELLED' } },
    });

    // 3. Tổng số món ăn đang hoạt động
    const activeProducts = await this.prisma.product.count({
      where: { isAvailable: true },
    });

    // 4. Tổng số khách hàng (Role = USER, nếu k có role riêng thì tính tổng User)
    const totalCustomers = await this.prisma.user.count();

    // 5. Thống kê trạng thái đơn hàng để vẽ biểu đồ tròn (Pie Chart)
    const orderStatusGroups = await this.prisma.order.groupBy({
      by: ['currentStatus'],
      _count: {
        id: true,
      },
    });

    // Map orderStatusGroups thành dạng dễ đọc cho frontend
    const statusDistribution = orderStatusGroups.map((group) => ({
      status: group.currentStatus,
      count: group._count.id,
    }));

    // 6. 5 Đơn hàng mới nhất
    const recentOrdersRaw = await this.prisma.order.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: {
        user: true,
        orderItems: {
          include: {
            product: true,
          },
        },
        payment: true,
      },
    });

    // Format dữ liệu đơn hàng cho giống frontend yêu cầu
    const recentOrders = recentOrdersRaw.map((order) => {
      // Nối tên các món ăn lại với nhau (VD: "Pizza x1, Burger x2")
      const itemsString = order.orderItems
        .map((item) => `${item.product?.name || 'Món ăn'} x${item.quantity}`)
        .join(', ');

      return {
        id: `#${order.id}`,
        rawId: order.id,
        customer: order.fullName || order.user?.fullName || 'Khách Hàng',
        items: itemsString,
        amount: `${Number(order.totalAmount).toLocaleString('vi-VN')}đ`,
        status: order.currentStatus,
        time: order.createdAt,
      };
    });

    return {
      totalRevenue,
      totalOrders,
      activeProducts,
      totalCustomers,
      statusDistribution,
      recentOrders,
    };
  }
}
