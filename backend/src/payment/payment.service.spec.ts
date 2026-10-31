process.env.VNPAY_HASH_SECRET = 'test-secret';
import { PaymentService } from './payment.service';

describe('PaymentService.processVnpayResult', () => {
  const tx = {
    payment: { findUnique: jest.fn(), updateMany: jest.fn() },
    paymentTransaction: { upsert: jest.fn() },
    order: { updateMany: jest.fn() },
    orderStatusHistory: { create: jest.fn() },
  };
  const prisma = { $transaction: jest.fn((fn) => fn(tx)) };
  const service = new PaymentService(prisma as any);

  // Builds a callback query the way VNPay would: signed raw params
  const callback = (overrides: Record<string, string> = {}) => {
    const params = {
      vnp_TxnRef: '12-1700000000000',
      vnp_Amount: '15000000', // 150,000 VND * 100
      vnp_ResponseCode: '00',
      vnp_TransactionNo: '999',
      vnp_OrderInfo: 'Thanh toan don hang 12',
      ...overrides,
    };
    const s = service as any;
    return { ...params, vnp_SecureHash: s.sign(s.sortObject(params)) };
  };

  beforeEach(() => {
    jest.clearAllMocks();
    tx.payment.findUnique.mockResolvedValue({ id: 5, amount: '150000.00', status: 'PENDING' });
    tx.payment.updateMany.mockResolvedValue({ count: 1 });
    tx.order.updateMany.mockResolvedValue({ count: 1 });
  });

  it('confirms a valid successful payment', async () => {
    const r = await service.processVnpayResult(callback());
    expect(r).toMatchObject({ RspCode: '00', orderId: 12, isSuccess: true });
    expect(tx.payment.updateMany).toHaveBeenCalledWith({
      where: { id: 5, status: { not: 'SUCCESS' } },
      data: { status: 'SUCCESS' },
    });
    expect(tx.orderStatusHistory.create).toHaveBeenCalled();
  });

  it('rejects a tampered query', async () => {
    const q = { ...callback(), vnp_Amount: '100' };
    const r = await service.processVnpayResult(q);
    expect(r.RspCode).toBe('97');
    expect(prisma.$transaction).not.toHaveBeenCalled();
  });

  it('rejects an amount that does not match the order', async () => {
    const r = await service.processVnpayResult(callback({ vnp_Amount: '100' }));
    expect(r.RspCode).toBe('04');
    expect(tx.payment.updateMany).not.toHaveBeenCalled();
  });

  it('does nothing when the payment is already SUCCESS (duplicate callback)', async () => {
    tx.payment.updateMany.mockResolvedValue({ count: 0 });
    const r = await service.processVnpayResult(callback({ vnp_ResponseCode: '24' }));
    expect(r.RspCode).toBe('02');
    expect(tx.paymentTransaction.upsert).not.toHaveBeenCalled();
    expect(tx.order.updateMany).not.toHaveBeenCalled();
  });

  it('a retry after a failed attempt overwrites the transaction row', async () => {
    tx.payment.findUnique.mockResolvedValue({ id: 5, amount: '150000.00', status: 'FAILED' });
    await service.processVnpayResult(callback());
    expect(tx.paymentTransaction.upsert).toHaveBeenCalledWith(
      expect.objectContaining({ where: { paymentId: 5 } }),
    );
  });

  it('a URL from createVnpayUrl carries a signature the handler accepts', async () => {
    const url = service.createVnpayUrl({ id: 12, totalAmount: '150000.00' }, '1.2.3.4');
    const query = Object.fromEntries(new URL(url.replace(/\+/g, '%20')).searchParams);
    // VNPay echoes these back; only the signature check matters here
    const r = await service.processVnpayResult(query);
    expect(r.RspCode).not.toBe('97');
  });
});
