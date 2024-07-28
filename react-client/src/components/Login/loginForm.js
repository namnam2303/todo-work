import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../actions/authAction";
import { useNavigate } from "react-router-dom";
const LoginForm = ({ history }) => {
  const [user, setUser] = useState({ username: "", password: "" });
  const errors = useSelector((state) => state.errors);
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    if (auth.isAuthenticated) {
      navigate("/dashboard");
    }
  }, [auth.isAuthenticated, navigate]);
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(user, history));
  };

  return (
    <div className="container">
      <div className="row justify-content-md-center">
        <div className="col-md-6">
          <h2 className="text-center">Đăng nhập</h2>
          {errors && (
            <div className="alert alert-danger" hidden={errors}>
              {errors.message}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Tên đăng nhập</label>
              <input
                type="text"
                className="form-control"
                id="username"
                name="username"
                value={user.username}
                onChange={handleChange}
                placeholder="Nhập tên đăng nhập"
              />
              {errors.username && (
                <div className="text-danger">{errors.username}</div>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="password">Mật khẩu</label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={user.password}
                onChange={handleChange}
                placeholder="Nhập mật khẩu"
              />
              {errors.password && (
                <div className="text-danger">{errors.password}</div>
              )}
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Đăng nhập
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
