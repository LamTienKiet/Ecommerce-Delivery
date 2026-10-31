import { OrderService } from './order.service';

describe('OrderService events fire only after commit', () => {
  const emitter = { emit: jest.fn() };
  const tx = {
    order: { findUnique: jest.fn(), update: jest.fn() },
    orderStatusHistory: { create: jest.fn() },
  };
  let commitFails = false;
  const prisma = {
    $transaction: jest.fn(async (fn) => {
      const result = await fn(tx);
      if (commitFails) throw new Error('commit failed');
      return result;
    }),
  };
  const service = new OrderService(prisma as any, emitter as any);

  beforeEach(() => {
    jest.clearAllMocks();
    commitFails = false;
    tx.order.findUnique.mockResolvedValue({
      id: 1,
      user: { account: { email: 'a@b.c' } },
    });
    tx.order.update.mockResolvedValue({
      id: 1,
      userId: 7,
      currentStatus: 'DELIVERING',
    });
  });

  it('emits status update after a successful commit', async () => {
    await service.updateOrderStatus(1, 'DELIVERING');
    expect(emitter.emit).toHaveBeenCalledWith('order.status_updated', {
      userId: 7,
      orderId: 1,
      status: 'DELIVERING',
      email: 'a@b.c',
    });
  });

  it('does not emit when the commit fails', async () => {
    commitFails = true;
    await expect(service.updateOrderStatus(1, 'DELIVERING')).rejects.toThrow();
    expect(emitter.emit).not.toHaveBeenCalled();
  });

  it('reads the order inside the transaction', async () => {
    await service.updateOrderStatus(1, 'DELIVERING');
    expect(tx.order.findUnique).toHaveBeenCalled();
  });
});

describe('OrderService.createOrder totals', () => {
  const emitter = { emit: jest.fn() };
  const tx = {
    cart: { findUnique: jest.fn() },
    order: { create: jest.fn() },
    cartItem: { deleteMany: jest.fn() },
  };
  const prisma = { $transaction: jest.fn((fn) => fn(tx)) };
  const service = new OrderService(prisma as any, emitter as any);

  const dto = {
    fullName: 'A',
    phone: '0900000000',
    shippingAddress: 'HN',
    paymentMethod: 'cash',
  };
  // Prisma returns Decimal prices as strings
  const item = (price: string, quantity: number, isAvailable = true) => ({
    productId: 1,
    quantity,
    note: null,
    product: { name: 'P', price, isAvailable },
  });
  const cartWith = (...cartItems: any[]) =>
    tx.cart.findUnique.mockResolvedValue({ id: 3, cartItems, user: null });
  const savedOrder = () => tx.order.create.mock.calls[0][0].data;

  beforeEach(() => {
    jest.clearAllMocks();
    tx.order.create.mockImplementation(({ data }) => ({ id: 1, ...data }));
  });

  it('delivery: subtotal + 35,000 fee, payment amount matches', async () => {
    cartWith(item('120000.00', 2), item('45000.00', 1));
    await service.createOrder(7, dto as any);
    expect(savedOrder()).toMatchObject({
      totalAmount: 320000, // 240,000 + 45,000 + 35,000
      deliveryFee: 35000,
      discount: 0,
      payment: { create: { amount: 320000 } },
    });
  });

  it('pickup: no delivery fee', async () => {
    cartWith(item('100000.00', 1));
    await service.createOrder(7, { ...dto, orderType: 'pickup' } as any);
    expect(savedOrder()).toMatchObject({ totalAmount: 100000, deliveryFee: 0 });
  });

  it('promo LATIUKY10 (any case): 10% off the subtotal only, rounded', async () => {
    cartWith(item('125005.00', 1));
    await service.createOrder(7, { ...dto, promoCode: 'latiuky10' } as any);
    // 10% of 125,005 = 12,500.5 → 12,501; fee is not discounted
    expect(savedOrder()).toMatchObject({
      discount: 12501,
      totalAmount: 125005 + 35000 - 12501,
    });
  });

  it('unknown promo gives no discount', async () => {
    cartWith(item('100000.00', 1));
    await service.createOrder(7, { ...dto, promoCode: 'FAKE' } as any);
    expect(savedOrder()).toMatchObject({ discount: 0, totalAmount: 135000 });
  });

  it('rejects an empty cart without writing anything', async () => {
    cartWith();
    await expect(service.createOrder(7, dto as any)).rejects.toThrow('Cart is empty');
    expect(tx.order.create).not.toHaveBeenCalled();
    expect(emitter.emit).not.toHaveBeenCalled();
  });

  it('rejects an unavailable product and keeps the cart', async () => {
    cartWith(item('100000.00', 1), item('50000.00', 1, false));
    await expect(service.createOrder(7, dto as any)).rejects.toThrow('not available');
    expect(tx.order.create).not.toHaveBeenCalled();
    expect(tx.cartItem.deleteMany).not.toHaveBeenCalled();
  });
});
