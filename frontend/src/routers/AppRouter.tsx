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
import { CartPage } from "../pages/UserPage/Cart/CartPage";
import { OrderDetail } from "../pages/UserPage/Orders/OrderDetail";
import { RevenueAdmin } from "../pages/AdminPage/RevenueAdmin";

export default function AppRouters() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="products" element={<ProductAdmin />} />
          <Route path="orders" element={<OrderAdmin />} />
          <Route path="categories" element={<CategoryAdmin />} />
          <Route path="revenue" element={<RevenueAdmin />} />
        </Route>

        {/* Client Routes wrapped in UserLayout */}
        <Route element={<UserLayout />}>
          <Route path="/menu" element={<ProductPage />} />
          <Route path="/category" element={<CategoryPage />} />
          <Route path="/detail/:id" element={<ProductDetail />} />
          <Route path="/order" element={<OrderPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/order/:id" element={<OrderDetail />} />
        </Route>

        {/* Auth Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  );
}
