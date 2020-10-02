import React, { Component } from 'react';
import './App.css';

import {BrowserRouter as Router, Route} from "react-router-dom";
import Home from "./Components/HomePage/Home";
import Dashboard from "./Components/Dashboards/Dashboard";
import Profile from "./Components/Profile/Profile";
import Registration from "./Components/Registration/Registration";
import {clearMessage} from "./actions/message";
import {logout} from "./actions/auth";
import AGMEnav from "./Components/Generics/AGMEnav";
import {connect} from 'react-redux'
import {history} from "./utils/history";

class App extends Component {
    constructor(props) {
        super(props);
        this.logOut = this.logOut.bind(this);
        this.state = {
            admin: false,
            worker: false,
            currentUser: {}
        };
        history.listen((location) => {
            props.dispatch(clearMessage()); // clear message when changing location
        });
    }

    componentDidMount() {
        const user = this.props.user;
        if (user)
        {
            this.setState({
                currentUser: user,
                worker: user.accountType==="Worker",
                admin: user.accountType==="Admin"
            });
        }
    }

    logOut() {
        this.props.dispatch(logout());
    }

    render()
  {
    return (
        <Router>
            <AGMEnav logout={this.logOut} />
            <Route exact path="/" component={Home}/>
            <Route exact path="/register" component={Registration}/>
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/profile" component={Profile} />

        </Router>
    );
  }
}


function mapStateToProps(state) {
    const { user } = state.auth;
    return {
        user,
    };
}

export default connect(mapStateToProps)(App);
