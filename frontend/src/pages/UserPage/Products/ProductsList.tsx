import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { ProductToolbar } from "./ProductToolbar";
import type { ProductResponse } from "../../../type_auth_api/products/product.api";
import type { CategoryResponse } from "../../../type_auth_api/category/category.api";
import { getCategory } from "../../../services/category.service";
import { getProducts } from "../../../services/product.service";
// Mock data to prevent compilation/network errors

export const ProductList = () => {
  const [products, setProducts] = useState<ProductResponse[]>([]);
  const [categories, setCategories] = useState<CategoryResponse[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("name-asc");

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError(null);
        const [products, categories] = await Promise.all([
          getProducts(),
          getCategory(),
        ]);

        setProducts(products);
        setCategories(categories);
      } catch (err) {
        console.log("Failed to fetch data from Database", err);
        setError(
          "Không thể tải danh sách món ăn từ cơ sở dữ liệu. Vui lòng kiểm tra lại",
        );
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const filteredProducts = products.filter((product) => {
    const term = searchTerm.toLowerCase();
    return (
      product.name.toLowerCase().includes(term) ||
      (product.description && product.description.toLowerCase().includes(term))
    );
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "name-asc") {
      return a.name.localeCompare(b.name, "vi");
    }
    if (sortBy === "name-desc") {
      return b.name.localeCompare(a.name, "vi");
    }
    return 0;
  });

  return (
    <div className="space-y-8">
      {/*Category Tabs (Static selection: "all" is active) */}
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => setSelectedCategory(cat.id)}
          className={`rounded-full px-5 py-2.5 text-sm font-medium tracking-wide transition-all duration-300 ${
            selectedCategory === cat.id
              ? "bg-[#B7913C] text-[#121B16] font-semibold"
              : "text-[#A9B4A4] hover:bg-[#16251e] hover:text-[#F1E9D8]"
          }`}
        >
          {cat.name}
        </button>
      ))}

      {/* Toolbar (Static visual elements) */}
      <ProductToolbar />

      {/* Grid List (Direct mapping over all products) */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
