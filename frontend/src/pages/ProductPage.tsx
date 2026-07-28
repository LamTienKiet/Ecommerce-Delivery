import { useState } from "react";
import { ProductList } from "./UserPage/Products/ProductsList";
import type { ProductResponse } from "../type_auth_api/products/product.api";
import type { CategoryResponse } from "../type_auth_api/category/category.api";

export const ProductPage = () => {
 
    <>
      {/* Hero Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
        <span className="text-[#B7913C] uppercase text-xs tracking-widest font-bold block">
          Seasonal Collection
        </span>
        <h1 className="text-4xl md:text-5xl font-serif font-medium text-white tracking-tight">
          Tinh Hoa Ẩm Thực
        </h1>
        <div className="flex items-center justify-center gap-3 my-4">
          <div className="h-[1px] w-12 bg-[#B7913C]/40" />
          <div className="w-1.5 h-1.5 rotate-45 bg-[#B7913C]" />
          <div className="h-[1px] w-12 bg-[#B7913C]/40" />
        </div>
        <p className="text-[#A9B4A4] text-sm leading-relaxed">
          Khám phá bộ sưu tập ẩm thực châu Âu đương đại độc quyền tại La TiuKy
          Resto. Mỗi đĩa ăn là một tác phẩm nghệ thuật chế tác thủ công bởi các
          nghệ nhân bếp trưởng giàu tâm huyết.
        </p>
      </div>

      {/* Product Grid Area */}
      <ProductList />
    </>
  );
};
export default ProductPage;
