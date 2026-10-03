import { Link } from "react-router-dom";
import type { CategoryResponse } from "../../../type_auth_api/category/category.api";

interface CategoryProps {
  category: CategoryResponse;
}

export const CategoryCard = ({ category }: CategoryProps) => {
  // Helper to map category name to Unsplash food image
  const getCategoryImage = (name: string) => {
    const lowerName = name.toLowerCase();
    if (lowerName.includes("khai vị") || lowerName.includes("appetizer")) {
      return "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=600";
    }
    if (lowerName.includes("chính") || lowerName.includes("main")) {
      return "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=600";
    }
    if (lowerName.includes("tráng miệng") || lowerName.includes("dessert")) {
      return "https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&q=80&w=600";
    }
    if (
      lowerName.includes("uống") ||
      lowerName.includes("nước") ||
      lowerName.includes("beverage") ||
      lowerName.includes("rượu") ||
      lowerName.includes("wine")
    ) {
      return "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&q=80&w=600";
    }
    return "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&q=80&w=600";
  };

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-emerald-950 bg-[#16251e] transition-all duration-300 hover:-translate-y-2 hover:border-[#B7913C] hover:shadow-2xl hover:shadow-[#B7913C]/10 flex flex-col h-full">
      {/* Category Image Cover */}
      <div className="relative h-48 w-full overflow-hidden">
        <img
          src={getCategoryImage(category.name)}
          alt={category.name}
          className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-110"
        />
        {/* Gradients overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#16251e] via-transparent to-transparent opacity-85" />

        {/* Floating badge */}
        <div className="absolute top-4 left-4">
          <span className="rounded-md bg-[#B7913C] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#121B16]">
            Premium Category
          </span>
        </div>
      </div>

      {/* Body Content */}
      <div className="flex flex-col flex-grow p-6">
        {/* Category Name */}
        <h3 className="font-serif text-xl font-medium text-[#F1E9D8] transition-colors group-hover:text-[#B7913C] line-clamp-1">
          {category.name}
        </h3>

        {/* Category Description */}
        <p className="mt-2 text-sm leading-relaxed text-[#A9B4A4] line-clamp-3 flex-grow">
          {category.description ||
            "Khám phá thực đơn độc quyền được thiết kế riêng cho nhóm danh mục này."}
        </p>

        {/* Divider */}
        <div className="my-5 border-t border-[#2a3c31]" />

        {/* Footer Link */}
        <div className="mt-auto">
          <Link
            to={`/menu?category=${category.id}`}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-emerald-950/60 border border-[#2a3c31] px-4 py-2.5 text-sm font-semibold text-[#B7913C] hover:bg-[#B7913C] hover:text-[#121B16] transition-all duration-300 active:scale-95 group/btn"
          >
            <span>Khám phá thực đơn</span>
            <svg
              className="w-4 h-4 transform transition-transform group-hover/btn:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};
