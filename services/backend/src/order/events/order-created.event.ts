export class OrderCreatedEvent {
  constructor(
    public readonly orderId: number,
    public readonly userId: number,
    public readonly totalAmount: number,
    public readonly items: { productId: number; quantity: number }[],
    public readonly email?: string,
  ) {}
}
