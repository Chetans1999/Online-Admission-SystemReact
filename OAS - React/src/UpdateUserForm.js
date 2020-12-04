import React from "react";
import axios from "axios";
import swal from "sweetalert";

class UpdateUserForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      myFormD: {
        firstName: "",
        middleName: "",
        lastName: "",
        email: "",
        mobileNumber: 0,
        aadharCardNo: 0,
        password: 0,
      },
      errors: [],
    };
    this.update = this.update.bind(this);
  }

  update(e) {
    e.preventDefault();

    if (this.handleValidation()) {
      axios
        .put(
          `http://localhost:8082/users/update/${sessionStorage.userId}`,
          this.state.myFormD
        )
        .then((res) => console.log(res.data));
      swal(
        "Profile Updated Successfully!",
        "task accomplished!",
        "success"
      ).then(function () {
        window.location = "/ViewUserDetails";
      });
    } else {
      alert("Form has errors.");
    }
  }

  handleValidation() {
    let fields = this.state.myFormD;
    let errors = {};
    let formIsValid = true;

    if (!fields["firstName"].match(/^[a-zA-Z\s]+$/)) {
      formIsValid = false;
      errors["fname"] = "Cannot Be Empty and Only Characters";
    }

    if (!fields["middleName"].match(/^[a-zA-Z\s]+$/)) {
      formIsValid = false;
      errors["middleName"] = "Cannot Be Empty and Only Characters";
    }

    if (!fields["lastName"].match(/^[a-zA-Z\s]+$/)) {
      formIsValid = false;
      errors["lastName"] = "Cannot Be Empty and Only Characters";
    }

    if (!fields["mobileNumber"].match(/^\d{10}$/)) {
      formIsValid = false;
      errors["numbers"] = "Mobile Number Is not Valid";
    }

    if (!fields["aadharCardNo"].match(/^\d{12}$/)) {
      formIsValid = false;
      errors["number"] = "Aadhar Number Is not Valid";
    }

    if (!fields["email"].match(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/)) {
      formIsValid = false;
      errors["email"] = "Email is not Valid";
    }

    this.setState({ errors: errors });
    return formIsValid;
  }

  render() {
    if (sessionStorage.userId == null) {
      window.location = "login";
    } else {
      return (
        <div className="alert alert-info text-center m-5 p-5 shadow">
          <h1>Update Registration Form</h1>
          <form onSubmit={this.update}>
            <label for="firstName">
              <b>First Name*</b>
            </label>
            <h3>
              <input
                type="text"
                onChange={(e) =>
                  (this.state.myFormD.firstName = e.target.value)
                }
              />
            </h3>
            <span style={{ color: "red" }}>{this.state.errors["fname"]}</span>
            <br />
            <label for="mname">
              <b>Middle Name*</b>
            </label>
            <h3>
              <input
                type="text"
                onChange={(e) =>
                  (this.state.myFormD.middleName = e.target.value)
                }
              />
            </h3>
            <span style={{ color: "red" }}>
              {this.state.errors["middleName"]}
            </span>
            <br />
            <label for="lname">
              <b>Last Name*</b>
            </label>
            <h3>
              <input
                type="text"
                onChange={(e) => (this.state.myFormD.lastName = e.target.value)}
              />
            </h3>
            <span style={{ color: "red" }}>
              {this.state.errors["lastName"]}
            </span>
            <br />
            <label for="emailid">
              <b>Email Id*</b>
            </label>
            <h3>
              <input
                type="email"
                onChange={(e) => (this.state.myFormD.email = e.target.value)}
              />
            </h3>
            <span style={{ color: "red" }}>{this.state.errors["emailId"]}</span>
            <br />
            <label for="mobilenumber">
              <b>Mobile Number*</b>
            </label>
            <h3>
              <input
                type="number"
                onChange={(e) =>
                  (this.state.myFormD.mobileNumber = e.target.value)
                }
              />
            </h3>
            <span style={{ color: "red" }}>{this.state.errors["numbers"]}</span>
            <br />
            <label for="aadharcardnumber">
              <b>Aadhar Card Number*</b>
            </label>
            <h3>
              <input
                type="number"
                onChange={(e) =>
                  (this.state.myFormD.aadharCardNo = e.target.value)
                }
              />
            </h3>
            <span style={{ color: "red" }}>{this.state.errors["number"]}</span>
            <br />
            <label for="password">
              <b>Password</b>
            </label>
            <h3>
              <input
                type="password"
                onChange={(e) => (this.state.myFormD.password = e.target.value)}
              />
            </h3>

            <br />
            <button
              className="btn btn-success btn-md  mx-3 shadow"
              type="submit"
            >
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
}

export default UpdateUserForm;
