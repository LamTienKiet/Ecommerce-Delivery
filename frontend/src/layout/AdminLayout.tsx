import { Sidebar } from "./Sidebar";
import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";

export const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex">
      <Sidebar />
      <div className="flex-1 pl-64 flex flex-col min-h-screen">
        <Header />

        <main className="flex-grow p-6 md:p-8">
          <div className="max-w-7xl mx-auto space-y-6">
            <Outlet />
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};
