import React, { Component } from 'react';
import './App.css';
import Home from "./Components/Home";
import Registration from "./Components/Registration";
import {BrowserRouter as Router, Route} from "react-router-dom";
import Dashboard from "./Components/Dashboard";
import Profile from "./Components/Profile";
import adminDashboard from './Components/adminDashboard';

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
            <Route exact path="/admindashboard" component ={adminDashboard}/>

        </Router>
    );
  }
}

export default App;