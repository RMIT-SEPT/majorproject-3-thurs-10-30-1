import React, { Component } from 'react';
import './App.css';

import {BrowserRouter as Router, Route} from "react-router-dom";
import Home from "./Components/HomePage/Home";
import Dashboard from "./Components/Dashboards/Dashboard";
import Profile from "./Components/Profile/Profile";
import Registration from "./Components/Registration/Registration";
import  WorkerDashboard from "./Components/Dashboards/WorkerDashboard";
import {clearMessage} from "./actions/message";
import {logout} from "./actions/auth";
import AGMEnav from "./Components/Generics/AGMEnav";
import {connect} from 'react-redux'
import {history} from "./utils/history";
import EditProfile from "./Components/Profile/EditProfile";
import adminDashboard from "./Components/Dashboards/adminDashboard";
import WorkerMaker from "./Components/Registration/WorkerMaker";
import WorkerAvailabilities from "./Components/Dashboards/WorkerAvailabilities";
import ServiceMaker from "./Components/Registration/ServiceMaker";


class App extends Component {
    constructor(props) {
        super(props);
        this.logOut = this.logOut.bind(this);
        history.listen((location) => {
            props.dispatch(clearMessage()); // clear message when changing location
        });
    }

    logOut() {
        this.props.dispatch(logout());
    }

    componentDidMount() {
        const accType = this.props.accountType;
        if(accType==="Admin")
        {
            //set the businessId in the redux store
        }
        else if (accType==="Worker")
        {
            //set their services in the redux store?
        }
    }

    render()
  {
    return (
        <Router>
            <AGMEnav logout={this.logOut} />
            <Route exact path="/" component={Home}/>
            <Route exact path="/register" component={Registration}/>
            <Route exact path="/dashboard" component={Dashboard}/>
            <Route exact path="/profile" component ={Profile}/>
            <Route exact path="/workerHome" component ={WorkerDashboard}/>
            <Route exact path="/Availabilities" component ={WorkerAvailabilities}/>
            <Route exact path="/editprofile" component={EditProfile} />
            <Route exact path="/adminHome" component ={adminDashboard}/>
            <Route exact path="/workerMaker" component ={WorkerMaker}/>
            <Route exact path="/serviceMaker" component ={ServiceMaker}/>
        </Router>
    );
  }
}


function mapStateToProps(state) {
    const {user} = state.auth;
    const {accountType}= state.accountType;
    const {isLoggedIn} = state.auth;
    return {
        user,
        accountType,
        isLoggedIn
    };
}

export default connect(mapStateToProps)(App);
