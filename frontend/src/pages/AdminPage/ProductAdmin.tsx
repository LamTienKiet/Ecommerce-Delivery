import { useMemo, useState } from "react";
import { ProductList } from "../Products/ProductsList";
import type { Product, Category } from "../Products/ProductCard";

const PRODUCTS: Product[] = [
  {
    id: "P-001",
    name: "Súp Hành Tây Kiểu Pháp",
    description: "Phô mai Gruyère nướng, bánh mì bơ tỏi",
    category: "Khai Vị",
    price: "185.000₫",
    stock: 42,
    stockStatus: "in",
    updatedAt: "16 Th7 2026",
    thumbColor: "linear-gradient(160deg,#22344A,#131B26)",
  },
  {
    id: "P-002",
    name: "Gan Ngỗng Áp Chảo",
    description: "Sốt vang đỏ, mứt sung, bánh brioche",
    category: "Khai Vị",
    price: "420.000₫",
    stock: 6,
    stockStatus: "low",
    updatedAt: "16 Th7 2026",
    thumbColor: "linear-gradient(160deg,#3E372A,#211C15)",
  },
  {
    id: "P-003",
    name: "Salad Burrata Cà Chua Heirloom",
    description: "Dầu olive nguyên chất, húng quế",
    category: "Khai Vị",
    price: "210.000₫",
    stock: 18,
    stockStatus: "in",
    updatedAt: "15 Th7 2026",
    thumbColor: "linear-gradient(160deg,#4A3418,#241A0D)",
  },
  {
    id: "P-004",
    name: "Bò Wellington Sốt Truffle",
    description: "Thăn bò Úc, pate nấm, vỏ puff pastry",
    category: "Món Chính",
    price: "890.000₫",
    stock: 24,
    stockStatus: "in",
    updatedAt: "16 Th7 2026",
    thumbColor: "linear-gradient(160deg,#3A2226,#1C1416)",
  },
  {
    id: "P-005",
    name: "Cá Tráp Nướng Muối Biển",
    description: "Sốt beurre blanc, rau củ áp chảo",
    category: "Món Chính",
    price: "650.000₫",
    stock: 0,
    stockStatus: "out",
    updatedAt: "14 Th7 2026",
    thumbColor: "linear-gradient(160deg,#2C2C2C,#161616)",
  },
  {
    id: "P-006",
    name: "Risotto Nấm Porcini",
    description: "Phô mai Parmesan 24 tháng, dầu truffle",
    category: "Món Chính",
    price: "380.000₫",
    stock: 31,
    stockStatus: "in",
    updatedAt: "15 Th7 2026",
    thumbColor: "linear-gradient(160deg,#4C4130,#241F16)",
  },
  {
    id: "P-007",
    name: "Crème Brûlée Vani Madagascar",
    description: "Đường caramel giòn, hạt vani nguyên chất",
    category: "Tráng Miệng",
    price: "145.000₫",
    stock: 27,
    stockStatus: "in",
    updatedAt: "13 Th7 2026",
    thumbColor: "linear-gradient(160deg,#EFE6D3,#C9BB9C)",
  },
  {
    id: "P-008",
    name: "Tarte Tatin Táo Caramel",
    description: "Kem vani tự làm, bột quế",
    category: "Tráng Miệng",
    price: "165.000₫",
    stock: 4,
    stockStatus: "low",
    updatedAt: "13 Th7 2026",
    thumbColor: "linear-gradient(160deg,#5C4324,#372613)",
  },
];

export const ProductAdmin = () => {
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [activeCategory, setActiveCategory] = useState<Category | "Tất Cả">("Tất Cả");
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");

  // Xử lý tìm kiếm và lọc danh mục
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchCategory = activeCategory === "Tất Cả" || p.category === activeCategory;
      const matchSearch =
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [products, activeCategory, search]);

  // Các hàm logic CRUD - bạn tự viết logic kết nối API / Store tại đây
  const handleAddProduct = () => {
    console.log("Add new product click handler");
  };

  const handleEditProduct = (product: Product) => {
    console.log("Edit product:", product);
  };

  const handleDeleteProduct = (id: string) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa món ăn này không?")) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
            Quản Lý Thực Đơn
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Xem, thêm mới, chỉnh sửa thông tin món ăn và trạng thái tồn kho của cửa hàng.
          </p>
        </div>
      </div>

      {/* Presentational List */}
      <ProductList
        products={filteredProducts}
        totalProducts={products.length}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        search={search}
        onSearchChange={setSearch}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        onAddProduct={handleAddProduct}
        onEditProduct={handleEditProduct}
        onDeleteProduct={handleDeleteProduct}
      />
    </div>
  );
};
