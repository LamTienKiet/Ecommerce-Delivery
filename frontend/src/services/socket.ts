import { io, Socket } from 'socket.io-client';

// Đảm bảo URL này trỏ đúng vào Backend (ví dụ Backend chạy port 3000)
const SOCKET_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

let socket: Socket | null = null;

export const initSocket = () => {
  if (!socket) {
    socket = io(SOCKET_URL, {
      transports: ['websocket', 'polling'], // Đảm bảo hỗ trợ cả 2 fallback
      autoConnect: true,
      // Function form: the latest token is read on every (re)connect
      auth: (cb) => cb({ token: localStorage.getItem('token') }),
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
  // Server drops sockets without a valid token; retry with the current one
  if (!socket.connected) socket.connect();
  return socket;
};

export const disconnectSocket = () => {
  socket?.disconnect();
  socket = null;
};
