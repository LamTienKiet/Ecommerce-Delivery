import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

interface ProtectedRouteProps {
  allowedRoles?: string[]; // Danh sách các role được phép truy cập
  redirectTo?: string; // Trang chuyển hướng nếu không hợp lệ
}

export const ProtectedRoute = ({
  allowedRoles,
  redirectTo = "/login",
}: ProtectedRouteProps) => {
  const { user, token } = useAuthStore();

  // 1. Nếu chưa đăng nhập -> Chuyển hướng về trang Login
  if (!token || !user) {
    return <Navigate to={redirectTo} replace />;
  }

  // 2. Nếu đã đăng nhập nhưng role không khớp với quyền yêu cầu -> Chuyển về menu chính hoặc trang từ chối quyền
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/menu" replace />;
  }

  // 3. Nếu mọi điều kiện thoả mãn -> Render component con (thông qua Outlet)
  return <Outlet />;
};
