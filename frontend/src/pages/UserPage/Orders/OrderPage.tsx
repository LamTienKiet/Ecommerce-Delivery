import { useState } from 'react';

// Giả lập dữ liệu, bạn có thể thay thế bằng dữ liệu lấy từ API sau
const MOCK_ORDERS = [
  {
    id: 'ORD-2023-1001',
    date: '25/10/2023',
    totalAmount: 1250000,
    status: 'COMPLETED',
    items: [
      { id: 1, name: 'Tai nghe Bluetooth không dây', quantity: 1, price: 850000 },
      { id: 2, name: 'Ốp lưng iPhone 14 Pro Max', quantity: 2, price: 200000 },
    ],
  },
  {
    id: 'ORD-2023-1002',
    date: '28/10/2023',
    totalAmount: 450000,
    status: 'PENDING',
    items: [
      { id: 3, name: 'Cáp sạc Type-C siêu nhanh', quantity: 3, price: 150000 },
    ],
  },
  {
    id: 'ORD-2023-1003',
    date: '02/11/2023',
    totalAmount: 2100000,
    status: 'DELIVERING',
    items: [
      { id: 4, name: 'Bàn phím cơ không dây', quantity: 1, price: 2100000 },
    ],
  },
  {
    id: 'ORD-2023-1004',
    date: '05/11/2023',
    totalAmount: 320000,
    status: 'CANCELLED',
    items: [
      { id: 5, name: 'Chuột không dây Silent', quantity: 1, price: 320000 },
    ],
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'COMPLETED':
      return 'bg-green-100 text-green-700 border-green-200';
    case 'PENDING':
      return 'bg-yellow-100 text-yellow-700 border-yellow-200';
    case 'DELIVERING':
      return 'bg-blue-100 text-blue-700 border-blue-200';
    case 'CANCELLED':
      return 'bg-red-100 text-red-700 border-red-200';
    default:
      return 'bg-gray-100 text-gray-700 border-gray-200';
  }
};

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
};

export const OrderPage = () => {
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);

  const toggleOrderDetails = (orderId: string) => {
    setSelectedOrder(selectedOrder === orderId ? null : orderId);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8 tracking-tight">
          Lịch sử Đơn hàng
        </h1>

        <div className="space-y-6">
          {MOCK_ORDERS.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300"
            >
              {/* Card Header / Summary */}
              <div 
                className="p-6 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                onClick={() => toggleOrderDetails(order.id)}
              >
                <div className="flex flex-col sm:flex-row sm:gap-8 gap-2">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Mã đơn hàng</p>
                    <p className="text-lg font-semibold text-gray-900">{order.id}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Ngày đặt</p>
                    <p className="text-base font-medium text-gray-900">{order.date}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Tổng tiền</p>
                    <p className="text-base font-semibold text-blue-600">
                      {formatCurrency(order.totalAmount)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-4">
                  <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                  
                  <button className="text-gray-400 hover:text-gray-600 transition-colors">
                    <svg
                      className={`w-6 h-6 transform transition-transform duration-300 ${selectedOrder === order.id ? 'rotate-180' : ''}`}
                      fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Collapsible Details */}
              <div 
                className={`transition-all duration-500 ease-in-out ${
                  selectedOrder === order.id ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="border-t border-gray-100 p-6 bg-gray-50/50">
                  <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-4">
                    Chi tiết sản phẩm
                  </h3>
                  <div className="space-y-4">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex justify-between items-center bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{item.name}</p>
                            <p className="text-sm text-gray-500">Số lượng: <span className="font-semibold text-gray-700">{item.quantity}</span></p>
                          </div>
                        </div>
                        <p className="font-medium text-gray-900">
                          {formatCurrency(item.price)}
                        </p>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 flex justify-end">
                    <button className="px-6 py-2 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-colors shadow-sm">
                      Mua lại
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
