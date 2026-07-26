import { ProductList } from "./UserPage/Products/ProductsList";

export const ProductPage = () => {
  return (
    <div className="min-h-screen bg-[#121B16] text-[#F1E9D8] font-sans selection:bg-[#B7913C] selection:text-[#121B16] flex flex-col">
      {/* Client Luxury Header / Navigation */}
      <header className="sticky top-0 z-50 border-b border-[#2a3c31] bg-[#121B16]/95 backdrop-blur-md transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
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
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold tracking-wider uppercase text-[#A9B4A4]">
            <a href="#" className="text-white border-b-2 border-[#B7913C] pb-1 transition duration-200">
              Thực đơn
            </a>
            <a href="#" className="hover:text-white transition duration-200">
              Câu chuyện
            </a>
            <a href="#" className="hover:text-white transition duration-200">
              Không gian
            </a>
            <a href="#" className="hover:text-white transition duration-200">
              Liên hệ
            </a>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-4">
            {/* Cart Icon */}
            <button className="relative p-2.5 rounded-full bg-[#16251e] border border-[#2a3c31] text-[#F1E9D8] hover:text-[#B7913C] hover:border-[#B7913C] transition duration-300">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-[#B7913C] text-[#121B16] text-[10px] font-extrabold rounded-full flex items-center justify-center border-2 border-[#121B16]">
                3
              </span>
            </button>

            {/* Book Table Button */}
            <button className="hidden sm:block rounded-xl border border-[#B7913C] text-[#B7913C] px-5 py-2.5 text-xs font-semibold tracking-widest uppercase hover:bg-[#B7913C] hover:text-[#121B16] transition-all duration-300">
              Đặt bàn ngay
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {/* Hero Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="text-[#B7913C] uppercase text-xs tracking-widest font-bold block">
              Seasonal Collection
            </span>
            <h1 className="text-4xl md:text-5xl font-serif font-medium text-white tracking-tight">
              Tinh Hoa Ẩm Thực
            </h1>
            <div className="flex items-center justify-center gap-3 my-4">
              <div className="h-[1px] w-12 bg-[#B7913C]/40" />
              <div className="w-1.5 h-1.5 rotate-45 bg-[#B7913C]" />
              <div className="h-[1px] w-12 bg-[#B7913C]/40" />
            </div>
            <p className="text-[#A9B4A4] text-sm leading-relaxed">
              Khám phá bộ sưu tập ẩm thực châu Âu đương đại độc quyền tại La TiuKy Resto.
              Mỗi đĩa ăn là một tác phẩm nghệ thuật chế tác thủ công bởi các nghệ nhân bếp trưởng giàu tâm huyết.
            </p>
          </div>

          {/* Product Grid Area */}
          <ProductList />
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
          &copy; {new Date().getFullYear()} La TiuKy Restaurant. Mọi quyền được bảo lưu.
        </div>
      </footer>
    </div>
  );
};
export default ProductPage;
