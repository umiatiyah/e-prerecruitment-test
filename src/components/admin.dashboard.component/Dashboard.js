import React, { Component } from "react";
import DashboardService from "../../services/dashboard.service";
export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.count = this.count.bind(this);
    this.state = {
      count_admin: 0,
      count_user: 0,
      count_category: 0,
      count_question: 0,
      count_answer: 0,
    };
  }

  componentDidMount() {
    this.count();
  }

  count() {
    DashboardService.count()
      .then((response) => {
        this.setState({
          count_admin: response.data.count_admin,
          count_user: response.data.count_user,
          count_category: response.data.count_category,
          count_question: response.data.count_question,
          count_answer: response.data.count_answer,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
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
                        
              <div className="col-lg-12 col-12">
                <div className="small-box bg-warning">
                  <div className="inner">
                    <a href="/questions">
                      <p className="text-center">Take a Test <i className="fas fa-arrow-circle-right"></i></p>
                    </a>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>
      </div>
    );
  }
}
