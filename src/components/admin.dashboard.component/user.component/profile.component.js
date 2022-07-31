import React, { Component } from "react";
import UserService from "../../../services/user.service";
import AuthService from "../../../services/auth.service";
import Header from "../Header";
import Menu from "../Menu";
import Footer from "../Footer";
export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.retrieveUser = this.retrieveUser.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeNIK = this.onChangeNIK.bind(this);
    this.updateUser = this.updateUser.bind(this);

    this.state = {
      user_id: 0,
      users: [],
      name: "",
      email: "",
      nik: "",
      message: "",
  };
  }

  componentDidMount() {
    this.retrieveUser();
  }

  onChangeName(e) {
    const value = e.target.value;

    this.setState(function (prevState) {
      return {
        users: {
          ...prevState.users,
          name: value,
        },
      };
    });
  }

  onChangeEmail(e) {
    const value = e.target.value;

    this.setState(function (prevState) {
      return {
        users: {
          ...prevState.users,
          email: value,
        },
      };
    });
  }

  onChangeNIK(e) {
    const value = e.target.value;

    this.setState(function (prevState) {
      return {
        users: {
          ...prevState.users,
          nik: value,
        },
      };
    });
  }

  retrieveUser() {
    const user = AuthService.getCurrentUserID();
 
    UserService.userDetail(user.user_id)
      .then((response) => {
        this.setState({
          users: response.data,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  updateUser() {
    const user = AuthService.getCurrentUserID();
 
    UserService.updateUser(user.user_id, this.state.users.name, this.state.users.email, this.state.users.nik)
      .then((response) => {
        if(response.data.status === 400) {
          alert(response.data.message)
        }
        window.location.reload();
      })
      .catch((error) => {
        alert(error);
      });
  }

  render() {
    const { users } = this.state;

    return (
      <div>
        <Header />
        <Menu />
        <section className="content-wrapper">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-header">
                    <div className="row">
                      <div className="col-sm-9">
                        <h3 className="card-title ">Profile</h3>
                      </div>
                    </div>
                  </div>
                  <div className="card-body p-0">
                  <div className="row">
                    <div className="col-lg-2">
                      <div className="form-group my-4">
                        <p>
                          Name
                        </p>
                      </div>
                      <div className="form-group my-4">
                        <p>
                          NIK
                        </p>
                      </div>
                      <div className="form-group my-4">
                        <p>
                          Email
                        </p>
                      </div>
                    </div>
                    <form>
                      <div className="col-lg-12">
                        <div className="form-group my-3">
                          <input
                          type="text"
                          className="form-control"
                          id="value"
                          value={users.name}
                          onChange={this.onChangeName}
                          />
                        </div>
                        <div className="form-group my-3">
                        <input
                          type="text"
                          className="form-control"
                          id="value"
                          value={users.nik}
                          onChange={this.onChangeNIK}
                          />
                        </div>
                        <div className="form-group my-3">
                        <input
                          type="text"
                          className="form-control"
                          id="value"
                          value={users.email}
                          onChange={this.onChangeEmail}
                          />
                        </div>
                      </div>
                    </form>
                    </div>
                      <div className="row">
                        <div className="col-lg-12">
                          <button
                            type="submit"
                            className="btn btn-warning btn-sm mr-2"
                            onClick={this.updateUser}
                          >
                            Update
                          </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    );
  }
}
