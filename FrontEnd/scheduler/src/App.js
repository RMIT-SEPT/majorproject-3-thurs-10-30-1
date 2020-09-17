import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from "react-router-dom";
import Home from "./Components/HomePage/Home";
import Dashboard from "./Components/Dashboards/Dashboard";
import Profile from "./Components/Profile/Profile";
import Registration from "./Components/Registration/Registration";
import  WorkerDashboard from "./Components/Dashboards/WorkerDashboard";

class App extends Component {
    state =
        {
            loggedIn:false
        }

  render()
  {
    return (
        <Router>
            <Route exact path="/" component={Home}/>
            <Route exact path="/register" component={Registration}/>
            <Route exact path="/dashboard" component={Dashboard}/>
            <Route exact path="/profile" component ={Profile}/>
            <Route exact path="/workerHome" component ={WorkerDashboard}/>
        </Router>
    );
  }
}

export default App;