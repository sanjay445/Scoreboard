import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/dashboard";
import Leaderboard from "./components/leaderboard"
import Home from "./components/home";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Registration from "./auth/registration";
import Activities from "./components/activities";

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      loggedInStatus: "NOT_LOGGED_IN"
    };

    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
  }

  checkLoginStatus() {
    return new Promise((resolve, reject) => {
    axios
      .get("http://localhost:3001/logged_in", { withCredentials: true })
      .then(response => {
        console.log('check status:',response.data.logged_in,this.state?.loggedInStatus)
        if (
          response.data.logged_in &&
          this.state?.loggedInStatus === "NOT_LOGGED_IN"
        ) {
          this.setState({
            loggedInStatus: "LOGGED_IN"
          });
        } else if (
          !response.data.logged_in &&
          this.state?.loggedInStatus === "LOGGED_IN"
        ) {
          this.setState({
            loggedInStatus: "NOT_LOGGED_IN"
          });
        }
        resolve(response)
      })
      .catch(error => {
        console.log("login error", error);
        reject(error)
      });
  })
}

  handleSuccessfulAuth(data) {
    this.handleLogin(data);
  }

  componentDidMount() {
    this.checkLoginStatus();
  }

  handleLogin(data) {
    this.setState({
      loggedInStatus: "LOGGED_IN"
    });
  }

  handleLogout() {
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN"
    });
  }

  render() {
    return (
      <div className="app">
     <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              loggedInStatus={this.state.loggedInStatus}
              handleLogin={this.handleLogin}
              handleLogout={this.handleLogout}
            />
          }
        />
        <Route
          path="/activities"
          element={<Dashboard 
            loggedInStatus={this.state.loggedInStatus}             
            checkLoggedIn={this.checkLoginStatus}
            />}
        />
        <Route
          path="/leaderboard"
          element={<Leaderboard 
            loggedInStatus={this.state.loggedInStatus}             
            checkLoggedIn={this.checkLoginStatus}
            />}
        />
        <Route
          path="/registration"
          element={
            <Registration
              handleSuccessfulAuth={this.handleSuccessfulAuth}
              loggedInStatus={this.state.loggedInStatus}
            />
          }
        />
      </Routes>
    </Router>
      </div>
    );
  }
}