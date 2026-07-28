import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AdminLayout } from "../layout/AdminLayout";
import { UserLayout } from "../layout/UserLayout";
import { LoginPage } from "../pages/LoginPage";
import { RegisterPage } from "../pages/Register";
import { CategoryAdmin } from "../pages/AdminPage/CategoryAdmin";
import { ProductAdmin } from "../pages/AdminPage/ProductAdmin";
import { DashboardPage } from "../pages/AdminPage/DashboardPage";
import { OrderPage } from "../pages/OrderPage";
import { ProductPage } from "../pages/ProductPage";
import { CategoryPage } from "../pages/UserPage/Categories/CategoryPage";

export default function AppRouters() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Admin Routes */}
        <Route path="/" element={<AdminLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="products" element={<ProductAdmin />} />
          <Route path="orders" element={<OrderPage />} />
          <Route path="categories" element={<CategoryAdmin />} />
        </Route>

        {/* Client Routes wrapped in UserLayout */}
        <Route element={<UserLayout />}>
          <Route path="/menu" element={<ProductPage />} />
          <Route path="/category" element={<CategoryPage />} />
        </Route>

        {/* Auth Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  );
}

