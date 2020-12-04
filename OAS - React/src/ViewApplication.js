import React from "react";
import axios from "axios";
import { Link, Switch, Route } from "react-router-dom";

class ViewApplication extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      applicationList: [],
    };
  }

  componentDidMount() {
    const id = sessionStorage.userId;
    console.log(id);
    // const id = 32;
    axios
      .get(`http://localhost:8082/application/getbyuserid/${id}`)
      .then((res) => {
        const application = res.data;
        this.setState({ applicationList: application });
        console.log(this.state.applicationList);
      });
  }

  render() {
    if (sessionStorage.userId == null) {
      window.location = "login";
    } else {
      return (
        <div style={{ textAlign: "center" }}>
          <h3 className="alert alert-danger">Application Table</h3>
          <table className="table table-dark">
            <thead>
              <th>Application Id</th>
              <th>UserId</th>
              <th>Full Name</th>
              <th>Date Of Birth</th>
              <th>Highest Qualification</th>
              <th>Final Year Percentage</th>
              <th>Goals</th>
              <th>Email</th>
              <th>Course Name</th>
              <th>College Name</th>
              <th>Application Status</th>
              <th>Make Payment</th>
              <th>Add Document</th>
              <th>View Document</th>
            </thead>
            {this.state.applicationList.map((n) => (
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
                  <Link
                    to={{
                      pathname: "payment",
                      state: {
                        currApplid: n.applicationId,
                        currEmail: n.emailId,
                      },
                    }}
                  >
                    <button
                      className="btn btn-success btn-sm shadow"
                      disabled={
                        n.applicationStatus == "Approved" ? false : true
                      }
                    >
                      Make Payment
                    </button>
                  </Link>
                </td>
                <td>
                  <Link
                    to={{
                      pathname: "DocumentForm",
                      state: {
                        currApplid: n.applicationId,
                        currEmail: n.emailId,
                      },
                    }}
                  >
                    <button
                      className="btn btn-warning btn-sm shadow"
                      disabled={
                        n.applicationStatus == "Approved" ? false : true
                      }
                    >
                      Add Document
                    </button>
                  </Link>
                </td>
                <td>
                  <Link
                    to={{
                      pathname: "ViewDocument",
                      state: { currApplid: n.applicationId },
                    }}
                  >
                    <button
                      className="btn btn-warning btn-sm shadow"
                      disabled={
                        n.applicationStatus == "Approved" ? false : true
                      }
                    >
                      View Document
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </table>
        </div>
      );
    }
  }
}
export default ViewApplication;
