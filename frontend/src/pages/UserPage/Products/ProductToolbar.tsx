interface ProductToolbarProps {
  searchTerm?: string;
  onSearchChange?: (value: string) => void;
  sortBy?: string;
  onSortChange?: (value: string) => void;
}

export const ProductToolbar = ({
  searchTerm = "",
  onSearchChange,
  sortBy = "newest",
  onSortChange,
}: ProductToolbarProps) => {
  return (
    <div className="border border-[#2a3c31] bg-[#16251e] rounded-2xl p-6 flex flex-col md:flex-row items-center gap-4 justify-between shadow-xl">
      {/* Search Input */}
      <div className="relative w-full md:flex-1 min-w-70">
        <span className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
          <svg
            className="w-5 h-5 text-[#A9B4A4]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </span>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange?.(e.target.value)}
          placeholder="Tìm món ăn thượng hạng..."
          className="w-full rounded-xl border border-[#2a3c31] bg-[#121B16] pl-11 pr-4 py-3 text-[#F1E9D8] placeholder:text-[#6C7A6F] outline-none focus:border-[#B7913C] focus:ring-1 focus:ring-[#B7913C] transition duration-200 text-sm"
        />
      </div>

      {/* Select Controls Wrapper */}
      <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
        {/* Sort Dropdown */}
        <div className="flex-1 md:flex-initial">
          <select
            value={sortBy}
            onChange={(e) => onSortChange?.(e.target.value)}
            className="w-full rounded-xl border border-[#2a3c31] bg-[#121B16] px-4 py-3 text-[#F1E9D8] outline-none focus:border-[#B7913C] text-sm cursor-pointer transition duration-200"
          >
            <option value="newest">Mới nhất</option>
            <option value="price-asc">Giá tăng dần ↑</option>
            <option value="price-desc">Giá giảm dần ↓</option>
            <option value="name-asc">Tên A-Z</option>
          </select>
        </div>
      </div>
    </div>
  );
};
