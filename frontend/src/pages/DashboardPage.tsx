export const DashboardPage = () => {
  const recentOrders = [
    {
      id: "#1024",
      customer: "Nguyễn Văn A",
      items: "Combo Gà Rán A, Coca-Cola",
      amount: "150.000đ",
      status: "PENDING",
      statusLabel: "Chờ xác nhận",
      time: "5 phút trước",
    },
    {
      id: "#1023",
      customer: "Trần Thị B",
      items: "Pizza Hải Sản Size L",
      amount: "220.000đ",
      status: "PREPARING",
      statusLabel: "Đang chuẩn bị",
      time: "15 phút trước",
    },
    {
      id: "#1022",
      customer: "Lê Văn C",
      items: "Trà Sữa Trân Châu Đường Đen x2",
      amount: "90.000đ",
      status: "DELIVERING",
      statusLabel: "Đang giao hàng",
      time: "30 phút trước",
    },
    {
      id: "#1021",
      customer: "Phạm Văn D",
      items: "Lẩu Thái Hải Sản Đặc Biệt",
      amount: "350.000đ",
      status: "COMPLETED",
      statusLabel: "Đã hoàn thành",
      time: "1 giờ trước",
    },
    {
      id: "#1020",
      customer: "Hoàng Thị E",
      items: "Mỳ Ý Sốt Bò Bằm",
      amount: "85.000đ",
      status: "CANCELLED",
      statusLabel: "Đã hủy",
      time: "3 giờ trước",
    },
  ];

  // Helper để render badge trạng thái đơn hàng
  const getStatusBadge = (status: string, label: string) => {
    switch (status) {
      case "PENDING":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
            {label}
          </span>
        );
      case "PREPARING":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
            {label}
          </span>
        );
      case "DELIVERING":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-50 text-purple-700 border border-purple-200">
            {label}
          </span>
        );
      case "COMPLETED":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            {label}
          </span>
        );
      case "CANCELLED":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200">
            {label}
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800">
            {label}
          </span>
        );
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
            Tổng Quan Hệ Thống
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Chào mừng quay lại, Chef! Đây là báo cáo hiệu suất hoạt động hôm
            nay.
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors shadow-sm">
            Xuất Báo Cáo
          </button>
          <button className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-600/10">
            Món Mới +
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Doanh thu */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-slate-400">
              Doanh Thu Ngày
            </span>
            <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-bold text-slate-900">4,280,000đ</h3>
            <span className="inline-flex items-center text-xs font-medium text-emerald-600 mt-1 bg-emerald-50 px-2 py-0.5 rounded-md">
              <svg
                className="w-3.5 h-3.5 mr-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  d="M5 10l7-7m0 0l7 7m-7-7v18"
                />
              </svg>
              +12.5% tuần trước
            </span>
          </div>
        </div>

        {/* Đơn hàng mới */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-slate-400">
              Đơn Hàng Mới
            </span>
            <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-bold text-slate-900">48 đơn</h3>
            <span className="inline-flex items-center text-xs font-medium text-indigo-600 mt-1 bg-indigo-50 px-2 py-0.5 rounded-md">
              <svg
                className="w-3.5 h-3.5 mr-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  d="M5 10l7-7m0 0l7 7m-7-7v18"
                />
              </svg>
              +8.3% hôm qua
            </span>
          </div>
        </div>

        {/* Thực đơn */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-slate-400">
              Món Ăn Hoạt Động
            </span>
            <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center text-amber-600">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.246.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-bold text-slate-900">120 món</h3>
            <span className="inline-flex items-center text-xs font-medium text-amber-600 mt-1 bg-amber-50 px-2 py-0.5 rounded-md">
              <svg
                className="w-3.5 h-3.5 mr-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              5 món mới tuần này
            </span>
          </div>
        </div>

        {/* Khách hàng */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-slate-400">
              Khách Hàng Mới
            </span>
            <div className="w-10 h-10 bg-cyan-50 rounded-xl flex items-center justify-center text-cyan-600">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-bold text-slate-900">1,240 người</h3>
            <span className="inline-flex items-center text-xs font-medium text-cyan-600 mt-1 bg-cyan-50 px-2 py-0.5 rounded-md">
              <svg
                className="w-3.5 h-3.5 mr-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  d="M5 10l7-7m0 0l7 7m-7-7v18"
                />
              </svg>
              +15.2% tháng này
            </span>
          </div>
        </div>
      </div>

      {/* Charts & Graphs simulated via SVGs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Doanh thu 7 ngày qua */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-slate-900 text-lg">
                Biểu Đồ Doanh Thu Tuần
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Xu hướng từ Thứ 2 đến Chủ nhật
              </p>
            </div>
            <select className="text-xs font-medium text-slate-600 bg-slate-50 border border-slate-200 rounded-lg p-1.5 focus:outline-none">
              <option>Tuần này</option>
              <option>Tuần trước</option>
            </select>
          </div>

          {/* SVG Bar Chart Visualization */}
          <div className="h-60 flex flex-col justify-between">
            {/* Chart Area */}
            <div className="flex-1 flex items-end justify-between px-4 pb-2 relative h-48 border-b border-slate-100">
              {/* Grid Lines */}
              <div className="absolute inset-x-0 top-0 border-t border-slate-100/50"></div>
              <div className="absolute inset-x-0 top-1/3 border-t border-slate-100/50"></div>
              <div className="absolute inset-x-0 top-2/3 border-t border-slate-100/50"></div>

              {/* T2 */}
              <div className="flex flex-col items-center flex-1 space-y-2 group">
                <div
                  className="w-10 bg-indigo-100 group-hover:bg-indigo-600 rounded-t-lg transition-all duration-300 relative"
                  style={{ height: "45px" }}
                >
                  <span className="absolute -top-7 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] py-1 px-1.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-md pointer-events-none">
                    1.2M
                  </span>
                </div>
              </div>
              {/* T3 */}
              <div className="flex flex-col items-center flex-1 space-y-2 group">
                <div
                  className="w-10 bg-indigo-100 group-hover:bg-indigo-600 rounded-t-lg transition-all duration-300 relative"
                  style={{ height: "70px" }}
                >
                  <span className="absolute -top-7 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] py-1 px-1.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-md pointer-events-none">
                    2.0M
                  </span>
                </div>
              </div>
              {/* T4 */}
              <div className="flex flex-col items-center flex-1 space-y-2 group">
                <div
                  className="w-10 bg-indigo-600 rounded-t-lg transition-all duration-300 relative"
                  style={{ height: "135px" }}
                >
                  <span className="absolute -top-7 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] py-1 px-1.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-md pointer-events-none">
                    4.28M (Hôm nay)
                  </span>
                </div>
              </div>
              {/* T5 */}
              <div className="flex flex-col items-center flex-1 space-y-2 group">
                <div
                  className="w-10 bg-indigo-100 group-hover:bg-indigo-600 rounded-t-lg transition-all duration-300 relative"
                  style={{ height: "90px" }}
                >
                  <span className="absolute -top-7 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] py-1 px-1.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-md pointer-events-none">
                    2.8M
                  </span>
                </div>
              </div>
              {/* T6 */}
              <div className="flex flex-col items-center flex-1 space-y-2 group">
                <div
                  className="w-10 bg-indigo-100 group-hover:bg-indigo-600 rounded-t-lg transition-all duration-300 relative"
                  style={{ height: "110px" }}
                >
                  <span className="absolute -top-7 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] py-1 px-1.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-md pointer-events-none">
                    3.5M
                  </span>
                </div>
              </div>
              {/* T7 */}
              <div className="flex flex-col items-center flex-1 space-y-2 group">
                <div
                  className="w-10 bg-indigo-100 group-hover:bg-indigo-600 rounded-t-lg transition-all duration-300 relative"
                  style={{ height: "145px" }}
                >
                  <span className="absolute -top-7 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] py-1 px-1.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-md pointer-events-none">
                    4.8M
                  </span>
                </div>
              </div>
              {/* CN */}
              <div className="flex flex-col items-center flex-1 space-y-2 group">
                <div
                  className="w-10 bg-indigo-100 group-hover:bg-indigo-600 rounded-t-lg transition-all duration-300 relative"
                  style={{ height: "160px" }}
                >
                  <span className="absolute -top-7 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] py-1 px-1.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-md pointer-events-none">
                    5.2M
                  </span>
                </div>
              </div>
            </div>

            {/* Labels */}
            <div className="flex justify-between px-4 text-xs font-semibold text-slate-400 pt-2">
              <span className="flex-1 text-center">T2</span>
              <span className="flex-1 text-center">T3</span>
              <span className="flex-1 text-center">T4</span>
              <span className="flex-1 text-center">T5</span>
              <span className="flex-1 text-center">T6</span>
              <span className="flex-1 text-center">T7</span>
              <span className="flex-1 text-center">CN</span>
            </div>
          </div>
        </div>

        {/* Trạng thái đơn hàng */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-slate-900 text-lg">
              Trạng Thái Đơn Hàng
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Phân chia đơn hàng hôm nay
            </p>
          </div>

          <div className="py-6 flex items-center justify-center relative">
            {/* SVG Pie Chart Mockup */}
            <svg className="w-36 h-36" viewBox="0 0 36 36">
              {/* Background circle */}
              <circle
                cx="18"
                cy="18"
                r="15.915"
                fill="none"
                stroke="#f1f5f9"
                strokeWidth="4.2"
              />
              
              <circle
                cx="18"
                cy="18"
                r="15.915"
                fill="none"
                stroke="#10b981"
                strokeWidth="4.2"
                strokeDasharray="60 40"
                strokeDashoffset="25"
              />
             
              <circle
                cx="18"
                cy="18"
                r="15.915"
                fill="none"
                stroke="#8b5cf6"
                strokeWidth="4.2"
                strokeDasharray="25 75"
                strokeDashoffset="-35"
              />
          
              <circle
                cx="18"
                cy="18"
                r="15.915"
                fill="none"
                stroke="#f59e0b"
                strokeWidth="4.2"
                strokeDasharray="15 85"
                strokeDashoffset="-60"
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-2xl font-bold text-slate-800">48</span>
              <span className="text-[10px] font-semibold text-slate-400 uppercase">
                Đơn hàng
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-medium text-slate-600">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                <span>Đã hoàn thành</span>
              </div>
              <span className="font-semibold text-slate-800">29 đơn (60%)</span>
            </div>
            <div className="flex items-center justify-between text-xs font-medium text-slate-600">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-500"></span>
                <span>Đang giao</span>
              </div>
              <span className="font-semibold text-slate-800">12 đơn (25%)</span>
            </div>
            <div className="flex items-center justify-between text-xs font-medium text-slate-600">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                <span>Đang xử lý</span>
              </div>
              <span className="font-semibold text-slate-800">7 đơn (15%)</span>
            </div>
          </div>
        </div>
      </div>

      
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
          <div>
            <h3 className="font-bold text-slate-900 text-lg">
              Đơn Hàng Gần Đây
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Danh sách các đơn hàng mới nhất trên hệ thống
            </p>
          </div>
          <button className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-lg transition-colors self-start sm:self-auto">
            Xem Tất Cả Đơn Hàng
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 text-slate-400 text-xs font-bold uppercase border-b border-slate-100">
                <th className="px-6 py-4">Mã Đơn</th>
                <th className="px-6 py-4">Khách Hàng</th>
                <th className="px-6 py-4">Chi Tiết Món</th>
                <th className="px-6 py-4">Tổng Tiền</th>
                <th className="px-6 py-4">Thời Gian</th>
                <th className="px-6 py-4">Trạng Thái</th>
                <th className="px-6 py-4 text-center">Hành Động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm text-slate-600">
              {recentOrders.map((order) => (
                <tr
                  key={order.id}
                  className="hover:bg-slate-50/40 transition-colors"
                >
                  <td className="px-6 py-4 font-bold text-slate-900">
                    {order.id}
                  </td>
                  <td className="px-6 py-4 font-semibold text-slate-800">
                    {order.customer}
                  </td>
                  <td className="px-6 py-4 max-w-xs truncate">{order.items}</td>
                  <td className="px-6 py-4 font-bold text-indigo-600">
                    {order.amount}
                  </td>
                  <td className="px-6 py-4 text-xs text-slate-400">
                    {order.time}
                  </td>
                  <td className="px-6 py-4">
                    {getStatusBadge(order.status, order.statusLabel)}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button className="text-xs font-semibold text-indigo-600 hover:underline">
                      Chi tiết
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
