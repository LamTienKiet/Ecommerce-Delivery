import { useAuthStore } from "../../../store/useAuthStore";

export const ProfilePage = () => {
  const { user } = useAuthStore();

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="flex items-center justify-between border-b border-[#2a3c31] pb-4">
        <h1 className="text-3xl font-serif font-bold text-[#F1E9D8] tracking-wider uppercase">
          Hồ sơ cá nhân
        </h1>
      </div>

      <div className="bg-[#16251e] border border-[#2a3c31] rounded-2xl p-8 shadow-xl shadow-black/20">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="w-32 h-32 rounded-full bg-[#121B16] border-2 border-[#B7913C] flex items-center justify-center shadow-lg shadow-[#B7913C]/10 text-[#B7913C]">
            <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          
          <div className="flex-1 w-full grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="text-xs text-[#A9B4A4] uppercase tracking-widest block mb-1">Họ và tên</label>
              <div className="text-lg text-[#F1E9D8] font-medium px-4 py-3 bg-[#121B16] border border-[#2a3c31] rounded-xl w-full">
                {user?.fullName || "Chưa cập nhật"}
              </div>
            </div>

            <div>
              <label className="text-xs text-[#A9B4A4] uppercase tracking-widest block mb-1">Tên đăng nhập</label>
              <div className="text-lg text-[#F1E9D8] font-medium px-4 py-3 bg-[#121B16] border border-[#2a3c31] rounded-xl w-full">
                {user?.username}
              </div>
            </div>

            <div>
              <label className="text-xs text-[#A9B4A4] uppercase tracking-widest block mb-1">Email</label>
              <div className="text-lg text-[#F1E9D8] font-medium px-4 py-3 bg-[#121B16] border border-[#2a3c31] rounded-xl w-full break-all">
                {user?.email || "Chưa cập nhật"}
              </div>
            </div>

            <div>
              <label className="text-xs text-[#A9B4A4] uppercase tracking-widest block mb-1">Số điện thoại</label>
              <div className="text-lg text-[#F1E9D8] font-medium px-4 py-3 bg-[#121B16] border border-[#2a3c31] rounded-xl w-full">
                {user?.phone || "Chưa cập nhật"}
              </div>
            </div>
            
            <div>
              <label className="text-xs text-[#A9B4A4] uppercase tracking-widest block mb-1">Vai trò</label>
              <div className="inline-flex items-center mt-1 px-4 py-2 bg-[#B7913C]/10 border border-[#B7913C]/30 text-[#B7913C] text-sm font-semibold rounded-lg uppercase tracking-wider">
                {user?.role}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
