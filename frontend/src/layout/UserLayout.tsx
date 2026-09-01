import { Link, NavLink, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { useCartStore } from "../store/useCartStore";
import { useEffect } from "react";

export const UserLayout = () => {
  const { user, logout } = useAuthStore();
  const { cartCount, fetchCartCount } = useCartStore();

  useEffect(() => {
    if (user) {
      fetchCartCount();
    }
  }, [user, fetchCartCount]);
  return (
    <div className="min-h-screen bg-[#121B16] text-[#F1E9D8] font-sans selection:bg-[#B7913C] selection:text-[#121B16] flex flex-col">
      {/* Client Luxury Header / Navigation */}
      <header className="sticky top-0 z-50 border-b border-[#2a3c31] bg-[#121B16]/95 backdrop-blur-md transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
          {/* Brand Logo */}
          <Link to="/menu" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#B7913C] rounded-lg flex items-center justify-center text-[#121B16] font-bold text-xl shadow-lg shadow-[#B7913C]/10">
              LT
            </div>
            <div>
              <span className="font-serif text-lg font-bold tracking-widest uppercase text-white block">
                LA <em className="text-[#B7913C] not-italic">TiuKy</em>
              </span>
              <span className="text-[9px] uppercase tracking-widest text-[#A9B4A4] block">
                Culinary Experience
              </span>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold tracking-wider uppercase">
            <NavLink
              to="/menu"
              className={({ isActive }) =>
                `transition duration-200 pb-1 ${
                  isActive
                    ? "text-white border-b-2 border-[#B7913C]"
                    : "text-[#A9B4A4] hover:text-white"
                }`
              }
            >
              Thực đơn
            </NavLink>
            <NavLink
              to="/category"
              className={({ isActive }) =>
                `transition duration-200 pb-1 ${
                  isActive
                    ? "text-white border-b-2 border-[#B7913C]"
                    : "text-[#A9B4A4] hover:text-white"
                }`
              }
            >
              Danh mục
            </NavLink>
            <NavLink
              to="/order"
              className={({ isActive }) =>
                `transition duration-200 pb-1 ${
                  isActive
                    ? "text-white border-b-2 border-[#B7913C]"
                    : "text-[#A9B4A4] hover:text-white"
                }`
              }
            >
              Đơn hàng
            </NavLink>
            <a
              href="#"
              className="text-[#A9B4A4] hover:text-white transition duration-200"
            >
              Câu chuyện
            </a>
            <a
              href="#"
              className="text-[#A9B4A4] hover:text-white transition duration-200"
            >
              Không gian
            </a>
            <a
              href="#"
              className="text-[#A9B4A4] hover:text-white transition duration-200"
            >
              Liên hệ
            </a>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-4">
            {/* Cart Icon */}
            <Link to="/cart">
              <button className="relative p-2.5 rounded-full bg-[#16251e] border border-[#2a3c31] text-[#F1E9D8] hover:text-[#B7913C] hover:border-[#B7913C] transition duration-300">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-[#B7913C] text-[#121B16] text-[10px] font-extrabold rounded-full flex items-center justify-center border-2 border-[#121B16]">
                  {cartCount}
                </span>
              </button>
            </Link>

            {/* Book Table Button / User Profile */}
            {user ? (
              <div className="hidden sm:flex items-center gap-3">
                <Link
                  to="/profile"
                  className="flex items-center gap-2 group cursor-pointer transition-all duration-300"
                >
                  <div className="w-8 h-8 rounded-full bg-[#16251e] border border-[#2a3c31] text-[#A9B4A4] group-hover:text-[#B7913C] group-hover:border-[#B7913C] transition-all duration-300 flex items-center justify-center overflow-hidden">
                    {user.avatar ? (
                      <img src={`http://localhost:3000${user.avatar}`} alt="Avatar" className="w-full h-full object-cover" />
                    ) : (
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    )}
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-[10px] text-[#A9B4A4] uppercase tracking-widest">
                      Xin chào
                    </span>
                    <span className="text-sm font-semibold text-[#B7913C] group-hover:text-[#F1E9D8] transition-colors duration-300">
                      {user.username}
                    </span>
                  </div>
                </Link>
                <div className="w-px h-6 bg-[#2a3c31] hidden sm:block"></div>
                <button
                  onClick={() => logout()}
                  className="rounded-xl border border-[#2a3c31] bg-[#16251e] p-2 text-[#A9B4A4] hover:text-[#B7913C] hover:border-[#B7913C] transition-all duration-300"
                  title="Đăng xuất"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                </button>
              </div>
            ) : (
              <Link to="/login">
                <button className="hidden sm:block rounded-xl border border-[#B7913C] text-[#B7913C] px-5 py-2.5 text-xs font-semibold tracking-widest uppercase hover:bg-[#B7913C] hover:text-[#121B16] transition-all duration-300">
                  Đăng nhập ngay
                </button>
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <Outlet />
        </div>
      </main>

      {/* Luxury Footer */}
      <footer className="border-t border-[#2a3c31] bg-[#0d1411] py-12 text-center text-xs text-[#A9B4A4] space-y-4">
        <div className="flex justify-center items-center gap-2 text-white font-serif text-sm tracking-widest uppercase">
          <span>LA TIUKY RESTAURANT</span>
        </div>
        <p className="max-w-md mx-auto text-[11px] leading-relaxed">
          Địa chỉ: 123 Đường Tinh Hoa, Quận 1, TP. Hồ Chí Minh <br />
          Hotline đặt bàn: 1900 xxxx - Email: info@latiuky.vn
        </p>
        <div className="pt-4 border-t border-[#182720]/40 max-w-xs mx-auto">
          &copy; {new Date().getFullYear()} La TiuKy Restaurant. Mọi quyền được
          bảo lưu.
        </div>
      </footer>
    </div>
  );
};
