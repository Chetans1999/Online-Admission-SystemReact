import React from "react";
import axios from "axios";
import { Link, Switch, Route } from "react-router-dom";
import ViewApplication from "./ViewApplication";
import swal from "sweetalert";

class ApplicationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      myFormD: {
        applicationId: 0,
        userId: sessionStorage.userId,
        applicantFullName: "",
        dateOfBirth: "",
        highestQualification: "",
        finalYearPercentage: 0,
        goals: "",
        emailId: "",
        courseName: "",
        collegeName: "",
        applicationStatus: "Pending",
      },
      courseList: [],
      collegeList: [],
      colName: "",
      crsList: {},
      crsName: "",
      errors: "",
    };
    // this.handleChange = this.handleChange.bind(this);
  }

  handleValidation() {
    let fields = this.state.myFormD;
    let errors = {};
    let formIsValid = true;

    if (!fields["applicantFullName"].match(/^[a-zA-Z\s]+$/)) {
      formIsValid = false;
      errors["fname"] = "Cannot Be Empty and Only Characters";
    }

    if (!fields["goals"].match(/^[a-zA-Z\s]+$/)) {
      formIsValid = false;
      errors["goals"] = "Cannot Be Empty and Only Characters";
    }

    if (!fields["email"].match(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/)) {
      formIsValid = false;
      errors["email"] = "Email is not Valid";
    }

    // if (typeof fields["finalYearPercentage"] !== "undefined") {
    //   if (!fields["finalYearPercentage"].match(/[+]?([0-9]*[.])?[0-9]+/)) {
    //     formIsValid = false;
    //     errors["finper"] = "Cannot Be Empty or Invalid";
    //   }
    // }

    this.setState({ errors: errors });
    return formIsValid;
  }

  componentDidMount() {
    //Make course to fcourse IMPORTANT after INTEGRATION
    axios.get(`http://localhost:8082/fcourses/all`).then((res) => {
      const course = res.data;
      this.setState({ courseList: course });
    });
  }

  handleChange = (e) => {
    let value = Array.from(e.target.selectedOptions, (option) => option.value);
    console.log("==========", e.target.selectedOptions);
    value.forEach((element) => {
      this.state.crsList = this.state.courseList[element];
      console.log(this.state.crsList);
      this.state.crsName = this.state.crsList.courseName;
      console.log(this.state.crsName);
      this.state.myFormD.courseName = this.state.crsName;
      axios
        .get(
          `http://localhost:8082/colleges/getByCourseName/${this.state.crsName}`
        )
        .then((res) => {
          const college = res.data;
          this.setState({ collegeList: college });
          console.log("college----------", this.state.collegeList);
        });
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    if (this.handleValidation()) {
      this.state.myFormD.collegeName = this.state.colName;
      var resp = axios.post(
        "http://localhost:8082/application/new",
        this.state.myFormD
      );
      swal(
        "Application added successfully!",
        "task accomplished!",
        "success"
      ).then(function () {
        window.location = "/ViewApplication";
      });
    } else {
      swal("Form has errors!", "Resubmit Form!", "error");
    }
  };

  render() {
    if (sessionStorage.userId == null) {
      window.location = "login";
    } else {
      return (
        <div
          className="alert alert-primary text-center m-5 p-5 shadow"
          style={{ textAlign: "center" }}
        >
          <h1>
            <u>Application Form</u>
          </h1>
          <br />
          <form onSubmit={this.handleSubmit}>
            <label for="fname">
              <b>Full Name*</b>
            </label>
            <h3>
              <input
                type="text"
                onChange={(e) =>
                  (this.state.myFormD.applicantFullName = e.target.value)
                }
              />
            </h3>
            <span style={{ color: "red" }}>{this.state.errors["fname"]}</span>
            <br />
            <label for="dob">
              <b>Date of Birth*</b>
            </label>
            <h3>
              <input
                type="date"
                onChange={(e) =>
                  (this.state.myFormD.dateOfBirth = e.target.value)
                }
              />
            </h3>
            <label for="hquali">
              <b>Highest Qualification*</b>
            </label>
            <h6>
              <input
                type="radio"
                value="Intermediate"
                onChange={(e) =>
                  (this.state.myFormD.highestQualification = e.target.value)
                }
              />
              Intermediate
              <br />
              <input
                type="radio"
                value="Under Graduate"
                onChange={(e) =>
                  (this.state.myFormD.highestQualification = e.target.value)
                }
              />
              Under Graduate
              <br />
              <input
                type="radio"
                value="Post Graduate"
                onChange={(e) =>
                  (this.state.myFormD.highestQualification = e.target.value)
                }
              />
              Post Graduate
              <br />
              {/* <input type="text" id="hquali" name="hquali" /> */}
            </h6>
            <label for="finper">
              <b>Final Year Percentage*</b>
            </label>
            <h3>
              <input
                type="number"
                onChange={(e) =>
                  (this.state.myFormD.finalYearPercentage = e.target.value)
                }
              />
            </h3>
            <label for="goals">
              <b>Goals*</b>
            </label>
            <h3>
              <input
                type="text"
                onChange={(e) => (this.state.myFormD.goals = e.target.value)}
              />
            </h3>
            <span style={{ color: "red" }}>{this.state.errors["goals"]}</span>
            <br />
            <label for="emailid">
              <b>Email Id*</b>
            </label>
            <h3>
              <input
                type="email"
                onChange={(e) => (this.state.myFormD.emailId = e.target.value)}
              />
            </h3>
            <span style={{ color: "red" }}>{this.state.errors["email"]}</span>
            <br />
            <label>
              <b>Select Course*</b>
            </label>
            <br />
            <select
              className="mb-3"
              onChange={this.handleChange.bind(this)}
              style={{ width: "20%" }}
              required
            >
              {this.state.courseList.map((n, i) => (
                <option value={i}>{n.courseName}</option>
              ))}
            </select>
            <br />
            <label for="collegename">
              <b>Select College*</b>
            </label>
            <br />
            <select className="mb-4" style={{ width: "20%" }}>
              {this.state.collegeList.map((n) => (
                <option
                  key={n.collegeId}
                  value={n.collegeName}
                  onClick={(this.state.colName = n.collegeName)}
                >
                  {n.collegeName}
                </option>
              ))}
            </select>
            <br />
            <button
              className="btn btn-primary mx-4 btn-md shadow"
              type="submit"
            >
              Submit
            </button>
            <button type="reset" className="btn btn-danger mx-4 btn-md shadow">
              Cancel
            </button>
            {/* <input type="submit" value="Apply" /> */}
          </form>

          <br />
          {/* <Link
            to={{
              pathname: "ViewApplication",
              state: {
                currApliId: sessionStorage.userId,
              },
            }}
          >
            <button className="btn btn-warning btn-lg shadow">
              View Application
            </button>
          </Link> */}
        </div>
      );
    }
  }
}

export default ApplicationForm;
