import React, { useState } from "react";
import AuthLayout from "../layout/AuthLayout";
import "../assets/css/auth.css";
import type { RegisterFormErrors } from "../type_auth_api/auth.api";
import axios from "axios";
import { registerApi } from "../services/auth.service";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const RegisterPage = () => {
  const navigate = useNavigate();

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    if (!validate()) return;
    setLoading(true);
    try {
      const data = await registerApi(formSignUp);
      console.log(data);

      toast.success("Đăng ký thành công!");

      // Ví dụ chuyển sang trang đăng nhập
      navigate("/login");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setFormError(error.response?.data?.message || "Đăng ký thất bại");
      } else if (error instanceof Error) {
        setFormError(error.message);
      } else {
        setFormError("Đã xảy ra lỗi");
      }
    } finally {
      setLoading(false);
    }
  };

  function validate() {
    const next: RegisterFormErrors = {};
    if (!formSignUp.fullName.trim())
      next.fullName = "Vui lòng nhập đầy đủ họ tên";
    if (!formSignUp.username.trim())
      next.username = "Vui lòng nhập đầy đủ tên đăng nhập";
    if (!formSignUp.email.trim()) next.email = "Vui lòng nhập đầy đủ Email";
    if (!formSignUp.phone.trim())
      next.phone = "Vui lòng nhập đầy đủ số điện thoại";
    else if (formSignUp.phone.length < 10 || formSignUp.phone.length > 10)
      next.phone = "Số điện thoại không đúng định dạng";
    if (!formSignUp.password.trim())
      next.password = "Vui lòng nhập đầy đủ mật khẩu";
    else if (formSignUp.password.length < 8)
      next.password = "Mật khẩu phải ít nhất 8 chữ số";
    if (formSignUp.confirmPassword !== formSignUp.password)
      next.confirmPassword = "Mật khẩu không khớp";
    if (!formSignUp.agree) next.agree = "Bạn cần đồng ý điều khoản để tiếp tục";
    setErrors(next);
    return Object.keys(next).length === 0;
  }
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
