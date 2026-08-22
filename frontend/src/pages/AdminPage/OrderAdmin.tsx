import { useState, useEffect } from "react";
import { getAllOrders, updateOrderStatus } from "../../services/order.service";
import type { OrderResponse } from "../../type_auth_api/order/order.api";
import toast from "react-hot-toast";

export const OrderAdmin = () => {
  const [orders, setOrders] = useState<OrderResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  const fetchOrders = async () => {
    try {
      setIsLoading(true);
      const data = await getAllOrders();
      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Không thể tải danh sách đơn hàng");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleUpdateStatus = async (orderId: number, newStatus: string) => {
    try {
      setIsUpdating(true);
      await updateOrderStatus(orderId, newStatus);
      toast.success("Cập nhật trạng thái thành công");
      fetchOrders(); // Refresh data
    } catch (error) {
      console.error("Error updating order status:", error);
      toast.error("Cập nhật trạng thái thất bại");
    } finally {
      setIsUpdating(false);
    }
  };

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
          { label: "Tổng Đơn", value: orders.length, color: "text-indigo-600", bg: "bg-indigo-50" },
          { label: "Chờ Xử Lý", value: orders.filter((o) => o.currentStatus === "PENDING").length, color: "text-amber-600", bg: "bg-amber-50" },
          { label: "Đang Chuẩn Bị", value: orders.filter((o) => o.currentStatus === "PROCESSING").length, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "Hoàn Thành", value: orders.filter((o) => o.currentStatus === "COMPLETED").length, color: "text-emerald-600", bg: "bg-emerald-50" },
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
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                    Đang tải dữ liệu...
                  </td>
                </tr>
              ) : orders.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                    Không có đơn hàng nào
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr
                    key={order.id}
                    className="hover:bg-slate-50/50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <h4 className="font-bold text-slate-900 text-sm font-mono">
                        #{order.id}
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
                      <div className="font-bold text-slate-800">{order.user?.fullName || "Khách Hàng"}</div>
                      <div className="text-slate-500 text-xs mt-0.5">{order.user?.phone || order.shippingAddress}</div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="font-extrabold text-slate-900 text-base">
                        {Number(order.totalAmount).toLocaleString("vi-VN")}đ
                      </div>
                      <div className="text-slate-400 text-xs mt-0.5 uppercase tracking-wide">
                        {order.payment?.paymentMethod || "COD"}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      {getStatusBadge(order.currentStatus)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center space-x-2">
                        <button
                          title="Xem chi tiết"
                          className="p-1.5 rounded-lg text-indigo-600 hover:bg-indigo-50 bg-indigo-50/50 transition font-medium text-xs px-3"
                        >
                          Chi tiết
                        </button>
                        
                        {order.currentStatus === "PENDING" && (
                          <button
                            title="Chuyển sang Đang chuẩn bị"
                            onClick={() => handleUpdateStatus(order.id, "PROCESSING")}
                            disabled={isUpdating}
                            className="p-1.5 rounded-lg text-blue-600 hover:bg-blue-50 bg-blue-50/50 transition font-medium text-xs px-3 disabled:opacity-50"
                          >
                            Duyệt đơn
                          </button>
                        )}
                        
                        {order.currentStatus === "PROCESSING" && (
                          <button
                            title="Hoàn thành đơn"
                            onClick={() => handleUpdateStatus(order.id, "COMPLETED")}
                            disabled={isUpdating}
                            className="p-1.5 rounded-lg text-emerald-600 hover:bg-emerald-50 bg-emerald-50/50 transition font-medium text-xs px-3 disabled:opacity-50"
                          >
                            Hoàn tất
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
