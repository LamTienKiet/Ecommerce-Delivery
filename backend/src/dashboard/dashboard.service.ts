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

    // 7. Doanh thu 7 ngày qua
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);
    sevenDaysAgo.setHours(0, 0, 0, 0);

    const recentCompletedOrders = await this.prisma.order.findMany({
      where: {
        currentStatus: 'COMPLETED',
        createdAt: {
          gte: sevenDaysAgo,
        },
      },
      select: {
        totalAmount: true,
        createdAt: true,
      },
    });

    const weeklyRevenue = [];
    const daysOfWeek = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];

    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateString = d.toISOString().split('T')[0]; // YYYY-MM-DD
      const dayName = daysOfWeek[d.getDay()];

      const dailyTotal = recentCompletedOrders
        .filter((o) => {
          // Adjust to local date if needed, but ISO string works fine for UTC consistency
          return o.createdAt.toISOString().split('T')[0] === dateString;
        })
        .reduce((sum, o) => sum + Number(o.totalAmount), 0);

      weeklyRevenue.push({
        date: dateString,
        dayName: dayName,
        revenue: dailyTotal,
      });
    }

    return {
      totalRevenue,
      totalOrders,
      activeProducts,
      totalCustomers,
      statusDistribution,
      recentOrders,
      weeklyRevenue,
    };
  }
}
