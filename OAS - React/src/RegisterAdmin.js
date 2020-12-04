import React from "react";
import axios from "axios";
import swal from "sweetalert";
import { Link, Switch, Route } from "react-router-dom";
// import ViewApplication from "./ViewApplication";

class RegisterAdmin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      myAdminFormD: {
        firstName: "",
        lastName: "",
        password: 0,
      },
      errors: {},
    };
  }
  handleValidation() {
    let fields = this.state.myAdminFormD;
    let errors = {};
    let formIsValid = true;

    if (!fields["firstName"].match(/^[a-zA-Z]+$/)) {
      formIsValid = false;
      errors["fname"] = "Cannot Be Empty or Only Letters";
    }

    if (!fields["lastName"].match(/^[a-zA-Z]+$/)) {
      formIsValid = false;
      errors["lname"] = "Cannot Be Empty or Only Letter";
    }

    this.setState({ errors: errors });
    return formIsValid;
  }

  handleSubmit = (e) => {
    e.preventDefault();
    // console.log(this.state.myFormD);

    if (this.handleValidation()) {
      var resp = axios
        .post("http://localhost:8082/admins/new", this.state.myAdminFormD)
        .then((response) => {
          const admin = response.data;
          console.log(admin.adminId);
          //alert("Your Admin Id:"+admin.adminId);
          //window.location.reload();
          swal(
            "Form Submitted!",
            "Your Admin Id is:" + admin.adminId,
            "success"
          ).then(function () {
            window.location = "/collegeadmin";
          });
        });
    } else {
      swal("Form has errors!", "Resubmit Form!", "error");
    }
  };

  render() {
    if (sessionStorage.adminId == null) {
      window.location = "collegeadmin";
    } else {
      return (
        <div className="alert alert-warning text-center m-5 p-5 shadow">
          <h1>Admin Registration Form</h1>
          <form onSubmit={this.handleSubmit}>
            <label for="fname">
              <b>First Name</b>
            </label>
            <h3>
              <input
                ref="fname"
                type="text"
                onChange={(e) =>
                  (this.state.myAdminFormD.firstName = e.target.value)
                }
              />
            </h3>
            <span style={{ color: "red" }}>{this.state.errors["fname"]}</span>
            <br />

            <label for="lname">
              <b>Last Name</b>
            </label>
            <h3>
              <input
                type="text"
                onChange={(e) =>
                  (this.state.myAdminFormD.lastName = e.target.value)
                }
              />
            </h3>
            <span style={{ color: "red" }}>{this.state.errors["lname"]}</span>
            <br />
            <label for="password">
              <b>Password</b>
            </label>
            <h3>
              <input
                type="password"
                onChange={(e) =>
                  (this.state.myAdminFormD.password = e.target.value)
                }
              />
            </h3>

            <br />
            <button
              className="btn btn-primary btn-lg btn-block shadow"
              type="submit"
            >
              Submit
            </button>
            <br />
            <button
              type="reset"
              className="btn btn-primary btn-lg btn-block shadow"
            >
              Cancel
            </button>
            {/* <input type="submit" value="Apply" /> */}
          </form>
        </div>
      );
    }
  }
}

export default RegisterAdmin;
