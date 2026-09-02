import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../assets/css/home.css";
import { getProducts } from "../services/product.service";
import { getImageUrl } from "../utils/image";
import type { ProductResponse } from "../type_auth_api/products/product.api";

export const HomePage = () => {
  const navigate = useNavigate();
  const [allProducts, setAllProducts] = useState<ProductResponse[]>([]);
  const [randomDishes, setRandomDishes] = useState<ProductResponse[]>([]);

  useEffect(() => {
    // Fetch products on mount
    async function fetchProducts() {
      try {
        const response = await getProducts(1, 50); // Fetch up to 50 products to pick from
        if (response && response.data && response.data.length > 0) {
          setAllProducts(response.data);
          pickRandomDishes(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch products for home page", error);
      }
    }
    fetchProducts();
  }, []);

  const pickRandomDishes = (productsList: ProductResponse[]) => {
    if (productsList.length <= 3) {
      setRandomDishes(productsList);
      return;
    }
    const shuffled = [...productsList].sort(() => 0.5 - Math.random());
    setRandomDishes(shuffled.slice(0, 3));
  };

  useEffect(() => {
    // Set interval to change dishes every 1 minute (60000 ms)
    if (allProducts.length > 3) {
      const intervalId = setInterval(() => {
        pickRandomDishes(allProducts);
      }, 60000);
      return () => clearInterval(intervalId); // Cleanup on unmount
    }
  }, [allProducts]);

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
            Khám phá bộ sưu tập ẩm thực châu Âu đương đại độc quyền tại La TiuKy
            Resto. Mỗi đĩa ăn là một tác phẩm nghệ thuật chế tác thủ công bởi
            các nghệ nhân bếp trưởng giàu tâm huyết.
          </p>

          <div className="hero-actions">
            <Link to="/menu" className="btn-primary-lux">
              Khám Phá Thực Đơn
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
              Thiết kế mang đậm phong cách kiến trúc Châu Âu cổ điển kết hợp
              đương đại, tạo nên không gian thưởng thức ẩm thực đẳng cấp.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🍷</div>
            <h3 className="feature-title">Bộ Sưu Tập Rượu Vang</h3>
            <p className="feature-desc">
              Hàng trăm nhãn vang danh tiếng từ khắp nơi trên thế giới, được
              tuyển chọn kỹ lưỡng bởi các chuyên gia Sommelier.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">👨‍🍳</div>
            <h3 className="feature-title">Bếp Trưởng Michelin</h3>
            <p className="feature-desc">
              Thực đơn được thiết kế bởi bếp trưởng đạt sao Michelin, mang đến
              trải nghiệm vị giác thăng hoa trong từng món ăn.
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
            <h2 className="section-title">
              Nghệ Thuật <em>Ẩm Thực</em> Đương Đại
            </h2>
            <p className="section-desc">
              Được thành lập từ niềm đam mê mãnh liệt với nền ẩm thực tinh tế,
              La TiuKy không chỉ là một nhà hàng, mà là một hành trình trải
              nghiệm các cung bậc cảm xúc.
              <br />
              <br />
              Chúng tôi tuyển chọn những nguyên liệu thượng hạng nhất, kết hợp
              cùng kỹ thuật nấu nướng hiện đại để tạo nên những tuyệt tác trên
              bàn ăn, đánh thức mọi giác quan của bạn.
            </p>
            <Link to="/about" className="btn-link-lux">
              Đọc thêm câu chuyện &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Signature Dishes Section */}
      <section className="signature-section">
        <div className="signature-header">
          <span className="section-eyebrow">Khám Phá</span>
          <h2 className="section-title">
            Thực Đơn <em>Đặc Trưng</em>
          </h2>
        </div>

        <div className="signature-grid">
          {randomDishes.length > 0 ? (
            randomDishes.map((dish) => (
              <div
                key={dish.id}
                className="dish-card cursor-pointer"
                onClick={() => navigate(`/detail/${dish.id}`)}
              >
                <div className="dish-img-wrap">
                  <img src={getImageUrl(dish.imageUrl)} alt={dish.name} />
                </div>
                <div className="dish-info">
                  <h3>{dish.name}</h3>
                  <p>
                    {dish.description ||
                      "Hương vị tuyệt hảo không thể chối từ."}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div
              style={{
                gridColumn: "1 / -1",
                textAlign: "center",
                padding: "40px",
                color: "var(--ink-faint)",
              }}
            >
              Đang tải thực đơn đặc trưng...
            </div>
          )}
        </div>

        <div className="signature-footer">
          <Link to="/menu" className="btn-outline-lux">
            Xem Toàn Bộ Thực Đơn
          </Link>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonial-section">
        <div className="testimonial-bg"></div>
        <div className="testimonial-content">
          <div className="quote-icon">❝</div>
          <p className="quote-text">
            "Một bản giao hưởng hoàn hảo của hương vị. La TiuKy không đơn thuần
            phục vụ bữa ăn, họ thiết kế một trải nghiệm khó quên mà bất kỳ tín
            đồ sành ăn nào cũng phải ngả mũ."
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
