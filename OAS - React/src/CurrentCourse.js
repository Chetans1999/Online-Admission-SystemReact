import React from "react";
import axios from "axios";
import { Link, Switch, Route } from "react-router-dom";

class CurrentCourse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      courseList: [],
    };
  }

  componentDidMount() {
    const id = this.props.location.state.currCollId;
    axios
      .get(`http://localhost:8082/courses/getByCollegeId/${id}`)
      .then((res) => {
        const course = res.data;
        this.setState({ courseList: course });
      });
  }

  render() {
    if (sessionStorage.userId == null) {
      window.location = "login";
    } else {
      return (
        <div className="container m-4 mx-auto" style={{ textAlign: "center" }}>
          <h3 className="alert alert-danger shadow">
            Available Courses in {this.props.location.state.currCollName}
          </h3>
          <table className="table table-dark rounded shadow">
            <thead>
              <th>Name</th>
              <th>Description</th>
              <th>Eligibility</th>
              <th>View Branches</th>
            </thead>
            {this.state.courseList.map((n) => (
              <tr>
                <td>{n.courseName}</td>
                <td>{n.description}</td>
                <td>{n.eligibility}</td>
                <td>
                  <Link
                    to={{
                      pathname: "branch",
                      state: {
                        currCrsId: n.courseId,
                        currCrsName: n.courseName,
                      },
                    }}
                  >
                    <button className="btn btn-primary btn-md">
                      View Branches
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

export default CurrentCourse;
