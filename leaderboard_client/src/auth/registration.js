import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import '../styles/registration.css'
export default class Registration extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      password_confirmation: "",
      role_id:"",
      registrationErrors: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(event) {
    const {
      email,
      password,
      password_confirmation,
      role_id
    } = this.state;
    axios
      .post(
        "http://localhost:3001/registrations",
        {
          user: {
            email: email,
            password: password,
            password_confirmation: password_confirmation,
            role_id: role_id
          }
        }, { withCredentials: true }
      )
      .then(response => {
        if (response.data.status === "created") {
          console.log("Registration data", response.data)
        }
      })
      .catch(error => {
        console.log("registration error", error);
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
      <div className="registration-container">
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

          <div className="form-group">
            <input
              className="form-control"
              type="password"
              name="password_confirmation"
              placeholder="Password Confirmation"
              required
              value={this.state.password_confirmation}
              onChange={this.handleChange}
            />
          </div>
          <p>Enter 1 if you are Admin, else enter 0</p>
          <div className="form-group">
            <input
              className="form-control"
              type="number"
              name="role_id"
              placeholder="Enter Role ID"
              required
              value={this.state.role_id}
              onChange={this.handleChange}
            />
          </div>
          <button type="submit" className="btn btn-primary btn-register">
            Register
          </button>
          <p>
            Have an account? <Link to="/" className="login-link">Login</Link>
          </p>
        </form>
      </div>
    );
  }
}