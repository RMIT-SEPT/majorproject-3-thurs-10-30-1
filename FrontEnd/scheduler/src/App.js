import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from "react-router-dom";
import Home from "./Components/HomePage/Home";
import Dashboard from "./Components/Dashboards/Dashboard";
import Profile from "./Components/Profile/Profile";
import Registration from "./Components/Registration/Registration";
import bookingWorker from "./Components/Bookings/bookingWorker";
import bookingTime from "./Components/Bookings/bookingTime";

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
            <Route exact path="/booking/worker" component={bookingWorker}/>
            <Route exact path="/booking/time" component={bookingTime}/>
            <Route exact path="/profile" component ={Profile}/>
        </Router>
    );
  }
}

export default App;