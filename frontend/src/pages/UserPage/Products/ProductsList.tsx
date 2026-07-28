import ProductCard from "./ProductCard";
import { ProductToolbar } from "./ProductToolbar";
import type { ProductResponse } from "../../../type_auth_api/products/product.api";

// Mock data to prevent compilation/network errors

export const ProductList = () => {
  const getCategoryName = (id: number) => {
    switch (id) {
      case 1:
        return "Appetizer";

      case 2:
        return "Main Course";

      case 3:
        return "Dessert";

      default:
        return "Unknown";
    }
  };
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
