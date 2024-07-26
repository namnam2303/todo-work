import React, { Component } from "react";

export default class Header extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-sm navbar-dark bg-primary mb-4">
          <div className="container">
            <a className="navbar-brand" href="Dashboard.html">
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

              <ul className="navbar-nav ml-auto d-flex justify-content-end w-100">
                <li className="nav-item">
                  <a className="nav-link" href="register.html">
                    Đăng ký
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="login.html">
                    Đăng nhập
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}
