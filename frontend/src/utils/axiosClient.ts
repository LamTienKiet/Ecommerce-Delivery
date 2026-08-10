import axios from "axios";
const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

//Dau tien tao request interceptor de chan moi request gui len tu server va lay token gan vao header
axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

//Tiep theo tao response giup lam gon du lieu va bat loi
axiosClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const { response } = error;

    if (response && response.status === 401) {
      console.error("Phiên đăng nhập hết hạn, vui lòng đăng nhập lại!");
      localStorage.removeItem("token");
    }
    return Promise.reject(error);
  },
);

export default axiosClient;
