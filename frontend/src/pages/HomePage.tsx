import { Link } from "react-router-dom";
import "../assets/css/home.css";

export const HomePage = () => {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-bg"></div>
        <div className="hero-overlay"></div>
        
        <div className="hero-content">
          <span className="hero-subtitle">Seasonal Collection</span>
          <h1 className="hero-title">
            Tinh Hoa <em>Ẩm Thực</em>
          </h1>
          <p className="hero-desc">
            Khám phá bộ sưu tập ẩm thực châu Âu đương đại độc quyền tại La TiuKy Resto. Mỗi đĩa ăn là một tác phẩm nghệ thuật chế tác thủ công bởi các nghệ nhân bếp trưởng giàu tâm huyết.
          </p>
          
          <div className="hero-actions">
            <Link to="/menu" className="btn-primary-lux">
              Khám Phá Thực Đơn
            </Link>
            <Link to="/booking" className="btn-outline-lux">
              Đặt Bàn Ngay
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">✨</div>
            <h3 className="feature-title">Không Gian Sang Trọng</h3>
            <p className="feature-desc">
              Thiết kế mang đậm phong cách kiến trúc Châu Âu cổ điển kết hợp đương đại, tạo nên không gian thưởng thức ẩm thực đẳng cấp.
            </p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">🍷</div>
            <h3 className="feature-title">Bộ Sưu Tập Rượu Vang</h3>
            <p className="feature-desc">
              Hàng trăm nhãn vang danh tiếng từ khắp nơi trên thế giới, được tuyển chọn kỹ lưỡng bởi các chuyên gia Sommelier.
            </p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">👨‍🍳</div>
            <h3 className="feature-title">Bếp Trưởng Michelin</h3>
            <p className="feature-desc">
              Thực đơn được thiết kế bởi bếp trưởng đạt sao Michelin, mang đến trải nghiệm vị giác thăng hoa trong từng món ăn.
            </p>
          </div>
        </div>
      </section>
      {/* About Section (Split Layout) */}
      <section className="about-section">
        <div className="about-grid">
          <div className="about-image">
            <img 
              src="https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&q=80&w=1000" 
              alt="Bếp trưởng tại La TiuKy" 
            />
          </div>
          <div className="about-content">
            <span className="section-eyebrow">Câu Chuyện Của Chúng Tôi</span>
            <h2 className="section-title">Nghệ Thuật <em>Ẩm Thực</em> Đương Đại</h2>
            <p className="section-desc">
              Được thành lập từ niềm đam mê mãnh liệt với nền ẩm thực tinh tế, La TiuKy không chỉ là một nhà hàng, mà là một hành trình trải nghiệm các cung bậc cảm xúc. 
              <br/><br/>
              Chúng tôi tuyển chọn những nguyên liệu thượng hạng nhất, kết hợp cùng kỹ thuật nấu nướng hiện đại để tạo nên những tuyệt tác trên bàn ăn, đánh thức mọi giác quan của bạn.
            </p>
            <Link to="/about" className="btn-link-lux">Đọc thêm câu chuyện &rarr;</Link>
          </div>
        </div>
      </section>

      {/* Signature Dishes Section */}
      <section className="signature-section">
        <div className="signature-header">
          <span className="section-eyebrow">Khám Phá</span>
          <h2 className="section-title">Thực Đơn <em>Đặc Trưng</em></h2>
        </div>
        
        <div className="signature-grid">
          {/* Dish 1 */}
          <div className="dish-card">
            <div className="dish-img-wrap">
              <img src="https://images.unsplash.com/photo-1544025162-811114215755?auto=format&fit=crop&q=80&w=800" alt="Bò Wagyu A5" />
            </div>
            <div className="dish-info">
              <h3>Thăn Nội Bò Wagyu A5</h3>
              <p>Phục vụ cùng nấm Truffle đen tươi và sốt rượu vang đỏ Bordeaux lâu năm.</p>
            </div>
          </div>
          
          {/* Dish 2 */}
          <div className="dish-card">
            <div className="dish-img-wrap">
              <img src="https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&q=80&w=800" alt="Sò Điệp Hokkaido" />
            </div>
            <div className="dish-info">
              <h3>Sò Điệp Hokkaido Áp Chảo</h3>
              <p>Kem súp lơ trắng, bọt biển vị thì là và điểm xuyết trứng cá muối Caviar.</p>
            </div>
          </div>
          
          {/* Dish 3 */}
          <div className="dish-card">
            <div className="dish-img-wrap">
              <img src="https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&q=80&w=800" alt="Cocktail Nghệ Thuật" />
            </div>
            <div className="dish-info">
              <h3>The Golden Sunset</h3>
              <p>Cocktail đặc trưng kết hợp rượu Gin cao cấp, hoa hồng và vảy vàng 24k.</p>
            </div>
          </div>
        </div>
        
        <div className="signature-footer">
          <Link to="/menu" className="btn-outline-lux">Xem Toàn Bộ Thực Đơn</Link>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonial-section">
        <div className="testimonial-bg"></div>
        <div className="testimonial-content">
          <div className="quote-icon">❝</div>
          <p className="quote-text">
            "Một bản giao hưởng hoàn hảo của hương vị. La TiuKy không đơn thuần phục vụ bữa ăn, họ thiết kế một trải nghiệm khó quên mà bất kỳ tín đồ sành ăn nào cũng phải ngả mũ."
          </p>
          <div className="quote-author">
            <strong>Nguyễn Trần Kim</strong>
            <span>Nhà Phê Bình Ẩm Thực Tạp Chí Michelin Guide</span>
          </div>
        </div>
      </section>
    </div>
  );
};
