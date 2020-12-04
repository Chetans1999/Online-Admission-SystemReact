import React from "react";
import axios from "axios";
import swal from "sweetalert";

class CollegeForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        collegeName: "",
        collegeAddress: {
          city: "",
          district: "",
          state: "",
          country: "",
          zipcode: "",
          landmark: "",
        },
        courseList: [],
        programList: [],
      },
      crsList: [],
      pgmList: [],
    };
  }

  componentDidMount() {
    axios.get("http://localhost:8082/fcourses/all").then((res) => {
      const course = res.data;
      this.setState({ crsList: course });
    });
    axios.get("http://localhost:8082/fprogram/all").then((res) => {
      const program = res.data;
      this.setState({ pgmList: program });
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if (window.confirm("!Are you sure you want to add this College?")) {
      console.log(
        "----------------------------------------------------",
        this.state.formData
      );
      this.state.formData.courseList.forEach((i) => {
        delete i["courseId"];
        i["branches"].forEach((j) => {
          delete j["branchId"];
        });
      });

      this.state.formData.programList.forEach((i) => {
        delete i["programId"];
      });

      axios.post("http://localhost:8082/colleges/new", this.state.formData);
      swal("College added successfully!", "task accomplished!", "success").then(
        function () {
          window.location = "/collegeadmin";
        }
      );
      console.log(
        "----------------------------------------------------",
        this.state.formData
      );
    }
  };

  handleChange1 = (e) => {
    let value = Array.from(e.target.selectedOptions, (option) => option.value);
    // this.setState({branchIdList: value});
    value.forEach((element) => {
      this.state.formData.courseList.push(this.state.crsList[element]);
    });
  };

  handleChange2 = (e) => {
    let value = Array.from(e.target.selectedOptions, (option) => option.value);
    // this.setState({branchIdList: value});
    value.forEach((element) => {
      this.state.formData.programList.push(this.state.pgmList[element]);
    });
  };

  render() {
    if (sessionStorage.adminId == null) {
      window.location = "adminlogin";
    } else {
      return (
        <div className="row p-5 bg-info" style={{ textAlign: "justify" }}>
          <div className="col-sm-12 col-md-8 offset-2 bg-white shadow-sm p-3">
            <h6 className="text-secondary">Create New College</h6>
            <form onSubmit={this.handleSubmit} className="row p-3">
              <div className="form-group col-12">
                <label>
                  <b>College Name*</b>
                </label>
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) =>
                    (this.state.formData.collegeName = e.target.value)
                  }
                  required
                />
              </div>
              <div className="form-group col-12">
                <label>
                  <b>Address Details*</b>
                </label>
                <div className="row">
                  <div className="col-3 mb-2">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Country"
                      required
                      onChange={(e) =>
                        (this.state.formData.collegeAddress.country =
                          e.target.value)
                      }
                      required
                    />
                  </div>
                  <div className="col-3 mb-2">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="State"
                      required
                      onChange={(e) =>
                        (this.state.formData.collegeAddress.state =
                          e.target.value)
                      }
                      required
                    />
                  </div>
                  <div className="col-3 mb-2">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="District"
                      required
                      onChange={(e) =>
                        (this.state.formData.collegeAddress.district =
                          e.target.value)
                      }
                      required
                    />
                  </div>
                  <div className="col-3 mb-2">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="City"
                      required
                      onChange={(e) =>
                        (this.state.formData.collegeAddress.city =
                          e.target.value)
                      }
                      required
                    />
                  </div>
                  <div className="col-3 mb-2">
                    <input
                      className="form-control"
                      type="number"
                      placeholder="Zipcode"
                      required
                      onChange={(e) =>
                        (this.state.formData.collegeAddress.zipcode =
                          e.target.value)
                      }
                      required
                    />
                  </div>
                  <div className="col-9 mb-2">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Landmark"
                      required
                      onChange={(e) =>
                        (this.state.formData.collegeAddress.landmark =
                          e.target.value)
                      }
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="col-6">
                <label>
                  <b>Select Courses*</b>
                </label>
                <br />
                <select
                  onChange={this.handleChange1}
                  multiple
                  style={{ width: "100%" }}
                  required
                >
                  {this.state.crsList.map((n, i) => (
                    <option value={i}>{n.courseName}</option>
                  ))}
                </select>
              </div>
              <div className="col-6"></div>
              {/* <div className="col-6 mt-3">
                            <label><b>Select Program for the Courses*</b></label><br/>
                            <select onChange={this.handleChange2} style={{width: '100%'}} required>
                                {
                                    this.state.pgmList.map((n, i)=><option value={i}>{n.programName}</option>)
                                }
                            </select>                             
                        </div> */}
              <div className="col-12 mt-4">
                <input
                  type="submit"
                  className="btn btn-dark shadow btn-block"
                />
              </div>
            </form>
          </div>
        </div>
      );
    }
  }
}

export default CollegeForm;
