import type { ProductResponse } from "../../type_auth_api/products/product.api";

// Static data matching the product service/API contract
const INITIAL_PRODUCTS: ProductResponse[] = [
  {
    id: 1,
    name: "Súp Bào Ngư Vi Cá",
    description: "Súp bào ngư thượng hạng kết hợp vi cá hảo hạng, hầm sâm và táo đỏ trong 12 giờ giúp bồi bổ sức khỏe tối đa.",
    imageUrl: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&q=80&w=600",
    price: 350000,
    isAvailable: true,
    preparationTime: 20,
    categoryId: 1,
  },
  {
    id: 2,
    name: "Thịt Bò Wagyu Nướng Đá",
    description: "Thịt bò Wagyu Nhật Bản A5 mềm tan trong miệng, nướng xèo xèo trực tiếp trên đá núi lửa kèm sốt tiêu đen đặc trưng.",
    imageUrl: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=600",
    price: 1250000,
    isAvailable: true,
    preparationTime: 25,
    categoryId: 2,
  },
  {
    id: 3,
    name: "Tôm Hùm Sốt Phô Mai Pháp",
    description: "Tôm hùm Nha Trang tươi sống đút lò sốt phô mai Mozzarella béo ngậy, ăn kèm bánh mì bơ tỏi giòn tan.",
    imageUrl: "https://images.unsplash.com/photo-1559737689-997463f1402b?auto=format&fit=crop&q=80&w=600",
    price: 890000,
    isAvailable: true,
    preparationTime: 30,
    categoryId: 2,
  },
  {
    id: 4,
    name: "Salad Vịt Xông Khói Sốt Dâu Tằm",
    description: "Rau rocket xanh tươi trộn với ức vịt xông khói thái lát mỏng, sốt quả dâu tằm chua ngọt mát lành.",
    imageUrl: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=600",
    price: 180000,
    isAvailable: false,
    preparationTime: 15,
    categoryId: 1,
  },
  {
    id: 5,
    name: "Bánh Soufflé Sô-cô-la Trầm",
    description: "Bánh soufflé nướng phồng cổ điển Pháp với nhân sô-cô-la tan chảy ngọt ngào, dùng kèm kem vani lạnh.",
    imageUrl: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&q=80&w=600",
    price: 150000,
    isAvailable: true,
    preparationTime: 15,
    categoryId: 3,
  },
  {
    id: 6,
    name: "Rượu Vang Đỏ Bordeaux Cabernet",
    description: "Chai rượu vang đỏ thượng hạng nhập khẩu trực tiếp từ vùng Bordeaux nước Pháp, hậu vị chát nhẹ tinh tế.",
    imageUrl: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&q=80&w=600",
    price: 1850000,
    isAvailable: true,
    preparationTime: 5,
    categoryId: 4,
  }
];

export const ProductAdmin = () => {
  // SET THIS TO TRUE MANUALLY TO VIEW/EDIT MODAL UI IN BROWSER
  const isModalOpen = false;
  const modalMode: "create" | "edit" = "create";

  // Helper to map categories
  const getCategoryLabel = (catId: number) => {
    switch (catId) {
      case 1:
        return { label: "Khai vị", bg: "bg-blue-50 text-blue-700 border-blue-100" };
      case 2:
        return { label: "Món chính", bg: "bg-indigo-50 text-indigo-700 border-indigo-100" };
      case 3:
        return { label: "Tráng miệng", bg: "bg-purple-50 text-purple-700 border-purple-100" };
      case 4:
        return { label: "Đồ uống", bg: "bg-amber-50 text-amber-700 border-amber-100" };
      default:
        return { label: "Khác", bg: "bg-slate-50 text-slate-700 border-slate-100" };
    }
  };

  return (
    <div className="space-y-6 animate-fade-in text-slate-800">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
            Quản Lý Thực Đơn
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Danh sách món ăn, cấu hình giá, thời gian chuẩn bị và trạng thái phục vụ.
          </p>
        </div>
        <button
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-600/10 active:scale-95 duration-150"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
          </svg>
          Thêm Món Mới
        </button>
      </div>

      {/* Stats row (Static Values) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Tổng số món</span>
            <h3 className="text-2xl font-extrabold text-slate-900 mt-1">6 món</h3>
          </div>
          <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.246.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Đang phục vụ</span>
            <h3 className="text-2xl font-extrabold text-emerald-600 mt-1">5 món</h3>
          </div>
          <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Tạm ngưng / Hết</span>
            <h3 className="text-2xl font-extrabold text-rose-600 mt-1">1 món</h3>
          </div>
          <div className="w-10 h-10 bg-rose-50 text-rose-600 rounded-xl flex items-center justify-center">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Nhóm danh mục</span>
            <h3 className="text-2xl font-extrabold text-amber-600 mt-1">4 nhóm</h3>
          </div>
          <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Toolbar / Filters (Static inputs) */}
      <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col md:flex-row items-center gap-4 justify-between">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </span>
          <input
            type="text"
            placeholder="Tìm theo tên hoặc mô tả..."
            className="w-full pl-10 pr-4 py-2 text-sm text-slate-700 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
          />
        </div>

        {/* Filter selects */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <select
            className="px-3.5 py-2 text-xs font-semibold text-slate-600 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
          >
            <option value="all">Tất cả danh mục</option>
            <option value="1">Khai vị</option>
            <option value="2">Món chính</option>
            <option value="3">Tráng miệng</option>
            <option value="4">Đồ uống</option>
          </select>

          <select
            className="px-3.5 py-2 text-xs font-semibold text-slate-600 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="available">Còn hàng / Bán</option>
            <option value="unavailable">Hết hàng / Ngưng</option>
          </select>
        </div>
      </div>

      {/* Table section (Direct mapping) */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/75 border-b border-slate-100 text-slate-400 text-xs font-bold uppercase tracking-wider">
                <th className="px-6 py-4">Món Ăn</th>
                <th className="px-6 py-4">Danh Mục</th>
                <th className="px-6 py-4 text-right">Giá Bán</th>
                <th className="px-6 py-4 text-center">Chuẩn Bị</th>
                <th className="px-6 py-4 text-center">Trạng Thái</th>
                <th className="px-6 py-4 text-center">Hành Động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm text-slate-600">
              {INITIAL_PRODUCTS.map((p) => {
                const cat = getCategoryLabel(p.categoryId);
                return (
                  <tr key={p.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3.5">
                        <img
                          src={p.imageUrl}
                          alt={p.name}
                          className="w-12 h-12 rounded-xl object-cover shadow-sm border border-slate-200/50"
                        />
                        <div>
                          <h4 className="font-bold text-slate-900 text-base">{p.name}</h4>
                          <p className="text-xs text-slate-400 mt-0.5 line-clamp-1 max-w-sm">{p.description}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${cat.bg}`}>
                        {cat.label}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right font-extrabold text-slate-900 text-base">
                      {p.price.toLocaleString("vi-VN")}đ
                    </td>
                    <td className="px-6 py-4 text-center font-medium">
                      ⏱ {p.preparationTime} phút
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${
                          p.isAvailable
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-250"
                            : "bg-rose-50 text-rose-700 border border-rose-250"
                        }`}
                      >
                        <span className={`h-1.5 w-1.5 rounded-full ${p.isAvailable ? "bg-emerald-500" : "bg-rose-500"}`} />
                        {p.isAvailable ? "Còn hàng" : "Hết hàng"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center space-x-2">
                        <button
                          title="Sửa"
                          className="p-1.5 rounded-lg text-slate-500 hover:text-indigo-600 hover:bg-slate-100 transition"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button
                          title="Xóa"
                          className="p-1.5 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-slate-100 transition"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* CREATE / EDIT OVERLAY MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm transition-opacity">
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-xl max-h-[90vh] overflow-hidden flex flex-col scale-100 transition-transform duration-300">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-extrabold text-slate-900 text-lg">
                {modalMode === "create" ? "Thêm Món Ăn Mới" : "Chỉnh Sửa Món Ăn"}
              </h3>
              <button
                className="text-slate-400 hover:text-slate-600 rounded-lg p-1.5 hover:bg-slate-50 transition"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Body / Form */}
            <form className="flex-1 overflow-y-auto p-6 space-y-4">
              {/* Name */}
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tên món ăn <span className="text-rose-500">*</span></label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Bít Tết Sốt Nấm"
                  className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 bg-slate-50/50"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Category */}
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Danh mục</label>
                  <select
                    className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 bg-slate-50/50"
                  >
                    <option value={1}>Khai vị</option>
                    <option value={2}>Món chính</option>
                    <option value={3}>Tráng miệng</option>
                    <option value={4}>Đồ uống</option>
                  </select>
                </div>

                {/* Price */}
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Giá bán (VND) <span className="text-rose-500">*</span></label>
                  <input
                    type="number"
                    required
                    min={0}
                    defaultValue={100000}
                    className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 bg-slate-50/50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Preparation Time */}
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Chuẩn bị (Phút)</label>
                  <input
                    type="number"
                    min={1}
                    defaultValue={15}
                    className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 bg-slate-50/50"
                  />
                </div>

                {/* Status Toggle */}
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Trạng thái phục vụ</label>
                  <div className="flex items-center h-[42px]">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        defaultChecked
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                      <span className="ml-3 text-sm font-semibold text-slate-700">
                        Còn hàng / Phục vụ
                      </span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Image URL */}
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Link ảnh món ăn</label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 bg-slate-50/50"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Mô tả chi tiết</label>
                <textarea
                  placeholder="Nhập nguyên liệu, hương vị hoặc lưu ý chế biến..."
                  rows={3}
                  className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 bg-slate-50/50 resize-none"
                />
              </div>

              {/* Modal Actions Footer */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  className="px-5 py-2.5 text-sm font-semibold text-slate-500 hover:text-slate-700 rounded-xl hover:bg-slate-100 transition duration-150"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 text-sm font-semibold text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 shadow-lg shadow-indigo-600/10 transition duration-150"
                >
                  Lưu thay đổi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
