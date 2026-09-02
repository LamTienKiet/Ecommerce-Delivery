export const SpacePage = () => {
  return (
    <div className="text-[#F1E9D8]">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-[#B7913C] uppercase tracking-[0.3em] text-sm font-semibold mb-4 block">
          Không Gian Nghệ Thuật
        </span>
        <h1 className="text-4xl md:text-6xl font-serif mb-6 leading-tight">
          Nơi Cảm Xúc <br />
          <em className="text-[#B7913C]">Được Thăng Hoa</em>
        </h1>
        <p className="text-[#A9B4A4] text-lg">
          Lấy cảm hứng từ kiến trúc tân cổ điển Châu Âu, La TiuKy mang đến không gian ấm cúng, riêng tư nhưng không kém phần tráng lệ.
        </p>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        <div className="md:col-span-2 rounded-2xl overflow-hidden border border-[#2a3c31] relative group h-[400px]">
          <img src="https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&q=80&w=1200" alt="Main dining" className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="absolute bottom-6 left-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
            <h3 className="text-2xl font-serif text-[#B7913C]">Sảnh Chính</h3>
            <p className="text-[#A9B4A4]">Không gian mở dưới ánh đèn pha lê</p>
          </div>
        </div>

        <div className="rounded-2xl overflow-hidden border border-[#2a3c31] relative group h-[400px]">
          <img src="https://images.unsplash.com/photo-1544148103-0773bf10d330?auto=format&fit=crop&q=80&w=800" alt="Wine cellar" className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="absolute bottom-6 left-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
            <h3 className="text-2xl font-serif text-[#B7913C]">Hầm Rượu</h3>
            <p className="text-[#A9B4A4]">Bộ sưu tập vang danh tiếng</p>
          </div>
        </div>

        <div className="rounded-2xl overflow-hidden border border-[#2a3c31] relative group h-[400px]">
          <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800" alt="Private room" className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="absolute bottom-6 left-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
            <h3 className="text-2xl font-serif text-[#B7913C]">Phòng VIP</h3>
            <p className="text-[#A9B4A4]">Riêng tư & Đẳng cấp</p>
          </div>
        </div>

        <div className="md:col-span-2 rounded-2xl overflow-hidden border border-[#2a3c31] relative group h-[400px]">
          <img src="https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=1200" alt="Bar area" className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="absolute bottom-6 left-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
            <h3 className="text-2xl font-serif text-[#B7913C]">Quầy Bar</h3>
            <p className="text-[#A9B4A4]">Cocktail sáng tạo từ Mixologist</p>
          </div>
        </div>
      </div>
    </div>
  );
};
