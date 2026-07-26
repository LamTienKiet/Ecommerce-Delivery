import ProductCard from "./ProductCard";
import { ProductToolbar } from "./ProductToolbar";
import type { ProductResponse } from "../../../type_auth_api/products/product.api";

// Mock data to prevent compilation/network errors
const MOCK_PRODUCTS: ProductResponse[] = [
  {
    id: 1,
    name: "Súp Bào Ngư Vi Cá",
    description: "Súp bào ngư thượng hạng kết hợp vi cá hảo hạng, hầm sâm và táo đỏ trong 12 giờ giúp bồi bổ sức khỏe tối đa.",
    imageUrl: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&q=80&w=600",
    price: 350000,
    isAvailable: true,
    preparationTime: 20,
    categoryId: 1, // Khai vị
  },
  {
    id: 2,
    name: "Thịt Bò Wagyu Nướng Đá",
    description: "Thịt bò Wagyu Nhật Bản A5 mềm tan trong miệng, nướng xèo xèo trực tiếp trên đá núi lửa kèm sốt tiêu đen đặc trưng.",
    imageUrl: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=600",
    price: 1250000,
    isAvailable: true,
    preparationTime: 25,
    categoryId: 2, // Món chính
  },
  {
    id: 3,
    name: "Tôm Hùm Sốt Phô Mai Pháp",
    description: "Tôm hùm Nha Trang tươi sống đút lò sốt phô mai Mozzarella béo ngậy, ăn kèm bánh mì bơ tỏi giòn tan.",
    imageUrl: "https://images.unsplash.com/photo-1559737689-997463f1402b?auto=format&fit=crop&q=80&w=600",
    price: 890000,
    isAvailable: true,
    preparationTime: 30,
    categoryId: 2, // Món chính
  },
  {
    id: 4,
    name: "Salad Vịt Xông Khói Sốt Dâu Tằm",
    description: "Rau rocket xanh tươi trộn với ức vịt xông khói thái lát mỏng, sốt quả dâu tằm chua ngọt mát lành.",
    imageUrl: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=600",
    price: 180000,
    isAvailable: false,
    preparationTime: 15,
    categoryId: 1, // Khai vị
  },
  {
    id: 5,
    name: "Bánh Soufflé Sô-cô-la Trầm",
    description: "Bánh soufflé nướng phồng cổ điển Pháp với nhân sô-cô-la tan chảy ngọt ngào, dùng kèm kem vani lạnh.",
    imageUrl: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&q=80&w=600",
    price: 150000,
    isAvailable: true,
    preparationTime: 15,
    categoryId: 3, // Tráng miệng
  },
  {
    id: 6,
    name: "Rượu Vang Đỏ Bordeaux Cabernet",
    description: "Chai rượu vang đỏ thượng hạng nhập khẩu trực tiếp từ vùng Bordeaux nước Pháp, hậu vị chát nhẹ tinh tế.",
    imageUrl: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&q=80&w=600",
    price: 1850000,
    isAvailable: true,
    preparationTime: 5,
    categoryId: 4, // Đồ uống
  }
];

export const ProductList = () => {
  const categories = [
    { id: "all", label: "Tất cả thực đơn" },
    { id: "1", label: "Món khai vị" },
    { id: "2", label: "Món chính" },
    { id: "3", label: "Món tráng miệng" },
    { id: "4", label: "Thức uống" },
  ];

  return (
    <div className="space-y-8">
      {/* Category Tabs (Static selection: "all" is active) */}
      <div className="flex flex-wrap items-center justify-center gap-2 border-b border-[#2a3c31] pb-4">
        {categories.map((cat) => (
          <button
            key={cat.id}
            className={`px-5 py-2.5 rounded-full text-sm font-medium tracking-wide transition-all duration-300 ${
              cat.id === "all"
                ? "bg-[#B7913C] text-[#121B16] font-semibold shadow-lg shadow-[#B7913C]/10"
                : "text-[#A9B4A4] hover:text-[#F1E9D8] hover:bg-[#16251e]"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Toolbar (Static visual elements) */}
      <ProductToolbar />

      {/* Grid List (Direct mapping over all products) */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {MOCK_PRODUCTS.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
