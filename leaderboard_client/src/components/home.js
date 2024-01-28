import React, { Component } from "react";
import Login from "../auth/login";
import { Link } from "react-router-dom";
import axios from "axios";


export default class Home extends Component {
  constructor(props) {
    super(props);
    this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
  }

  handleSuccessfulAuth(data) {
    console.log("Login responce:",data)
    if(data.logged_in){
      this.props.handleLogin(data);
      window.location.replace('http://localhost:3000/leaderboard');
    }
    else{
      this.props.handleLogout(data);
    }
  }

  render() {
    return (
      <div>
        {/* <h1>Status: {this.props.loggedInStatus}</h1> */}
        <Login
          handleSuccessfulAuth={this.handleSuccessfulAuth}
        />      
      </div>
    );
  }
}