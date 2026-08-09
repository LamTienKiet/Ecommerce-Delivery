import axios from "axios";
const axiosClient = axios.create({
  // Sử dụng biến môi trường. Nếu không có thì fallback về localhost
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});
