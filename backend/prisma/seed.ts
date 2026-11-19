import 'dotenv/config';
import { PrismaMssql } from '@prisma/adapter-mssql';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error('DATABASE_URL environment variable is not defined');
}

const prisma = new PrismaClient({ adapter: new PrismaMssql(connectionString) });

async function main() {
  console.log('🌱 Bắt đầu Seeding...');

  // =========================
  // 1. ROLE
  // =========================

  const adminRole = await prisma.role.upsert({
    where: { name: 'ADMIN' },
    update: {},
    create: { name: 'ADMIN' },
  });

  await prisma.role.upsert({
    where: { name: 'USER' },
    update: {},
    create: { name: 'USER' },
  });

  console.log(' Đã tạo Roles: ADMIN, USER');

  const adminPassword = process.env.ADMIN_PASSWORD;
  if (adminPassword) {
    await prisma.account.upsert({
      where: { username: 'admin' },
      update: {},
      create: {
        username: 'admin',
        email: 'admin@latiukey.com',
        password: await bcrypt.hash(adminPassword, 10),

        status: 'ACTIVE',
        roleId: adminRole.id,

        user: {
          create: {
            fullName: 'Quản trị viên LaTiuKey',
            phone: '0987654321',
            gender: 'Nam',
            address: 'Việt Nam',
          },
        },
      },
    });
    console.log(' Đã kiểm tra tài khoản Admin');
  } else {
    console.log(' Bỏ qua tài khoản Admin vì chưa đặt ADMIN_PASSWORD');
  }

  // =========================
  // 3. CATEGORY
  // =========================

  const pastaCategory = await prisma.category.upsert({
    where: { name: 'Pasta' },
    update: {},
    create: {
      name: 'Pasta',
      description: 'Các món Pasta ngon và trứ danh của nhà hàng LaTiuKey',
    },
  });

  const starterCategory = await prisma.category.upsert({
    where: { name: 'Khai Vị & Ăn Kèm' },
    update: {},
    create: {
      name: 'Khai Vị & Ăn Kèm',
      description: 'Những món khai vị cực chất lượng và sang trọng',
    },
  });

  const mainCourseCategory = await prisma.category.upsert({
    where: { name: 'Món Chính' },
    update: {},
    create: {
      name: 'Món Chính',
      description:
        'Những món chính bạn chỉ có thể tìm tại nhà hàng của chúng tôi',
    },
  });

  const steakCategory = await prisma.category.upsert({
    where: { name: 'Steak & Grill' },
    update: {},
    create: {
      name: 'Steak & Grill',
      description: 'Những miếng steak và đồ nướng cực chất lượng',
    },
  });

  console.log(' Đã thêm Category thành công');

  // Runs on every container start, so never add the menu twice.
  if ((await prisma.product.count()) > 0) {
    console.log(' Seeding hoàn tất, sản phẩm đã tồn tại');
    return;
  }

  await prisma.product.createMany({
    data: [
      // PASTA
      {
        name: 'Spaghetti Carbonara',
        description:
          'Mì Ý Carbonara với sốt kem béo, phô mai và thịt xông khói',
        imageUrl: 'https://example.com/carbonara.jpg',
        price: 159000,
        preparationTime: 15,
        categoryId: pastaCategory.id,
      },
      {
        name: 'Spaghetti Bolognese',
        description: 'Mì Ý kết hợp sốt bò bằm và cà chua truyền thống',
        imageUrl: 'https://example.com/bolognese.jpg',
        price: 169000,
        preparationTime: 20,
        categoryId: pastaCategory.id,
      },

      {
        name: 'Garlic Bread',
        description: 'Bánh mì nướng bơ tỏi thơm giòn',
        imageUrl: 'https://example.com/garlic-bread.jpg',
        price: 69000,
        preparationTime: 10,
        categoryId: starterCategory.id,
      },
      {
        name: 'Caesar Salad',
        description: 'Salad Caesar với rau tươi, phô mai và sốt đặc trưng',
        imageUrl: 'https://example.com/caesar-salad.jpg',
        price: 119000,
        preparationTime: 10,
        categoryId: starterCategory.id,
      },

      // MÓN CHÍNH
      {
        name: 'Grilled Salmon',
        description: 'Cá hồi nướng ăn kèm rau củ và sốt bơ chanh',
        imageUrl: 'https://example.com/grilled-salmon.jpg',
        price: 259000,
        preparationTime: 25,
        categoryId: mainCourseCategory.id,
      },

      // STEAK & GRILL
      {
        name: 'Beef Steak',
        description: 'Bít tết bò áp chảo ăn kèm khoai tây và sốt tiêu đen',
        imageUrl: 'https://example.com/beef-steak.jpg',
        price: 289000,
        preparationTime: 25,
        categoryId: steakCategory.id,
      },
      {
        name: 'Grilled Chicken',
        description: 'Ức gà nướng kiểu Âu ăn kèm rau củ',
        imageUrl: 'https://example.com/grilled-chicken.jpg',
        price: 189000,
        preparationTime: 20,
        categoryId: steakCategory.id,
      },
    ],
  });

  console.log(' Đã tạo danh sách sản phẩm');
  console.log(' Seeding hoàn tất!');
}

main()
  .catch((error) => {
    console.error(' Lỗi Seeding:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
