import { NotFoundException } from '@nestjs/common';
import { CartService } from './cart.service';

describe('CartService ownership', () => {
  const prisma = {
    cartItem: { deleteMany: jest.fn(), updateMany: jest.fn() },
  };
  const service = new CartService(prisma as any);

  beforeEach(() => jest.clearAllMocks());

  it('scopes delete to the caller cart', async () => {
    prisma.cartItem.deleteMany.mockResolvedValue({ count: 1 });
    await service.removeCartItem(7, 42);
    expect(prisma.cartItem.deleteMany).toHaveBeenCalledWith({
      where: { id: 42, cart: { userId: 7 } },
    });
  });

  it("rejects touching another user's item", async () => {
    prisma.cartItem.updateMany.mockResolvedValue({ count: 0 });
    await expect(service.updateCartItemQuantity(7, 42, 3)).rejects.toThrow(
      NotFoundException,
    );
  });

  it('quantity 0 deletes, scoped to the caller', async () => {
    prisma.cartItem.deleteMany.mockResolvedValue({ count: 1 });
    await service.updateCartItemQuantity(7, 42, 0);
    expect(prisma.cartItem.deleteMany).toHaveBeenCalledWith({
      where: { id: 42, cart: { userId: 7 } },
    });
    expect(prisma.cartItem.updateMany).not.toHaveBeenCalled();
  });
});
