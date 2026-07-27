import type { CategoryResponse } from "../../../type_auth_api/category/category.api";

interface CategoryProps {
  category: CategoryResponse;
}

export const CategoryCard = ({ category }: CategoryProps) => {
  return (
    <>
      <div className="bg-[#16251e] border border-[#2a3c31] rounded-2xl p-6 transition-all duration-300 hover:border-[#B7913C] hover:shadow-lg hover:shadow-[#B7913C]/5">
        <h3 className="text-xl font-semibold text-[#F1E9D8] mb-2">
          {category.name}
        </h3>
        <p className="text-[#A9B4A4] text-sm leading-relaxed">
          {category.description || "Không có mô tả cho danh mục này."}
        </p>
      </div>
      ;
    </>
  );
};
