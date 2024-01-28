import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import '../styles/login.css'
export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      loginErrors: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(event) {
    const { email, password } = this.state;
    axios
      .post(
        "http://localhost:3001/sessions",
        {
          user: {
            email: email,
            password: password
          }
        }, { withCredentials: true }
      )
      .then(response => {
        if (response.data.logged_in) {
          console.log("Responce1:",response)
          this.props.handleSuccessfulAuth(response.data);
        } else {
          console.log("Responce2:",response)
          this.props.handleSuccessfulAuth(response.data);
        }
      })
      .catch(error => {
        console.log("login error", error);
      });

    event.preventDefault();
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  render() {
    return (
      <div className="login-container">
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <input
            className="form-control"
            type="email"
            name="email"
            placeholder="Email"
            required
            value={this.state.email}
            onChange={this.handleChange}
          />
        </div>
        <div className="form-group">
          <input
            className="form-control"
            type="password"
            name="password"
            placeholder="Password"
            required
            value={this.state.password}
            onChange={this.handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary btn-login">
          Login
        </button>
      </form>
      <p>
          Don't have an account? <Link to="/registration">Register</Link>
        </p>
    </div>
    );
  }
}
