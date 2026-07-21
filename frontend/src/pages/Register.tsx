import React, { useState } from "react";
import AuthLayout from "../layout/AuthLayout";
import "./auth.css";
import type { RegisterFormErrors } from "../type_auth_api/auth.api";

export const RegisterPage = () => {
  const [formSignUp, setFormSignUp] = useState({
    fullName: "",
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    agree: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormSignUp({
      ...formSignUp,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<RegisterFormErrors>({});
  const [formError, setFormError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <AuthLayout>
      <div className="auth-tabs">
        <a className="auth-tab" href="/login">
          Đăng Nhập
        </a>
        <span className="auth-tab is-active">Đăng Ký</span>
      </div>

      <div className="auth-view">
        <h2>Tạo Tài Khoản</h2>
        <p className="auth-sub">
          Trở thành thành viên để nhận đặc quyền riêng của Le Cellier.
        </p>

        {formError && <div className="auth-form-error">{formError}</div>}

        <form onSubmit={handleSubmit} noValidate>
          <div
            className={`auth-field ${errors.fullName ? "auth-field-error" : ""}`}
          >
            <label htmlFor="fullName">Họ Và Tên</label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              placeholder="Nguyễn Văn A"
              value={formSignUp.fullName}
              onChange={handleChange}
              autoComplete="name"
            />
            {errors.fullName && (
              <div className="auth-error-text">{errors.fullName}</div>
            )}
          </div>

          <div className="auth-field-row">
            <div
              className={`auth-field ${errors.username ? "auth-field-error" : ""}`}
            >
              <label htmlFor="username">Tên Đăng Nhập</label>
              <input
                id="username"
                name="username"
                type="username"
                value={formSignUp.username}
                onChange={handleChange}
                autoComplete="new-username"
              />
              {errors.username && (
                <div className="auth-error-text">{errors.username}</div>
              )}
            </div>
          </div>

          <div className="auth-field-row">
            <div
              className={`auth-field ${errors.email ? "auth-field-error" : ""}`}
            >
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="ban@email.com"
                value={formSignUp.email}
                onChange={handleChange}
                autoComplete="email"
              />
              {errors.email && (
                <div className="auth-error-text">{errors.email}</div>
              )}
            </div>
            <div
              className={`auth-field ${errors.phone ? "auth-field-error" : ""}`}
            >
              <label htmlFor="phone">Số Điện Thoại</label>
              <input
                id="phone"
                name="phone"
                type="text"
                placeholder="09xx xxx xxx"
                value={formSignUp.phone}
                onChange={handleChange}
                autoComplete="tel"
              />
              {errors.phone && (
                <div className="auth-error-text">{errors.phone}</div>
              )}
            </div>
          </div>

          <div className="auth-field-row">
            <div
              className={`auth-field ${errors.password ? "auth-field-error" : ""}`}
            >
              <label htmlFor="password">Mật Khẩu</label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                value={formSignUp.password}
                onChange={handleChange}
                autoComplete="new-password"
              />
              {errors.password && (
                <div className="auth-error-text">{errors.password}</div>
              )}
            </div>
            <div
              className={`auth-field ${errors.confirmPassword ? "auth-field-error" : ""}`}
            >
              <label htmlFor="confirmPassword">Xác Nhận Mật Khẩu</label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={formSignUp.confirmPassword}
                onChange={handleChange}
                autoComplete="new-password"
              />
              {errors.confirmPassword && (
                <div className="auth-error-text">{errors.confirmPassword}</div>
              )}
            </div>
          </div>

          <label className="auth-check auth-terms">
            <input
              type="checkbox"
              name="agree"
              checked={formSignUp.agree}
              onChange={handleChange}
            />
            Tôi đồng ý với{" "}
            <a className="auth-link-muted" href="/terms">
              Điều khoản
            </a>{" "}
            &amp;{" "}
            <a className="auth-link-muted" href="/privacy">
              Chính sách bảo mật
            </a>
          </label>
          {errors.agree && (
            <div
              className="auth-error-text"
              style={{ marginTop: "-16px", marginBottom: "16px" }}
            >
              {errors.agree}
            </div>
          )}

          <button className="auth-btn-submit" type="submit" disabled={loading}>
            {loading ? "Đang Tạo Tài Khoản..." : "Tạo Tài Khoản"}
          </button>
        </form>

        <div className="auth-switch-line">
          Đã có tài khoản? <a href="/login">Đăng nhập</a>
        </div>
      </div>
    </AuthLayout>
  );
};
