import React from "react";
import axios from "axios";
import { Link, Switch, Route } from "react-router-dom";

class ViewAllApplication extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      updateFormData: {
        applicantFullName: "",
        userId: 12, //sessionStorage.userId,
        dateOfBirth: "",
        highestQualification: "",
        finalYearPercentage: 0,
        goals: "",
        emailId: "",
        courseName: "",
        collegeName: "",
        applicationStatus: "",
      },
      applicationId: 0,
      applicationList: [],
      search: "",
    };
  }

  componentDidMount() {
    axios.get("http://localhost:8082/application/all").then((res) => {
      const application = res.data;
      this.setState({ applicationList: application });
    });
  }

  update(e) {
    console.log(e.target.value);
    let id = e.target.value;
    axios
      .get(`http://localhost:8082/application/getbyapplicationid/${id}`)
      .then((res) => {
        const application = res.data;
        application.applicationStatus = "Approved";
        delete application["applicationId"];
        axios
          .put(`http://localhost:8082/application/update/${id}`, application)
          .then((res) => console.log(res.data));
        window.location.reload();
      });
  }

  reject(e) {
    console.log(e.target.value);
    let id = e.target.value;
    axios
      .get(`http://localhost:8082/application/getbyapplicationid/${id}`)
      .then((res) => {
        const application = res.data;
        application.applicationStatus = "Reject";
        delete application["applicationId"];
        console.log(application);
        axios
          .put(`http://localhost:8082/application/update/${id}`, application)
          .then((res) => console.log(res.data));
        window.location.reload();
      });
  }

  onChange = (e) => {
    this.setState({ search: e.target.value });
  };

  render() {
    if (sessionStorage.adminId == null) {
      window.location = "adminlogin";
    } else {
      const { search } = this.state;

      const filteredApplication = this.state.applicationList.filter(
        (application) => {
          return (
            application.applicationStatus
              .toLowerCase()
              .indexOf(search.toLowerCase()) !== -1
          );
        }
      );
      return (
        <div style={{ textAlign: "center" }}>
          <input
            className="form-control container shadow m-4"
            type="text"
            placeholder="Type Application Status to Search..."
            aria-label="Search"
            onChange={this.onChange}
          />
          <h3 className="alert alert-danger">Applications</h3>
          <table className="table table-dark">
            <thead>
              <th>Application Id</th>
              <th>User Id</th>
              <th>Full Name</th>
              <th>Date Of Birth</th>
              <th>Highest Qualification</th>
              <th>Final Year Percentage</th>
              <th>Goals</th>
              <th>Email</th>
              <th>Course Name</th>
              <th>College Name</th>
              <th>Application Status</th>
              {/* <th>View Payment</th> */}
            </thead>
            {/* {this.state.applicationList.map((n) => ( */}
            {filteredApplication.map((n) => (
              <tr>
                <td>{n.applicationId}</td>
                <td>{n.userId}</td>
                <td>{n.applicantFullName}</td>
                <td>{n.dateOfBirth}</td>
                <td>{n.highestQualification}</td>
                <td>{n.finalYearPercentage}</td>
                <td>{n.goals}</td>
                <td>{n.emailId}</td>
                <td>{n.courseName}</td>
                <td>{n.collegeName}</td>
                <td>{n.applicationStatus}</td>
                <td>
                  <button
                    className="btn btn-success"
                    onClick={this.update}
                    value={n.applicationId}
                    disabled={n.applicationStatus == "Approved" ? true : false}
                  >
                    Approve
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    value={n.applicationId}
                    onClick={this.reject}
                    disabled={n.applicationStatus == "Reject" ? true : false}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </table>
        </div>
      );
    }
  }
}
export default ViewAllApplication;
