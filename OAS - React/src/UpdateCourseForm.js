import React from "react";
import axios from "axios";
import swal from "sweetalert";

class UpdateCourseForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      courseForm: "block",
      branchForm: "none",
      courseFormData: {
        courseName: "",
        description: "",
        eligibility: "",
        branches: [],
      },
      branchFormData: {
        branchName: "",
        branchDescription: "",
      },
      branches: [],
      temp: [],
      errors: [],
    };
    this.toggle = this.toggle.bind(this);
    this.handleBranchSubmit = this.handleBranchSubmit.bind(this);
    this.handleCourseSubmit = this.handleCourseSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleValidation() {
    let fields = this.state.myFormD;
    let errors = {};
    let formIsValid = true;

    if (!fields["courseName"].match(/^[a-zA-Z\s]+$/)) {
      formIsValid = false;
      errors["cname"] = "Cannot Be Empty and Only Characters";
    }

    this.setState({ errors: errors });
    return formIsValid;
  }

  componentDidMount() {
    axios.get(`http://localhost:8082/fsepbranches/all`).then((res) => {
      const branch = res.data;
      this.setState({ branches: branch });
      console.log("---------------", this.state.branches);
    });
  }

  handleInputChange(event) {
    const target = event.target;
    var value = target.value;

    if (target.checked) {
      this.state.temp[value] = value;
    } else {
      this.state.temp.splice(value, 1);
    }
  }

  toggle() {
    if (this.state.courseForm === "none" && this.state.branchForm === "block") {
      this.setState({
        courseForm: "block",
        branchForm: "none",
      });
    } else {
      this.setState({
        courseForm: "none",
        branchForm: "block",
      });
    }
  }

  handleBranchSubmit(e) {
    e.preventDefault();
    console.log(this.state.branchFormData);
    var resp = axios.post(
      "http://localhost:8082/fsepbranches/new",
      this.state.branchFormData
    );
    this.toggle();
    window.location.reload();
  }

  handleCourseSubmit(e) {
    e.preventDefault();

    if (this.handleValidation()) {
      this.state.temp.forEach((i) => {
        this.state.courseFormData.branches.push(this.state.branches[i]);
      });
      this.state.courseFormData.branches.forEach((i) => {
        delete i.branchId;
      });
      console.log(this.state.courseFormData);
      let id = this.props.location.state.currCrsId;
      console.log("++++++++++++++++++++++++++++++++++", id);
      var resp = axios.put(
        `http://localhost:8082/fcourses/update/${id}`,
        this.state.courseFormData
      );
      console.log("------------------------+++", resp);
    } else {
      swal("Form has errors!", "Resubmit Form!", "error");
    }
  }

  render() {
    return (
      <div className="p-3 row">
        <div className="col-sm-4 offset-sm-4 p-3 rounded shadow">
          <form
            style={{ display: this.state.courseForm }}
            onSubmit={this.handleCourseSubmit}
          >
            <h3 style={{ textAlign: "center" }}>
              Update Course and Branch Form
            </h3>
            <br />
            <div className="form-group">
              <label>Course Name</label>
              <input
                type="text"
                className="form-control"
                onChange={(e) =>
                  (this.state.courseFormData.courseName = e.target.value)
                }
                required
              />
              <span style={{ color: "red" }}>{this.state.errors["cname"]}</span>
            </div>
            <div className="form-group">
              <label>Course Description</label>
              <textarea
                className="form-control"
                onChange={(e) =>
                  (this.state.courseFormData.description = e.target.value)
                }
                required
              ></textarea>
            </div>
            <div className="form-group">
              <label>Elegibility</label>
              <input
                type="text"
                className="form-control"
                onChange={(e) =>
                  (this.state.courseFormData.eligibility = e.target.value)
                }
                required
              />
            </div>
            <div className="form-group">
              <label>Select Branches</label>
              <div className="row">
                {this.state.branches.map((n, i) => (
                  <div className="col-6">
                    <input
                      type="checkbox"
                      value={i}
                      onChange={this.handleInputChange}
                    />
                    {n.branchName}
                  </div>
                ))}
              </div>
            </div>
            <div className="form-group">
              <input type="submit" className="btn btn-dark" />
              <span
                className="ml-5 text-primary"
                onClick={this.toggle}
                style={{ cursor: "pointer" }}
              >
                Create More Branch
              </span>
            </div>
          </form>
          {/* Branch Form */}
          <form
            style={{ display: this.state.branchForm }}
            onSubmit={this.handleBranchSubmit}
          >
            <div className="form-group">
              <label>Branch Name</label>
              <input
                type="text"
                className="form-control"
                onChange={(e) =>
                  (this.state.branchFormData.branchName = e.target.value)
                }
                required
              />
            </div>
            <div className="form-group">
              <label>Branch Description</label>
              <textarea
                className="form-control"
                onChange={(e) =>
                  (this.state.branchFormData.branchDescription = e.target.value)
                }
                required
              ></textarea>
            </div>
            <div className="form-group">
              <input type="submit" className="btn btn-dark shadow" />
              <span
                className="ml-5"
                onClick={this.toggle}
                style={{ cursor: "pointer" }}
              >
                <small className="text-primary">
                  Don't feel like adding new branch
                </small>
              </span>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default UpdateCourseForm;
