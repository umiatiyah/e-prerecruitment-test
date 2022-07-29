import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import "./App.css";

import AuthService from "./services/auth.service";

import Login from "./components/login.component";
import BoardAdmin from "./components/board-admin.component";

import ListQuestion from "./components/admin.dashboard.component/questions.component/list-questions.component";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showAdminBoard: false,
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

    return (
      <div className="wrapper">
        <div>
          <Switch>
            <Route exact path={["/", "/login"]} component={Login} />
            <Route path="/dashboard" component={BoardAdmin} />

            <Route exact path="/questions" component={ListQuestion} />

            <Redirect exact from="/" to="/login" />
            <Route path="/login" component={Login} />
          </Switch>
        </div>
        {/* <Footer /> */}
      </div>
    );
  }
}

export default App;
