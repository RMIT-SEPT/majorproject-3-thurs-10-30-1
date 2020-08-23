import React, { Component } from 'react';
import './App.css';
import AGMEnav from "./Components/AGMEnav";
import Login from "./Components/Login";
import About from "./Components/aboutUs";

class App extends Component {
  render() {
      let links = [
          {label: 'Home', link: '#home'},
          {label: 'Testing', link: '#home'}
      ]

    return (
        <div className="homeContainer">
        <AGMEnav links={links} />
        <About />
        <Login />
            </div>
    );
  }
}

export default App;