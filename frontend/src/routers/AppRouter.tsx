import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AdminLayout } from "../layout/AdminLayout";

export default function AppRouters() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AdminLayout>Dashboard</AdminLayout>} />
      </Routes>
    </BrowserRouter>
  );
}
