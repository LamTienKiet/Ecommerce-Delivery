import { useState } from "react";
import AuthLayout from "../layout/AuthLayout";

export const LoginPage = () => {
  const [formSignIn, setFormSignIn] = useState({
    username: "",
    password: "",
  });
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
            Đăng nhập để tiếp tục trải nghiệm tại Le Cellier.
          </p>

          {formError && <div className="auth-form-error">{formError}</div>}

          <form onSubmit={handleSubmit} noValidate>
            <div
              className={`auth-field ${errors.email ? "auth-field-error" : ""}`}
            >
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="ban@email.com"
                value={form.email}
                onChange={handleChange}
                autoComplete="email"
              />
              {errors.email && (
                <div className="auth-error-text">{errors.email}</div>
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
                value={form.password}
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
                  checked={form.remember}
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
