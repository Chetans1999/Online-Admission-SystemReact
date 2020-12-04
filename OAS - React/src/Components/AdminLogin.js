import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

class AdminLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      adminList: {
        adminId: 0,
        firstName: "",
        lastName: "",
        password: 0,
      },
      // this.onSubmit = this.onSubmit.bind(this);
    };
  }
  // componentDidMount() {
  //     const id = this.props.location.state.currApliId;
  //     console.log(id);
  //     // const id = 32;
  //     axios
  //       .get(`http://localhost:8080/application/getbyapplicationid/${id}`)
  //       .then((res) => {
  //         const application = res.data;
  //         this.setState({ applicationList: application });
  //       });
  //   }

  handleSubmit = (e) => {
    e.preventDefault();

    axios
      .get(
        `http://localhost:8082/admins/login/${this.state.adminList.adminId}/${this.state.adminList.password}`
      )
      .then((response) => {
        const admin = response.data;
        this.setState({ adminList: admin });
        console.log(this.state.adminList);

        if (this.state.adminList != null) {
          // sessionStorage.setItem('adminId', this.state.adminList.adminId);
          sessionStorage.setItem("adminId", this.state.adminList.adminId);
          console.log(sessionStorage.adminId);
          window.location = "/collegeadmin";
        } else {
          alert("Admin doesn't Exist");
          window.location.reload();
        }
      });
  };

  render() {
    return (
      <div className="container">
        <h1 className="alert alert-warning text-center m-5 p-5 shadow">
          <p>Admin Login Form</p>
          <form onSubmit={this.handleSubmit}>
            <label for="adminId">
              <h6>Admin Id</h6>
            </label>
            <h3>
              <input
                type="number"
                onChange={(e) =>
                  (this.state.adminList.adminId = e.target.value)
                }
                required
              />
            </h3>
            <label for="password">
              <h6>Password</h6>
            </label>
            <h3>
              <input
                type="password"
                onChange={(e) =>
                  (this.state.adminList.password = e.target.value)
                }
                required
              />
            </h3>

            <br />

            <button
              className="btn btn-success btn-lg mx-4 shadow"
              type="submit"
            >
              Login
            </button>

            <button type="reset" className="btn btn-danger btn-lg  mx-4 shadow">
              Cancel
            </button>
          </form>
        </h1>
      </div>
    );
  }
}

export default AdminLogin;
