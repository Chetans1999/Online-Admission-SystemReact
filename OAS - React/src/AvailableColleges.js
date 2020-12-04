import React from "react";
import axios from "axios";
import { Link, Switch, Route } from "react-router-dom";

class AvailableColleges extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collegeList: [],
      courseName: "",
    };
  }

  componentDidMount() {
    this.state.courseName = this.props.location.state.crsName;
    axios
      .get(
        `http://localhost:8082/colleges/getByCourseName/${this.state.courseName}`
      )
      .then((res) => {
        const college = res.data;
        this.setState({ collegeList: college });
        console.log("===================", this.state.collegeList);
      });
    this.setState({ courseName: this.props.location.state.crsName });
  }

  render() {
    if (sessionStorage.userId == null) {
      window.location = "login";
    } else {
      return (
        <div>
          <div class="jumbotron">
            <h1 class="display-4">{this.state.courseName}</h1>
            <p class="lead"></p>
            <hr class="my-4" />
            <p>
              Showing list of all the Colleges available in{" "}
              {this.state.courseName}
            </p>
            <Link class="btn btn-primary btn-lg" to="college">
              Explore All Colleges<i className="fa fa-rocket ml-2"></i>
            </Link>
          </div>
          <div className="row bg-info p-3">
            {this.state.collegeList.map((n) => (
              <div className="col-sm-4 col-md-4 p-2">
                <div className="bg-white border shadow-sm text-left p-3 rounded">
                  <h3 className="">{n.collegeName}</h3>
                  <footer>
                    <cite title="Source Title">Address</cite>
                  </footer>
                  <cite title="Source Title" className="blockquote-footer">
                    {n.collegeAddress.city +
                      ", " +
                      n.collegeAddress.state +
                      ", " +
                      n.collegeAddress.country +
                      ", ZipCode-" +
                      n.collegeAddress.zipcode +
                      ", Landmark- " +
                      n.collegeAddress.landmark}
                  </cite>
                  <div className="mt-4">
                    <b>Courses Offered:</b>
                    {n.courseList.map((m) => (
                      <span className="badge badge-primary ml-3">
                        {m.courseName}
                      </span>
                    ))}
                  </div>
                  <Link to="/application">
                    <button className="btn btn-info mt-4">
                      Take Admission
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }
  }
}

export default AvailableColleges;
