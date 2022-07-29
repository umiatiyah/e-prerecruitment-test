import React, { Component } from "react";
import { Link } from "react-router-dom";
import AuthService from "../../services/auth.service";
export default class Header extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();
    console.log("USER::",user);

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
      <nav className="main-header navbar navbar-expand navbar-light">
        {/* Left navbar links */}
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link" data-widget="pushmenu" href="#">
              <i className="fas fa-bars" />
            </a>
          </li>
        </ul>

        {currentUser ? (
          <div className="navbar-nav ml-auto mr-3">
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                data-toggle="dropdown"
                href="#"
                role="button"
                aria-haspopup="true"
                aria-expanded="false"
              >
                {currentUser.name}
              </a>
              <div className="dropdown-menu">
                <a className="dropdown-item" href="/profile">
                  Profile
                </a>
                <div className="dropdown-divider"></div>
                <a
                  href="/login"
                  className="dropdown-item"
                  onClick={this.logOut}
                >
                  Logout
                </a>
              </div>
            </li>
          </div>
        ) : (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/register"} className="nav-link">
                Sign Up
              </Link>
            </li>
          </div>
        )}
      </nav>
    );
  }
}
