import React, { Component } from "react";
import AuthService from "../../services/auth.service";
import UserService from "../../services/question.service";
export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.cekUser = this.cekUser.bind(this);
    this.state = {
      user: "",
    };
  }

  componentDidMount() {
    this.cekUser();
  }

  cekUser() {
    const user = AuthService.getCurrentUserID();
    console.log("userrr::",user);
 
    UserService.cekUser(user.user_id)
      .then((response) => {
        this.setState({
          user: response.data.message,
        });
        console.log("ss::",response.data.message);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { user } = this.state;
    return (
      <div className="content-wrapper">
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0">Welcome</h1>
              </div>
            </div>
          </div>
        </div>

        <section className="content">
          <div className="container-fluid">
            <div className="row">
                        
            {user === "Exists" ? (
              <div className="col-lg-12 col-12">
                <div className="small-box bg-danger">
                  <div className="inner">
                    <p className="text-center"><b>you have done the test</b></p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="col-lg-12 col-12">
                <div className="small-box bg-warning">
                  <div className="inner">
                    <a href="/questions">
                      <p className="text-center">Take a Test <i className="fas fa-arrow-circle-right"></i></p>
                    </a>
                  </div>
                </div>
              </div>
            )}

            </div>
          </div>
        </section>
      </div>
    );
  }
}
