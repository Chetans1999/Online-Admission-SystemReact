import React from "react";
import axios from "axios";
import { Link, Switch, Route } from "react-router-dom";

class CourseAdmin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      courseList: [],
      search: "",
    };
  }

  componentDidMount() {
    axios.get("http://localhost:8082/fcourses/all").then((res) => {
      const course = res.data;
      this.setState({ courseList: course });
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

      const filteredCourses = this.state.courseList.filter((course) => {
        return (
          course.courseName.toLowerCase().indexOf(search.toLowerCase()) !== -1
        );
      });

      return (
        <div style={{ textAlign: "center" }}>
          <input
            className="form-control container shadow mb-4 mt-4"
            type="text"
            placeholder="Type Course Name to Search..."
            aria-label="Search"
            onChange={this.onChange}
          />
          <div className="container">
            <h3
              className="alert alert-danger shadow"
              style={{ textAlign: "center" }}
            >
              Available Courses
            </h3>
            <div style={{ textAlign: "left" }}>
              <Link to="courseform">
                <button className="btn btn-danger m-4 shadow">Add More</button>
              </Link>
            </div>
            <div className="row">
              <table
                className="table table-dark col p-4 shadow rounded-lg"
                style={{ textAlign: "center" }}
              >
                <thead>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Eligibility</th>
                  <th>Update</th>
                </thead>
                {filteredCourses.map((n) => (
                  <tr>
                    <td>{n.courseId}</td>
                    <td>{n.courseName}</td>
                    <td>{n.description}</td>
                    <td>{n.eligibility}</td>
                    <td>
                      <Link
                        to={{
                          pathname: "updatecourseform",
                          state: { currCrsId: n.courseId },
                        }}
                      >
                        <button className="btn btn-primary btn-md shadow-lg">
                          Update/Add More Branches
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </table>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default CourseAdmin;
