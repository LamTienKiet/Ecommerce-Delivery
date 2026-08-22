import { useState } from "react";
import AuthLayout from "../layout/AuthLayout";
import "../assets/css/auth.css";
import type { LoginFormErrors } from "../type_auth_api/auth.api";
import { loginApi } from "../services/auth.service";
import axios from "axios";
import { useAuthStore } from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {
  const [formSignIn, setFormSignIn] = useState({
    username: "",
    password: "",
    remember: false,
  });

  const { login } = useAuthStore();

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormSignIn({
      ...formSignIn,
      [name]: value,
    });
  };

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<LoginFormErrors>({});
  const [formError, setFormError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    if (!validate()) return;
    setLoading(true);
    try {
      const data = await loginApi(formSignIn);
      console.log(data);

      // Lưu thông tin đăng nhập vào Store
      login(
        {
          id: data.id,
          username: data.username,
          role: data.role,
          fullName: data.fullName,
          email: data.email,
          phone: data.phone,
        },
        data.accessToken,
      );

      alert("Đăng nhập thành công!");
      if (data.role?.toUpperCase() === "ADMIN") {
        navigate("/admin");
      } else {
        navigate("/menu");
      }
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
    const next: LoginFormErrors = {};
    if (!formSignIn.username.trim())
      next.username = "Vui lòng nhập đầy đủ tên đăng nhập";
    if (!formSignIn.password.trim())
      next.password = "Vui lòng nhập đầy đủ mật khẩu";
    else if (formSignIn.password.length < 8)
      next.password = "Mật khẩu phải ít nhất 8 chữ số";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  return (
    <>
      <AuthLayout>
        <div className="auth-tabs">
          <span className="auth-tab is-active">Đăng Nhập</span>
          <a className="auth-tab" href="/register">
            Đăng Ký
          </a>
        </div>

        <div className="auth-view">
          <h2>Chào mừng trở lại</h2>
          <p className="auth-sub">
            Đăng nhập để tiếp tục trải nghiệm tại La TiuKy.
          </p>

          {formError && <div className="auth-form-error">{formError}</div>}

          <form onSubmit={handleSubmit} noValidate>
            <div
              className={`auth-field ${errors.username ? "auth-field-error" : ""}`}
            >
              <label htmlFor="username">Username</label>
              <input
                id="username"
                name="username"
                type="username"
                value={formSignIn.username}
                onChange={handleChange}
                autoComplete="username"
              />
              {errors.username && (
                <div className="auth-error-text">{errors.username}</div>
              )}
            </div>

            <div
              className={`auth-field ${errors.password ? "auth-field-error" : ""}`}
            >
              <label htmlFor="password">Mật Khẩu</label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                value={formSignIn.password}
                onChange={handleChange}
                autoComplete="current-password"
              />
              {errors.password && (
                <div className="auth-error-text">{errors.password}</div>
              )}
            </div>

            <div className="auth-row-between">
              <label className="auth-check">
                <input
                  type="checkbox"
                  name="remember"
                  checked={formSignIn.remember}
                  onChange={handleChange}
                />
                Ghi nhớ đăng nhập
              </label>
              <a className="auth-link-muted" href="/forgot-password">
                Quên mật khẩu?
              </a>
            </div>

            <button
              className="auth-btn-submit"
              type="submit"
              disabled={loading}
            >
              {loading ? "Đang Đăng Nhập..." : "Đăng Nhập"}
            </button>
          </form>

          <div className="auth-switch-line">
            Chưa có tài khoản? <a href="/register">Đăng ký ngay</a>
          </div>
        </div>
      </AuthLayout>
    </>
  );
};
