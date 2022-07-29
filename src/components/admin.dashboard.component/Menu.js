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
        <a href="/admin" className="brand-link">
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
                  {currentUser.name}
              </div>
            ) : (
              <div className="info">
                <a href="/login" className="d-block">
                  admin
                </a>
              </div>
            )}
          </div>
          {/* Sidebar Menu */}
          {/* /.sidebar-menu */}
        </div>
        {/* /.sidebar */}
      </aside>
    );
  }
}
