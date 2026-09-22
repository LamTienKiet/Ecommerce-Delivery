import { Link } from "react-router-dom";

export const AboutPage = () => {
  return (
    <div className="text-[#F1E9D8]">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden rounded-3xl mb-16">
        <img
          src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80&w=2000"
          alt="La TiuKy Culinary"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <span className="text-[#B7913C] uppercase tracking-[0.3em] text-sm font-semibold mb-4 block">
            Câu Chuyện Của Chúng Tôi
          </span>
          <h1 className="text-5xl md:text-7xl font-serif mb-6 leading-tight">
            Từ Đam Mê Đến<br />
            <em className="text-[#B7913C]">Tuyệt Tác Ẩm Thực</em>
          </h1>
          <p className="text-[#A9B4A4] text-lg md:text-xl font-light">
            Hành trình mang nghệ thuật Fine Dining Châu Âu đương đại đến với trái tim thực khách Việt.
          </p>
        </div>
      </section>

      {/* Story Content */}
      <section className="max-w-4xl mx-auto px-4 mb-24 space-y-20">
        
        {/* Khởi nguyên */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <h2 className="text-3xl font-serif mb-6 text-[#B7913C]">Khởi Nguyên</h2>
            <p className="text-[#A9B4A4] leading-relaxed mb-4 text-justify">
              Ra đời vào một buổi chiều mùa thu năm 2018 tại góc phố nhỏ Paris, ý tưởng về <strong>La TiuKy</strong> nhen nhóm từ niềm say mê bất tận với những nguyên liệu bản địa tươi mới và kỹ thuật chế biến cổ điển của Pháp.
            </p>
            <p className="text-[#A9B4A4] leading-relaxed text-justify">
              Người sáng lập của chúng tôi mong muốn tạo ra một không gian không chỉ để ăn, mà để <em>cảm nhận</em>. Một nơi mà thời gian như ngừng trôi, nhường chỗ cho sự thăng hoa của ngũ quan. Năm 2022, La TiuKy chính thức có mặt tại Việt Nam, mang theo tinh hoa của nhà hàng 3 sao Michelin.
            </p>
          </div>
          <div className="order-1 md:order-2 rounded-2xl overflow-hidden border border-[#2a3c31] shadow-2xl">
            <img src="https://images.unsplash.com/photo-1577106263724-2c8e03bfe9cf?auto=format&fit=crop&q=80&w=800" alt="Chef preparing dish" className="w-full h-[400px] object-cover hover:scale-105 transition duration-700" />
          </div>
        </div>

        {/* Triết lý */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="rounded-2xl overflow-hidden border border-[#2a3c31] shadow-2xl">
            <img src="https://images.unsplash.com/photo-1581165275037-7507119f187a?auto=format&fit=crop&q=80&w=800" alt="Fresh ingredients" className="w-full h-[400px] object-cover hover:scale-105 transition duration-700" />
          </div>
          <div>
            <h2 className="text-3xl font-serif mb-6 text-[#B7913C]">Triết Lý Nguyên Bản</h2>
            <p className="text-[#A9B4A4] leading-relaxed mb-4 text-justify">
              Tại La TiuKy, chúng tôi tin rằng linh hồn của mọi món ăn nằm ở <strong>nguyên liệu</strong>. Mỗi buổi sáng sớm, các Bếp trưởng trực tiếp lựa chọn từng nhành thảo mộc, từng thớ thịt hảo hạng nhất từ các nông trại hữu cơ đối tác.
            </p>
            <p className="text-[#A9B4A4] leading-relaxed text-justify">
              Chúng tôi không biến tấu nguyên liệu, chúng tôi tôn vinh chúng. Bằng kỹ thuật nấu nướng hiện đại như Sous-vide hay Gastronomy, cấu trúc tự nhiên của nguyên liệu được bảo toàn trọn vẹn, mang lại bản giao hưởng hương vị tinh khiết nhất.
            </p>
          </div>
        </div>

      </section>

      {/* Call to Action */}
      <section className="text-center py-16 bg-[#16251e] rounded-3xl border border-[#2a3c31] mb-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#B7913C]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#B7913C]/5 rounded-full blur-3xl"></div>
        <div className="relative z-10">
          <h2 className="text-3xl font-serif mb-4">Bạn Đã Sẵn Sàng Trải Nghiệm?</h2>
          <p className="text-[#A9B4A4] mb-8 max-w-xl mx-auto">
            Hãy để chúng tôi đánh thức mọi giác quan của bạn bằng một bữa tối lãng mạn không thể quên.
          </p>
          <Link to="/menu" className="inline-block py-3 px-8 rounded-full bg-[#B7913C] text-[#121B16] font-semibold tracking-wide hover:bg-[#F1E9D8] transition-all duration-300 shadow-lg shadow-[#B7913C]/20 hover:-translate-y-1">
            Khám Phá Thực Đơn
          </Link>
        </div>
      </section>
    </div>
  );
};
