import { Sidebar } from "./Sidebar";
import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";

export const AdminLayout = () => {
  return (
    <>
      <Header />
      <div>
        <Sidebar />
      </div>
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};
