export const ProductToolbar = () => {
  return (
    <div className="border border-[#2E3C33] bg-[#182720] rounded-2xl p-6 flex flex-wrap items-center gap-4 justify-between">
      {/* Search */}
      <div className="flex-1 min-w-65">
        <input
          type="text"
          placeholder="Search dishes..."
          className="w-full rounded-xl border border-[#39483F] bg-[#121B16] px-4 py-3 text-[#F1E9D8] placeholder:text-[#6C7A6F] outline-none focus:border-[#B7913C]"
        />
      </div>

      {/* Category */}
      <select className="rounded-xl border border-[#39483F] bg-[#121B16] px-4 py-3 text-[#F1E9D8] outline-none focus:border-[#B7913C]">
        <option>All Categories</option>
        <option>Appetizer</option>
        <option>Main Course</option>
        <option>Dessert</option>
        <option>Beverage</option>
      </select>

      {/* Status */}
      <select className="rounded-xl border border-[#39483F] bg-[#121B16] px-4 py-3 text-[#F1E9D8] outline-none focus:border-[#B7913C]">
        <option>All Status</option>
        <option>Available</option>
        <option>Unavailable</option>
      </select>

      {/* Sort */}
      <select className="rounded-xl border border-[#39483F] bg-[#121B16] px-4 py-3 text-[#F1E9D8] outline-none focus:border-[#B7913C]">
        <option>Newest</option>
        <option>Price ↑</option>
        <option>Price ↓</option>
        <option>Name A-Z</option>
      </select>

      {/* Add Button */}
      <button className="rounded-xl bg-[#B7913C] px-6 py-3 font-medium text-[#121B16] transition hover:brightness-110">
        + Add Dish
      </button>
    </div>
  );
};
