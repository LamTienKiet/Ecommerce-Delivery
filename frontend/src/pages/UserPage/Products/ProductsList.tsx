import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "./ProductCard";
import { ProductToolbar } from "./ProductToolbar";
import type { ProductResponse } from "../../../type_auth_api/products/product.api";
import type { CategoryResponse } from "../../../type_auth_api/category/category.api";
import { getCategory } from "../../../services/category.service";
import { getProducts } from "../../../services/product.service";
// Mock data to prevent compilation/network errors

export const ProductList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get("category");

  const [products, setProducts] = useState<ProductResponse[]>([]);
  const [categories, setCategories] = useState<CategoryResponse[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(
    categoryParam ? Number(categoryParam) : null
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("name-asc");

  useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(Number(categoryParam));
    }
  }, [categoryParam]);

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

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (selectedCategory !== null) {
      result = result.filter((p) => p.categoryId === selectedCategory);
    }

    if (searchTerm.trim() !== "") {
      const keyword = searchTerm.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(keyword) ||
          (p.description && p.description.toLowerCase().includes(keyword)),
      );
    }

    if (sortBy === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "name-asc") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "newest") {
      result.sort((a, b) => b.id - a.id);
    }

    return result;
  }, [products, selectedCategory, searchTerm, sortBy]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-4">
        <div className="w-12 h-12 border-4 border-[#B7913C] border-t-transparent rounded-full animate-spin"></div>
        <p className="text-[#A9B4A4] font-medium tracking-wide">
          Đang tải danh mục thượng hạng...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20 border border-rose-900/40 bg-rose-950/10 rounded-2xl max-w-2xl mx-auto px-6">
        <svg
          className="w-12 h-12 mx-auto text-rose-500 mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
        <h3 className="text-lg font-serif text-[#F1E9D8] font-medium">
          Lỗi kết nối máy chủ
        </h3>
        <p className="text-sm text-[#A9B4A4]/80 mt-2">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-emerald-950/60 border border-[#2a3c31] px-5 py-2.5 text-sm font-semibold text-[#B7913C] hover:bg-[#B7913C] hover:text-[#121B16] transition-all duration-300"
        >
          Tải lại trang
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/*Category Tabs (Static selection: "all" is active) */}
      <div className="flex flex-wrap items-center justify-center gap-2 border-b border-[#2a3c31] pb-4">
        {/* Nút Tất Cả */}
        <button
          onClick={() => {
            searchParams.delete("category");
            setSearchParams(searchParams);
            setSelectedCategory(null);
          }}
          className={`rounded-full px-5 py-2.5 text-sm font-medium tracking-wide transition-all duration-300 ${
            selectedCategory === null
              ? "bg-[#B7913C] text-[#121B16] font-semibold"
              : "text-[#A9B4A4] hover:bg-[#16251e] hover:text-[#F1E9D8]"
          }`}
        >
          Tất cả
        </button>

        {/* Các nút danh mục khác */}
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => {
              searchParams.set("category", String(cat.id));
              setSearchParams(searchParams);
              setSelectedCategory(cat.id);
            }}
            className={`rounded-full px-5 py-2.5 text-sm font-medium tracking-wide transition-all duration-300 ${
              selectedCategory === cat.id
                ? "bg-[#B7913C] text-[#121B16] font-semibold"
                : "text-[#A9B4A4] hover:bg-[#16251e] hover:text-[#F1E9D8]"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

     
      <ProductToolbar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />

     
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
