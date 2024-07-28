import React, { useState } from "react";

const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "username") setUsername(value);
    if (name === "password") setPassword(value);
    if (name === "confirmPassword") setConfirmPassword(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Xử lý đăng ký
    console.log("Đăng ký với:", { username, password, confirmPassword });
  };

  return (
    <div className="container">
      <div className="row justify-content-md-center">
        <div className="col-md-6">
          <h2 className="text-center">Đăng ký</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Tên đăng nhập</label>
              <input
                type="text"
                className="form-control"
                id="username"
                placeholder="Nhập tên đăng nhập"
                name="username"
                value={username}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Mật khẩu</label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Nhập mật khẩu"
                name="password"
                value={password}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Xác nhận mật khẩu</label>
              <input
                type="password"
                className="form-control"
                id="confirmPassword"
                placeholder="Xác nhận mật khẩu"
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleChange}
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Đăng ký
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
