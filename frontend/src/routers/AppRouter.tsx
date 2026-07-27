import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AdminLayout } from "../layout/AdminLayout";
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
        <Route path="/" element={<AdminLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="products" element={<ProductAdmin />} />
          <Route path="orders" element={<OrderPage />} />
          <Route path="categories" element={<CategoryAdmin />} />
        </Route>
        <Route path="/menu" element={<ProductPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/category" element={<CategoryPage />} />
      </Routes>
    </BrowserRouter>
  );
}
