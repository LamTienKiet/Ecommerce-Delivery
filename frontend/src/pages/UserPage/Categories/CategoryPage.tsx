import { CategoryList } from "./CategoryList";

export const CategoryPage = () => {
  return (
    <>
      {/* Hero Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
        <span className="text-[#B7913C] uppercase text-xs tracking-widest font-bold block">
          EXQUISITE CLASSIFICATION
        </span>
        <h1 className="text-4xl md:text-5xl font-serif font-medium text-white tracking-tight">
          Danh Mục Thực Đơn
        </h1>
        <div className="flex items-center justify-center gap-3 my-4">
          <div className="h-[1px] w-12 bg-[#B7913C]/40" />
          <div className="w-1.5 h-1.5 rotate-45 bg-[#B7913C]" />
          <div className="h-[1px] w-12 bg-[#B7913C]/40" />
        </div>
        <p className="text-[#A9B4A4] text-sm leading-relaxed">
          Khám phá các nhóm ẩm thực được phân loại tinh tế, giúp quý khách dễ dàng lựa chọn hương vị hoàn hảo phù hợp với từng khoảnh khắc trải nghiệm.
        </p>
      </div>

      {/* Category List Area */}
      <CategoryList />
    </>
  );
};
export default CategoryPage;


