import React from "react";
import axios from "axios";
import { Link, Switch, Route } from "react-router-dom";
// import ViewApplication from "./ViewApplication";
import swal from "sweetalert";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      myFormD: {
        firstName: "",
        middleName: "",
        lastName: "",
        email: "",
        mobileNumber: "",
        aadharCardNo: "",
        password: 0,
      },
      errors: {},
    };
  }
  handleValidation() {
    let fields = this.state.myFormD;
    let errors = {};
    let formIsValid = true;

    if (!fields["firstName"].match(/^[a-zA-Z]+$/)) {
      formIsValid = false;
      errors["fname"] = "Only Letters";
    }

    if (!fields["middleName"].match(/^[a-zA-Z]+$/)) {
      formIsValid = false;
      errors["mname"] = "Only letters";
    }

    if (!fields["lastName"].match(/^[a-zA-Z]+$/)) {
      formIsValid = false;
      errors["lname"] = "Only Letter";
    }

    if (!fields["email"].match(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/)) {
      formIsValid = false;
      errors["email"] = "Email is not Valid";
    }
    if (!fields["mobileNumber"].match(/^\d{10}$/)) {
      formIsValid = false;
      errors["numbers"] = "Mobile Number Is not Valid";
    }

    if (!fields["aadharCardNo"].match(/^\d{12}$/)) {
      formIsValid = false;
      errors["number"] = "Aadhar Number Is not Valid";
    }

    this.setState({ errors: errors });
    return formIsValid;
  }

  handleSubmit = (e) => {
    e.preventDefault();
    // console.log(this.state.myFormD);

    if (this.handleValidation()) {
      var resp = axios
        .post("http://localhost:8082/users/new", this.state.myFormD)
        .then((response) => {
          const user = response.data;
          console.log(user.userId);
          swal(
            "Form Submitted!",
            "Your User Id is:" + user.userId,
            "success"
          ).then(function () {
            window.location = "/Login";
          });
        });
    } else {
      swal("Form has errors!", "Resubmit Form!", "error");
    }
  };

  render() {
    return (
      <div className="alert alert-warning text-center m-5 p-5 shadow">
        <h1>Registration Form</h1>
        <form onSubmit={this.handleSubmit}>
          <label for="fname">
            <b>First Name</b>
          </label>
          <h3>
            <input
              ref="fname"
              type="text"
              onChange={(e) => (this.state.myFormD.firstName = e.target.value)}
              required
            />
          </h3>
          <span style={{ color: "red" }}>{this.state.errors["fname"]}</span>
          <br />
          <label for="mname">
            <b>Middle Name</b>
          </label>
          <h3>
            <input
              type="text"
              onChange={(e) => (this.state.myFormD.middleName = e.target.value)}
              required
            />
          </h3>
          <span style={{ color: "red" }}>{this.state.errors["mname"]}</span>
          <br />
          <label for="lname">
            <b>Last Name</b>
          </label>
          <h3>
            <input
              type="text"
              onChange={(e) => (this.state.myFormD.lastName = e.target.value)}
              required
            />
          </h3>
          <span style={{ color: "red" }}>{this.state.errors["lname"]}</span>
          <br />
          <label for="emailid">
            <b>Email Id</b>
          </label>
          <h3>
            <input
              type="text"
              onChange={(e) => (this.state.myFormD.email = e.target.value)}
              required
            />
          </h3>
          <span style={{ color: "red" }}>{this.state.errors["email"]}</span>
          <br />
          <label for="mobilenumber">
            <b>Mobile Number</b>
          </label>
          <h3>
            <input
              type="number"
              maxLength="10"
              onChange={(e) =>
                (this.state.myFormD.mobileNumber = e.target.value)
              }
              required
            />
          </h3>
          <span style={{ color: "red" }}>{this.state.errors["numbers"]}</span>
          <br />
          <label for="aadharcardnumber">
            <b>Aadhar Card Number</b>
          </label>
          <h3>
            <input
              type="number"
              maxLength="12"
              onChange={(e) =>
                (this.state.myFormD.aadharCardNo = e.target.value)
              }
              required
            />
          </h3>
          <span style={{ color: "red" }}>{this.state.errors["number"]}</span>
          <br />
          <label for="password">
            <b>Password</b>
          </label>
          <h3>
            <input
              type="text"
              onChange={(e) => (this.state.myFormD.password = e.target.value)}
              required
            />
          </h3>

          <br />
          <button className="btn btn-success mx-3 btn-md shadow" type="submit">
            Submit
          </button>
          <button type="reset" className="btn btn-danger mx-3 btn-md shadow">
            Cancel
          </button>
        </form>
      </div>
    );
  }
}

export default Register;
