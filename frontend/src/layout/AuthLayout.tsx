import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="auth-shell">
      <div className="auth-brand-panel">
        <div className="auth-brand-top">
          <div className="auth-logo">
            LE <em>CELLIER</em>
          </div>
        </div>

        <div className="auth-brand-mid">
          <span className="auth-eyebrow">Thành viên La TiuKy</span>
          <h1>
            Một chỗ ngồi luôn
            <br />
            được giữ sẵn cho bạn.
          </h1>
          <p>
            Đăng nhập để đặt bàn ưu tiên, theo dõi lịch sử thưởng thức và nhận
            những ưu đãi dành riêng cho thành viên.
          </p>
        </div>

        <div className="auth-perks">
          <div className="auth-perk">
            <span className="num">I</span>
            <span className="txt">Đặt bàn ưu tiên, kể cả cuối tuần</span>
          </div>
          <div className="auth-perk">
            <span className="num">II</span>
            <span className="txt">Rượu vang độc quyền theo mùa</span>
          </div>
          <div className="auth-perk">
            <span className="num">III</span>
            <span className="txt">Ưu đãi riêng vào dịp sinh nhật</span>
          </div>
        </div>
      </div>

      <div className="auth-panel">
        <div className="auth-box">{children}</div>
      </div>
    </div>
  );
}
