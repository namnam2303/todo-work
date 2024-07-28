// Header.js
import React from "react";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authAction";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const Header = ({ auth, logoutUser }) => {
  const navigate = useNavigate();
  const onLogoutClick = (e) => {
    e.preventDefault();
    logoutUser();
    navigate("/login");
  };

  const authLinks = (
    <ul className="navbar-nav ml-auto d-flex justify-content-end w-100">
      <li className="nav-item">
        <a href="/" onClick={onLogoutClick} className="nav-link">
          Đăng xuất
        </a>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul className="navbar-nav ml-auto d-flex justify-content-end w-100">
      <li className="nav-item">
        <a className="nav-link" href="/register">
          Đăng ký
        </a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="/login">
          Đăng nhập
        </a>
      </li>
    </ul>
  );

  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-primary mb-4">
      <div className="container">
        <a className="navbar-brand" href="/dashboard">
          Công cụ quản lý dự án cá nhân
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#mobile-nav"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="mobile-nav">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <a className="nav-link" href="/dashboard">
                Dashboard
              </a>
            </li>
          </ul>
          {auth.isAuthenticated ? authLinks : guestLinks}
        </div>
      </div>
    </nav>
  );
};

Header.propTypes = {
  auth: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser })(Header);
