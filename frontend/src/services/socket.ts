import { io, Socket } from 'socket.io-client';

// Đảm bảo URL này trỏ đúng vào Backend (ví dụ Backend chạy port 3000)
const SOCKET_URL = 'http://localhost:3000';

let socket: Socket | null = null;

export const initSocket = () => {
  if (!socket) {
    socket = io(SOCKET_URL, {
      transports: ['websocket', 'polling'], // Đảm bảo hỗ trợ cả 2 fallback
      autoConnect: true,
    });

    socket.on('connect', () => {
      console.log(`[Socket] Connected to server: ${socket?.id}`);
    });

    socket.on('disconnect', () => {
      console.log('[Socket] Disconnected from server');
    });
  }
  return socket;
};

export const getSocket = () => {
  if (!socket) {
    return initSocket();
  }
  return socket;
};
