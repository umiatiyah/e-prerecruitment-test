import React, { Component } from "react";

import Header from "./admin.dashboard.component/Header";
import Dashboard from "./admin.dashboard.component/Dashboard";
import Menu from "./admin.dashboard.component/Menu";
import Footer from "./admin.dashboard.component/Footer";

export default class BoardAdmin extends Component {
    constructor(props) {
        super(props);

        this.state = {
            content: ""
        };
    }

    render() {
        return (
            // <div className="container">
            //     <header className="jumbotron">
            //         <h3>{this.state.content}</h3>
            //     </header>
            // </div>

            <div className="wrapper">
                <Header />
                <Menu />
                <Dashboard />
                <Footer />
            </div>
        );
    }
}
