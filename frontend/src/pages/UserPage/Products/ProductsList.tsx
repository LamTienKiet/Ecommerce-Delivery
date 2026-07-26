import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

import { getProducts } from "../../../services/product.service";
import type { ProductResponse } from "../../../type_auth_api/products/product.api";

export const ProductList = () => {
  // 1. Đặt State bên trong component
  const [products, setProducts] = useState<ProductResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // 2. Sử dụng useEffect để fetch dữ liệu từ API
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await getProducts();
        setProducts(res); // Sử dụng trực tiếp res thay vì res.data
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, []);

  if (loading) return <div>Đang tải món ăn...</div>;

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
