import { useState } from "react";

export const OrderAdmin = () => {
  // Mock data cho UI
  const mockOrders = [
    {
      id: "ORD-20231001-01",
      customerName: "Nguyễn Văn A",
      phone: "0901234567",
      totalAmount: 450000,
      paymentMethod: "MOMO",
      status: "PENDING",
      createdAt: "2023-10-01T10:30:00Z",
    },
    {
      id: "ORD-20231001-02",
      customerName: "Trần Thị B",
      phone: "0912345678",
      totalAmount: 125000,
      paymentMethod: "COD",
      status: "PROCESSING",
      createdAt: "2023-10-01T11:15:00Z",
    },
    {
      id: "ORD-20231001-03",
      customerName: "Lê Văn C",
      phone: "0987654321",
      totalAmount: 850000,
      paymentMethod: "VNPAY",
      status: "COMPLETED",
      createdAt: "2023-10-01T14:45:00Z",
    },
    {
      id: "ORD-20231001-04",
      customerName: "Phạm D",
      phone: "0909090909",
      totalAmount: 320000,
      paymentMethod: "COD",
      status: "CANCELLED",
      createdAt: "2023-10-01T16:20:00Z",
    },
  ];

  // Hàm helper để render UI của badge trạng thái
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "PENDING":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
            Chờ xử lý
          </span>
        );
      case "PROCESSING":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />
            Đang chuẩn bị
          </span>
        );
      case "COMPLETED":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Hoàn thành
          </span>
        );
      case "CANCELLED":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200">
            <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
            Đã hủy
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-slate-50 text-slate-700 border border-slate-200">
            Không rõ
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Quản Lý Đơn Hàng</h2>
          <p className="text-sm text-slate-500 mt-1">
            Theo dõi, cập nhật trạng thái và xử lý các đơn đặt hàng
          </p>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Tổng Đơn", value: "156", color: "text-indigo-600", bg: "bg-indigo-50" },
          { label: "Chờ Xử Lý", value: "12", color: "text-amber-600", bg: "bg-amber-50" },
          { label: "Đang Chuẩn Bị", value: "8", color: "text-blue-600", bg: "bg-blue-50" },
          { label: "Hoàn Thành", value: "130", color: "text-emerald-600", bg: "bg-emerald-50" },
        ].map((stat, idx) => (
          <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">{stat.label}</p>
              <h3 className="text-2xl font-black text-slate-800 mt-1">{stat.value}</h3>
            </div>
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bg} ${stat.color}`}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
          </div>
        ))}
      </div>

      {/* Toolbar (Search & Filters) */}
      <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <svg
            className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Tìm mã đơn hàng, tên khách hàng..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
          />
        </div>
        <div className="flex gap-4 overflow-x-auto pb-2 md:pb-0">
          <input type="date" className="bg-slate-50 border border-slate-200 text-slate-700 py-2.5 px-4 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium" />
          <select className="bg-slate-50 border border-slate-200 text-slate-700 py-2.5 pl-4 pr-10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 appearance-none font-medium cursor-pointer transition-all">
            <option value="all">Tất cả trạng thái</option>
            <option value="PENDING">Chờ xử lý</option>
            <option value="PROCESSING">Đang chuẩn bị</option>
            <option value="COMPLETED">Hoàn thành</option>
            <option value="CANCELLED">Đã hủy</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/75 border-b border-slate-100 text-slate-400 text-xs font-bold uppercase tracking-wider">
                <th className="px-6 py-4">Mã Đơn & Ngày</th>
                <th className="px-6 py-4">Khách Hàng</th>
                <th className="px-6 py-4 text-right">Tổng Tiền</th>
                <th className="px-6 py-4 text-center">Trạng Thái</th>
                <th className="px-6 py-4 text-center">Hành Động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm text-slate-600">
              {mockOrders.map((order) => (
                <tr
                  key={order.id}
                  className="hover:bg-slate-50/50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <h4 className="font-bold text-slate-900 text-sm font-mono">
                      {order.id}
                    </h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {new Date(order.createdAt).toLocaleString("vi-VN", {
                        hour: "2-digit",
                        minute: "2-digit",
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-bold text-slate-800">{order.customerName}</div>
                    <div className="text-slate-500 text-xs mt-0.5">{order.phone}</div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="font-extrabold text-slate-900 text-base">
                      {order.totalAmount.toLocaleString("vi-VN")}đ
                    </div>
                    <div className="text-slate-400 text-xs mt-0.5 uppercase tracking-wide">
                      {order.paymentMethod}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    {getStatusBadge(order.status)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center space-x-2">
                      <button
                        title="Xem chi tiết"
                        className="p-1.5 rounded-lg text-indigo-600 hover:bg-indigo-50 bg-indigo-50/50 transition font-medium text-xs px-3"
                      >
                        Chi tiết
                      </button>
                      
                      {order.status === "PENDING" && (
                        <button
                          title="Chuyển sang Đang chuẩn bị"
                          className="p-1.5 rounded-lg text-blue-600 hover:bg-blue-50 bg-blue-50/50 transition font-medium text-xs px-3"
                        >
                          Duyệt đơn
                        </button>
                      )}
                      
                      {order.status === "PROCESSING" && (
                        <button
                          title="Hoàn thành đơn"
                          className="p-1.5 rounded-lg text-emerald-600 hover:bg-emerald-50 bg-emerald-50/50 transition font-medium text-xs px-3"
                        >
                          Hoàn tất
                        </button>
                      )}
                    </div>
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
