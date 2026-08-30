import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  try {
    const revenueAgg = await prisma.order.aggregate({
      where: { currentStatus: 'COMPLETED' },
      _sum: { totalAmount: true },
    });
    console.log('revenueAgg:', revenueAgg);

    const totalOrders = await prisma.order.count({
      where: { currentStatus: { not: 'CANCELLED' } },
    });
    console.log('totalOrders:', totalOrders);

    const activeProducts = await prisma.product.count({
      where: { isAvailable: true },
    });
    console.log('activeProducts:', activeProducts);

    const orderStatusGroups = await prisma.order.groupBy({
      by: ['currentStatus'],
      _count: { id: true },
    });
    console.log('orderStatusGroups:', orderStatusGroups);

    const recentOrdersRaw = await prisma.order.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: {
        user: true,
        orderItems: {
          include: { product: true },
        },
        payment: true,
      },
    });
    console.log('recentOrdersRaw[0]:', recentOrdersRaw[0]);
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}
main();
