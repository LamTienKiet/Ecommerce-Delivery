export const ContactPage = () => {
  return (
    <div className="text-[#F1E9D8] max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-[#B7913C] uppercase tracking-[0.3em] text-sm font-semibold mb-4 block">
          Liên Hệ
        </span>
        <h1 className="text-4xl md:text-6xl font-serif mb-6 leading-tight">
          Sẵn Sàng <br />
          <em className="text-[#B7913C]">Đón Tiếp Bạn</em>
        </h1>
        <p className="text-[#A9B4A4] text-lg">
          Hãy liên hệ với chúng tôi để đặt bàn trước hoặc gửi bất kỳ câu hỏi nào. Đội ngũ La TiuKy luôn sẵn lòng phục vụ.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 mb-16">
        {/* Contact Info */}
        <div className="space-y-12">
          <div>
            <h3 className="text-2xl font-serif text-[#B7913C] mb-4">Địa Chỉ</h3>
            <p className="text-[#A9B4A4] leading-relaxed text-lg">
              123 Đường Tinh Hoa, Phường Bến Nghé<br />
              Quận 1, TP. Hồ Chí Minh<br />
              Việt Nam
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-serif text-[#B7913C] mb-4">Giờ Mở Cửa</h3>
            <ul className="text-[#A9B4A4] leading-relaxed text-lg space-y-2">
              <li className="flex justify-between border-b border-[#2a3c31] pb-2">
                <span>Thứ 2 - Thứ 6</span>
                <span>17:00 - 23:00</span>
              </li>
              <li className="flex justify-between border-b border-[#2a3c31] pb-2">
                <span>Thứ 7 - Chủ Nhật</span>
                <span>11:00 - 14:00 | 17:00 - 23:30</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-2xl font-serif text-[#B7913C] mb-4">Liên Lạc</h3>
            <p className="text-[#A9B4A4] leading-relaxed text-lg">
              Hotline: <a href="tel:1900xxxx" className="text-white hover:text-[#B7913C] transition-colors">1900 xxxx</a><br />
              Email: <a href="mailto:info@latiuky.vn" className="text-white hover:text-[#B7913C] transition-colors">info@latiuky.vn</a>
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-[#16251e] p-8 md:p-10 rounded-3xl border border-[#2a3c31] shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#B7913C]/10 rounded-full blur-3xl pointer-events-none"></div>
          
          <h3 className="text-3xl font-serif mb-8 text-white relative z-10">Gửi Lời Nhắn</h3>
          <form className="space-y-6 relative z-10">
            <div>
              <label className="block text-sm font-medium text-[#A9B4A4] mb-2">Họ và Tên</label>
              <input type="text" className="w-full bg-[#121B16] border border-[#2a3c31] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#B7913C] transition-colors" placeholder="Nguyễn Văn A" />
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-[#A9B4A4] mb-2">Điện Thoại</label>
                <input type="tel" className="w-full bg-[#121B16] border border-[#2a3c31] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#B7913C] transition-colors" placeholder="09xxxxxxx" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#A9B4A4] mb-2">Email</label>
                <input type="email" className="w-full bg-[#121B16] border border-[#2a3c31] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#B7913C] transition-colors" placeholder="email@example.com" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#A9B4A4] mb-2">Lời Nhắn</label>
              <textarea rows={4} className="w-full bg-[#121B16] border border-[#2a3c31] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#B7913C] transition-colors resize-none" placeholder="Bạn muốn nhắn gửi điều gì..."></textarea>
            </div>
            <button type="button" className="w-full py-4 rounded-xl bg-[#B7913C] text-[#121B16] font-semibold tracking-wide hover:bg-[#F1E9D8] transition-all duration-300 shadow-lg shadow-[#B7913C]/20 hover:-translate-y-0.5">
              Gửi Thông Điệp
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
