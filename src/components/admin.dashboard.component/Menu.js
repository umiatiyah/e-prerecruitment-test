import React, { Component } from "react";
import AuthService from "../../services/auth.service";

export default class Menu extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
      });
    }
  }

  logOut() {
    AuthService.logout();
  }
  render() {
    const { currentUser } = this.state;
    return (
      <aside className="main-sidebar sidebar-light-primary elevation-4">
        {/* Brand Logo */}
        <a href="/dashboard" className="brand-link">
          <img
            src="/assets/dist/img/AdminLTELogo.png"
            alt="AdminLTE Logo"
            className="brand-image img-circle elevation-3"
            style={{ opacity: ".8" }}
          />
          <span className="brand-text font-weight-light">e-psikotest</span>
        </a>
        {/* Sidebar */}
        <div className="sidebar">
          {/* Sidebar user panel (optional) */}
          <div className="user-panel mt-3 pb-3 mb-3 d-flex">
            <div className="image">
              <img
                src="/assets/dist/img/user5-128x128.jpg"
                className="img-circle elevation-2"
                alt="User"
              />
            </div>
            {currentUser ? (
              <div className="info">
                <a href="/profile" className="d-block">
                  {currentUser.name}
                </a>
              </div>
            ) : (
              <div className="info">
                <a href="/login" className="d-block">
                  user
                </a>
              </div>
            )}
          </div>
          {/* Sidebar Menu */}
          <nav className="mt-2">
            <ul
              className="nav nav-pills nav-sidebar flex-column"
              data-widget="treeview"
              role="menu"
              data-accordion="false"
            >
              <li className="nav-item ">
                <a href="/dashboard" className="nav-link">
                  <i className="nav-icon fas fa-home" />
                  <p>
                    Dashboard
                  </p>
                </a>
              </li>
            </ul>
          </nav>
          {/* /.sidebar-menu */}
        </div>
        {/* /.sidebar */}
      </aside>
    );
  }
}
