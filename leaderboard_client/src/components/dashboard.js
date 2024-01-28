import React, { Component } from 'react'
import { Link } from "react-router-dom";

import Activities from "./activities";
import Leaderboard from "./leaderboard";
import Login from "../auth/login"
import axios from "axios";


export default class dashboard extends Component {
    constructor(props) {
        super(props);    
        this.checkLoginStatus()
        // this.state={path: window.location.pathname}
        
  }
  async checkLoginStatus(){
  await this.props.checkLoggedIn().then((res)=>{
    console.log("res:",res)
    if(!res.data.logged_in){
      window.location.replace('http://localhost:3000/');
    }
  })
 
}
  logout=()=>{
    axios
    .delete(
      "http://localhost:3001/logout", { withCredentials: true }
    )
    .then(response => {
      console.log("Logout response:",response)
      window.location.replace('http://localhost:3000/');
    })
    .catch(error => {
      console.log("logout error", error);
    });
  }
  
  render() {
    const header = {
      backgroundColor: "#343a40", // Set the background color for the div
      padding: "10px"
    };
    const headerrow = {
      backgroundColor: "#343a40", // Set the background color for the div
      paddingLeft: "10px"
    };
    const tabs = {
      listStyleType: "none",
      display: "flex",
      gap:"2%",
      paddingLeft: 0,
    };
    
    const logoutBtn = {
      cursor: "pointer",
      color: "#fff", // Set the color of the icon to white
    };
    return (
      <div>
       <div style={header}>
        <nav className='row' style={headerrow}>
          <ul className='col-11' style={tabs}>
            <li>
              <Link to="/activities" style={{ color: "#fff" }}>Activity points</Link>
            </li>
            <li>
              <Link to="/leaderboard" style={{ color: "#fff" }}>Leaderboard</Link>
            </li>
          </ul>
          <div className='col-1' onClick={this.logout} style={logoutBtn}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-box-arrow-right"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"
              />
              <path
                fillRule="evenodd"
                d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"
              />
            </svg>
          </div>
        </nav>
      </div>
      <Activities /> 
      
      </div>
    )
  }
}
