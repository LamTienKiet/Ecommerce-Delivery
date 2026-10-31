import { NotificationGateway } from './notification.gateway';

describe('NotificationGateway', () => {
  const jwt = { verifyAsync: jest.fn() };
  const gateway = new NotificationGateway(jwt as any);
  const client = () =>
    ({ id: 's1', handshake: { auth: { token: 't' } }, join: jest.fn(), disconnect: jest.fn() }) as any;

  it('drops sockets with an invalid token', async () => {
    jwt.verifyAsync.mockRejectedValue(new Error('bad'));
    const c = client();
    await gateway.handleConnection(c);
    expect(c.disconnect).toHaveBeenCalledWith(true);
    expect(c.join).not.toHaveBeenCalled();
  });

  it('puts a valid socket in its own user room', async () => {
    jwt.verifyAsync.mockResolvedValue({ sub: 7 });
    const c = client();
    await gateway.handleConnection(c);
    expect(c.join).toHaveBeenCalledWith('user_7');
  });

  it('emits only to that user room, without the email', () => {
    const emit = jest.fn();
    const to = jest.fn(() => ({ emit }));
    gateway.server = { to, emit: jest.fn() } as any;
    gateway.handleOrderStatusUpdate({ userId: 7, orderId: 1, status: 'DELIVERING', email: 'a@b.c' });
    expect(to).toHaveBeenCalledWith('user_7');
    expect(emit).toHaveBeenCalledWith('orderStatusUpdate_7', { userId: 7, orderId: 1, status: 'DELIVERING' });
    expect((gateway.server as any).emit).not.toHaveBeenCalled();
  });
});
