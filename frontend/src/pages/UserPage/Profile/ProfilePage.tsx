import { useState } from "react";
import { useAuthStore } from "../../../store/useAuthStore";
import { updateProfileApi } from "../../../services/profile.service";
import toast from "react-hot-toast";

export const ProfilePage = () => {
  const { user, logout, updateUser } = useAuthStore(); // đổi tên "logout" nếu store của bạn đặt tên hàm khác

  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState({
    fullName: user?.fullName ?? "",
    phone: user?.phone?.toString() ?? "",
  });

  function startEditing() {
    setDraft({ fullName: user?.fullName ?? "", phone: user?.phone?.toString() ?? "" });
    setIsEditing(true);
  }

  function cancelEditing() {
    setIsEditing(false);
  }

  async function saveEditing() {
    try {
      await updateProfileApi({
        fullName: draft.fullName,
        phone: draft.phone,
      });
      updateUser({
        fullName: draft.fullName,
        phone: draft.phone,
      });
      toast.success("Cập nhật hồ sơ thành công!");
      setIsEditing(false);
    } catch (error) {
      console.error(error);
      toast.error("Có lỗi xảy ra khi cập nhật hồ sơ");
    }
  }

  const initials =
    user?.fullName
      ?.split(" ")
      .filter(Boolean)
      .slice(-2)
      .map((w) => w[0])
      .join("")
      .toUpperCase() || "?";

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-16">
      {/* ---------- PAGE HEADER ---------- */}
      <div className="border-b border-[#2a3c31] pb-5">
        <span
          className="text-sm italic text-[#B7913C] tracking-wide"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          Tài khoản của bạn
        </span>
        <h1 className="mt-1 text-3xl font-serif font-bold text-[#F1E9D8] tracking-wider uppercase">
          Hồ Sơ Cá Nhân
        </h1>
      </div>

      {/* ---------- HERO CARD ---------- */}
      <div className="relative overflow-hidden bg-[#16251e] border border-[#2a3c31] rounded-2xl shadow-xl shadow-black/20">
        <div
          className="absolute inset-0 opacity-40 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 15% 0%, rgba(183,145,60,0.10), transparent 55%)",
          }}
        />

        <div className="relative flex flex-col sm:flex-row sm:items-center gap-6 p-8">
          <div className="w-24 h-24 shrink-0 rounded-full bg-[#121B16] border-2 border-[#B7913C] flex items-center justify-center text-[#B7913C] shadow-lg shadow-[#B7913C]/10 text-2xl font-serif font-semibold">
            {initials}
          </div>

          <div className="flex-1 min-w-0">
            <div className="text-2xl font-serif font-semibold text-[#F1E9D8] truncate">
              {user?.fullName || "Chưa cập nhật họ tên"}
            </div>
            <div className="mt-1 text-sm text-[#A9B4A4]">@{user?.username}</div>

            {user?.role && (
              <span className="inline-flex items-center mt-3 px-3 py-1 bg-[#B7913C]/10 border border-[#B7913C]/30 text-[#B7913C] text-[11px] font-semibold rounded-full uppercase tracking-widest">
                {user.role}
              </span>
            )}
          </div>

          {!isEditing && (
            <div className="flex sm:flex-col gap-3 shrink-0">
              <button
                type="button"
                onClick={startEditing}
                className="px-5 py-2.5 border border-[#B7913C] text-[#F1E9D8] text-xs uppercase tracking-widest hover:bg-[#B7913C] hover:text-[#121B16] transition-colors rounded-lg"
              >
                Chỉnh Sửa
              </button>
              <button
                type="button"
                onClick={() => logout?.()}
                className="px-5 py-2.5 border border-[#7C2233]/60 text-[#D68A97] text-xs uppercase tracking-widest hover:bg-[#7C2233] hover:text-[#F1E9D8] hover:border-[#7C2233] transition-colors rounded-lg"
              >
                Đăng Xuất
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ---------- THÔNG TIN CÁ NHÂN ---------- */}
      <div className="bg-[#16251e] border border-[#2a3c31] rounded-2xl shadow-xl shadow-black/20">
        <div className="px-8 pt-7 pb-2 flex items-center justify-between">
          <h2 className="text-xs font-semibold text-[#A9B4A4] uppercase tracking-widest">
            Thông Tin Cá Nhân
          </h2>
          {isEditing && (
            <div className="flex gap-2">
              <button
                type="button"
                onClick={cancelEditing}
                className="px-4 py-1.5 text-xs uppercase tracking-widest text-[#A9B4A4] hover:text-[#F1E9D8] transition-colors"
              >
                Huỷ
              </button>
              <button
                type="button"
                onClick={saveEditing}
                className="px-4 py-1.5 text-xs uppercase tracking-widest bg-[#B7913C] text-[#121B16] rounded-lg font-semibold hover:bg-[#c7a256] transition-colors"
              >
                Lưu Thay Đổi
              </button>
            </div>
          )}
        </div>

        <div className="px-8 pb-6">
          <InfoRow
            icon={<UserIcon />}
            label="Họ Và Tên"
            value={user?.fullName}
            editable
            isEditing={isEditing}
            inputValue={draft.fullName}
            onInputChange={(v) => setDraft((d) => ({ ...d, fullName: v }))}
          />
          <InfoRow
            icon={<AtIcon />}
            label="Tên Đăng Nhập"
            value={user?.username}
          />
          <InfoRow icon={<MailIcon />} label="Email" value={user?.email} />
          <InfoRow
            icon={<PhoneIcon />}
            label="Số Điện Thoại"
            value={user?.phone?.toString()}
            editable
            isEditing={isEditing}
            inputValue={draft.phone}
            onInputChange={(v) => setDraft((d) => ({ ...d, phone: v }))}
            isLast
          />
        </div>
      </div>
    </div>
  );
};

/* =========================================================
   Sub-components
   ========================================================= */

function InfoRow({
  icon,
  label,
  value,
  editable = false,
  isEditing = false,
  inputValue = "",
  onInputChange,
  isLast = false,
}: {
  icon: React.ReactNode;
  label: string;
  value?: string | null;
  editable?: boolean;
  isEditing?: boolean;
  inputValue?: string;
  onInputChange?: (v: string) => void;
  isLast?: boolean;
}) {
  const showInput = editable && isEditing;

  return (
    <div
      className={`flex items-center gap-4 py-4 ${
        isLast ? "" : "border-b border-[#2a3c31]/70"
      }`}
    >
      <div className="w-10 h-10 shrink-0 rounded-lg bg-[#121B16] border border-[#2a3c31] flex items-center justify-center text-[#B7913C]">
        {icon}
      </div>

      <div className="flex-1 min-w-0">
        <div className="text-[11px] text-[#A9B4A4] uppercase tracking-widest mb-1">
          {label}
        </div>

        {showInput ? (
          <input
            type="text"
            value={inputValue}
            onChange={(e) => onInputChange?.(e.target.value)}
            className="w-full bg-[#121B16] border border-[#B7913C]/50 focus:border-[#B7913C] rounded-lg px-3 py-2 text-[#F1E9D8] text-base outline-none transition-colors"
          />
        ) : (
          <div className="text-base text-[#F1E9D8] truncate">
            {value || <span className="text-[#6C7A6F]">Chưa cập nhật</span>}
          </div>
        )}
      </div>
    </div>
  );
}

function UserIcon() {
  return (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
      />
    </svg>
  );
}
function AtIcon() {
  return (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <circle cx="12" cy="12" r="4" strokeWidth={1.5} />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M16 12v1.5a2.5 2.5 0 005 0V12a9 9 0 10-4 7.5"
      />
    </svg>
  );
}
function MailIcon() {
  return (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M3 7l9 6 9-6M5 5h14a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2z"
      />
    </svg>
  );
}
function PhoneIcon() {
  return (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M3 5a2 2 0 012-2h2.28a1 1 0 01.97.76l1 4a1 1 0 01-.27.95l-1.5 1.5a11 11 0 006 6l1.5-1.5a1 1 0 01.95-.27l4 1a1 1 0 01.76.97V19a2 2 0 01-2 2h-1C9.6 21 3 14.4 3 6V5z"
      />
    </svg>
  );
}
