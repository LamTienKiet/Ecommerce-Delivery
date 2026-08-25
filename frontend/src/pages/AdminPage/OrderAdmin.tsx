import { useState, useEffect } from "react";
import { getAllOrders, updateOrderStatus } from "../../services/order.service";
import type { OrderResponse } from "../../type_auth_api/order/order.api";
import toast from "react-hot-toast";

const STATUS_OPTIONS = [
  { value: 'PENDING', label: 'Chờ xử lý', color: 'text-amber-700 bg-amber-50 border-amber-200' },
  { value: 'CONFIRMED', label: 'Đã xác nhận', color: 'text-blue-700 bg-blue-50 border-blue-200' },
  { value: 'PREPARING', label: 'Đang chuẩn bị', color: 'text-indigo-700 bg-indigo-50 border-indigo-200' },
  { value: 'DELIVERING', label: 'Đang giao hàng', color: 'text-orange-700 bg-orange-50 border-orange-200' },
  { value: 'COMPLETED', label: 'Hoàn thành', color: 'text-emerald-700 bg-emerald-50 border-emerald-200' },
  { value: 'CANCELLED', label: 'Đã hủy', color: 'text-rose-700 bg-rose-50 border-rose-200' },
];

export const OrderAdmin = () => {
  const [orders, setOrders] = useState<OrderResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  
  const [selectedOrder, setSelectedOrder] = useState<OrderResponse | null>(null);

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
      
      // Update local state without fetching all orders again
      setOrders(orders.map(o => o.id === orderId ? { ...o, currentStatus: newStatus } : o));
    } catch (error) {
      console.error("Error updating order status:", error);
      toast.error("Cập nhật trạng thái thất bại");
    } finally {
      setIsUpdating(false);
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchStatus = statusFilter === "all" || order.currentStatus === statusFilter;
    const searchLower = searchQuery.toLowerCase();
    const matchSearch = order.id.toString().includes(searchLower) ||
                        (order.fullName && order.fullName.toLowerCase().includes(searchLower)) ||
                        (order.phone && order.phone.includes(searchLower));
    return matchStatus && matchSearch;
  });

  return (
    <div className="space-y-6 animate-fade-in relative">
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
          { label: "Đang Chuẩn Bị", value: orders.filter((o) => o.currentStatus === "PREPARING").length, color: "text-blue-600", bg: "bg-blue-50" },
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
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
          />
        </div>
        <div className="flex gap-4 overflow-x-auto pb-2 md:pb-0">
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-slate-50 border border-slate-200 text-slate-700 py-2.5 pl-4 pr-10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 appearance-none font-medium cursor-pointer transition-all"
          >
            <option value="all">Tất cả trạng thái</option>
            {STATUS_OPTIONS.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
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
              ) : filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                    Không có đơn hàng nào phù hợp
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
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
                      <div className="font-bold text-slate-800">
                        {/* Fallback to order.fullName if user is not populated, depending on backend inclusion */}
                        {order.fullName || (order as any).user?.fullName || "Khách Hàng"}
                      </div>
                      <div className="text-slate-500 text-xs mt-0.5">
                        {order.phone || (order as any).user?.phone || order.address}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="font-extrabold text-slate-900 text-base">
                        {Number(order.totalAmount).toLocaleString("vi-VN")}đ
                      </div>
                      <div className="text-slate-400 text-xs mt-0.5 uppercase tracking-wide">
                        {order.paymentMethod || (order as any).payment?.paymentMethod || "COD"}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <select
                        value={order.currentStatus}
                        onChange={(e) => handleUpdateStatus(order.id, e.target.value)}
                        disabled={isUpdating}
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold border outline-none cursor-pointer appearance-none text-center ${
                          STATUS_OPTIONS.find(o => o.value === order.currentStatus)?.color || 'bg-slate-50 text-slate-700'
                        }`}
                      >
                        {STATUS_OPTIONS.map(opt => (
                          <option key={opt.value} value={opt.value} className="bg-white text-slate-800">
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center space-x-2">
                        <button
                          title="Xem chi tiết"
                          onClick={() => setSelectedOrder(order)}
                          className="p-1.5 rounded-lg text-indigo-600 hover:bg-indigo-50 bg-indigo-50/50 transition font-medium text-xs px-3 border border-transparent hover:border-indigo-200"
                        >
                          Chi tiết
                        </button>
                        
                        {(order.currentStatus === "PENDING" || order.currentStatus === "CONFIRMED") && (
                          <button
                            title="Duyệt đơn chuyển sang Đang chuẩn bị"
                            onClick={() => handleUpdateStatus(order.id, "PREPARING")}
                            disabled={isUpdating}
                            className="p-1.5 rounded-lg text-blue-600 hover:bg-blue-50 bg-blue-50/50 transition font-medium text-xs px-3 border border-transparent hover:border-blue-200 disabled:opacity-50 whitespace-nowrap"
                          >
                            Duyệt đơn
                          </button>
                        )}
                        
                        {order.currentStatus === "PREPARING" && (
                          <button
                            title="Hoàn thành đơn"
                            onClick={() => handleUpdateStatus(order.id, "COMPLETED")}
                            disabled={isUpdating}
                            className="p-1.5 rounded-lg text-emerald-600 hover:bg-emerald-50 bg-emerald-50/50 transition font-medium text-xs px-3 border border-transparent hover:border-emerald-200 disabled:opacity-50 whitespace-nowrap"
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

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col animate-fade-in-up">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <h3 className="text-xl font-bold text-slate-800">
                Chi tiết đơn hàng #{selectedOrder.id}
              </h3>
              <button 
                onClick={() => setSelectedOrder(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Thông tin khách hàng</h4>
                  <div className="space-y-2 text-sm">
                    <p><span className="text-slate-500 font-medium">Họ tên:</span> <span className="font-bold text-slate-800">{selectedOrder.fullName || (selectedOrder as any).user?.fullName}</span></p>
                    <p><span className="text-slate-500 font-medium">SĐT:</span> <span className="font-medium text-slate-800">{selectedOrder.phone || (selectedOrder as any).user?.phone}</span></p>
                    <p><span className="text-slate-500 font-medium">Địa chỉ:</span> <span className="font-medium text-slate-800">{selectedOrder.address || (selectedOrder as any).shippingAddress}</span></p>
                  </div>
                </div>
                
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Thông tin đơn hàng</h4>
                  <div className="space-y-2 text-sm">
                    <p><span className="text-slate-500 font-medium">Ngày đặt:</span> <span className="font-medium text-slate-800">{new Date(selectedOrder.createdAt).toLocaleString("vi-VN")}</span></p>
                    <p><span className="text-slate-500 font-medium">Phương thức:</span> <span className="font-bold text-indigo-600">{selectedOrder.paymentMethod || (selectedOrder as any).payment?.paymentMethod || "N/A"}</span></p>
                    <p><span className="text-slate-500 font-medium">Trạng thái:</span> 
                      <span className={`ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-bold ${
                        STATUS_OPTIONS.find(o => o.value === selectedOrder.currentStatus)?.color
                      }`}>
                        {STATUS_OPTIONS.find(o => o.value === selectedOrder.currentStatus)?.label}
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              {selectedOrder.note && (
                <div className="mb-6 bg-amber-50 rounded-xl p-4 border border-amber-100">
                  <h4 className="text-xs font-bold text-amber-700 uppercase tracking-wider mb-1">Ghi chú của khách hàng</h4>
                  <p className="text-sm text-amber-900 font-medium">{selectedOrder.note}</p>
                </div>
              )}

              <h4 className="text-sm font-bold text-slate-800 mb-3 border-b border-slate-100 pb-2">Danh sách sản phẩm</h4>
              <div className="bg-white border border-slate-100 rounded-xl overflow-hidden">
                <table className="w-full text-left">
                  <thead className="bg-slate-50/80 text-xs text-slate-500">
                    <tr>
                      <th className="px-4 py-3 font-medium">Sản phẩm</th>
                      <th className="px-4 py-3 font-medium text-center">SL</th>
                      <th className="px-4 py-3 font-medium text-right">Đơn giá</th>
                      <th className="px-4 py-3 font-medium text-right">Thành tiền</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-sm">
                    {selectedOrder.orderItems?.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-50/50">
                        <td className="px-4 py-3">
                          <div className="font-bold text-slate-800">{item.product?.name || `Product #${item.productId}`}</div>
                          {item.note && <div className="text-xs text-amber-600 mt-0.5 flex items-start gap-1"><svg className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg> {item.note}</div>}
                        </td>
                        <td className="px-4 py-3 text-center font-medium text-slate-600">{item.quantity}</td>
                        <td className="px-4 py-3 text-right text-slate-600">{Number(item.price).toLocaleString("vi-VN")}đ</td>
                        <td className="px-4 py-3 text-right font-bold text-indigo-600">{(Number(item.price) * item.quantity).toLocaleString("vi-VN")}đ</td>
                      </tr>
                    ))}
                    {!selectedOrder.orderItems?.length && (
                      <tr>
                        <td colSpan={4} className="px-4 py-6 text-center text-slate-400">Không có dữ liệu sản phẩm</td>
                      </tr>
                    )}
                  </tbody>
                  <tfoot className="bg-slate-50 font-bold border-t border-slate-200">
                    <tr>
                      <td colSpan={3} className="px-4 py-4 text-right text-slate-600">Tổng cộng:</td>
                      <td className="px-4 py-4 text-right text-lg text-slate-900">{Number(selectedOrder.totalAmount).toLocaleString("vi-VN")}đ</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
            
            <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/50 flex justify-end">
              <button 
                onClick={() => setSelectedOrder(null)}
                className="px-6 py-2 bg-slate-800 text-white rounded-xl hover:bg-slate-900 transition-colors font-medium shadow-sm"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
