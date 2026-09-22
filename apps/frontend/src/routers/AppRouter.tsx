import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AdminLayout } from "../layout/AdminLayout";
import { UserLayout } from "../layout/UserLayout";
import { LoginPage } from "../pages/LoginPage";
import { RegisterPage } from "../pages/Register";
import { CategoryAdmin } from "../pages/AdminPage/CategoryAdmin";
import { ProductAdmin } from "../pages/AdminPage/ProductAdmin";
import { DashboardPage } from "../pages/AdminPage/DashboardPage";
import { OrderPage } from "../pages/UserPage/Orders/OrderPage";
import { ProductPage } from "../pages/ProductPage";
import { CategoryPage } from "../pages/UserPage/Categories/CategoryPage";
import { ProductDetail } from "../pages/UserPage/Products/ProductDetail";
import { OrderAdmin } from "../pages/AdminPage/OrderAdmin";
import { HomePage } from "../pages/HomePage";
import { CartPage } from "../pages/UserPage/Cart/CartPage";
import { CheckoutPage } from "../pages/UserPage/Checkout/CheckoutPage";
import { OrderDetail } from "../pages/UserPage/Orders/OrderDetail";
import { RevenueAdmin } from "../pages/AdminPage/RevenueAdmin";
import { UserAdmin } from "../pages/AdminPage/UserAdmin";
import { ProtectedRoute } from "../components/ProtectedRoute";
import { ProfilePage } from "../pages/UserPage/Profile/ProfilePage";
import { PaymentReturnPage } from "../pages/UserPage/Checkout/PaymentReturnPage";
import { AboutPage } from "../pages/UserPage/AboutPage";
import { SpacePage } from "../pages/UserPage/SpacePage";
import { ContactPage } from "../pages/UserPage/ContactPage";

export default function AppRouters() {
  return (
    <BrowserRouter>
      <Routes>
        {/* --- ROUTES CHỈ ADMIN TRUY CẬP ĐƯỢC --- */}
        <Route element={<ProtectedRoute allowedRoles={["ADMIN"]} />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path="products" element={<ProductAdmin />} />
            <Route path="orders" element={<OrderAdmin />} />
            <Route path="categories" element={<CategoryAdmin />} />
            <Route path="revenue" element={<RevenueAdmin />} />
            <Route path="users" element={<UserAdmin />} />
          </Route>
        </Route>
        {/* --- ROUTES CẦN ĐĂNG NHẬP MỚI ĐƯỢC VÀO ---*/}
        <Route element={<ProtectedRoute allowedRoles={["USER"]} />}>
          <Route element={<UserLayout />}>
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/order" element={<OrderPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/order/:id" element={<OrderDetail />} />
            <Route path="/payment-return" element={<PaymentReturnPage />} />
          </Route>
        </Route>
        {/* --- ROUTES CÔNG KHAI --- */}
        <Route element={<UserLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/menu" element={<ProductPage />} />
          <Route path="/category" element={<CategoryPage />} />
          <Route path="/detail/:id" element={<ProductDetail />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/space" element={<SpacePage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Route>
        {/* Auth Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  );
}
