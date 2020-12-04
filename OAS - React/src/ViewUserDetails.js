import React from "react";
import axios from "axios";
import { Link, Switch, Route } from "react-router-dom";

class ViewUserDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: 0,
      firstname: "",
      middlename: "",
      lastname: "",
      email: "",
      mobileNumber: 0,
      aadharcardNumber: 0,
      password: "",
      userList: [],
    };
  }
  componentDidMount() {
    const id = sessionStorage.userId;
    axios.get(`http://localhost:8082/users/get/${id}`).then((res) => {
      const user = res.data;
      this.setState({ userList: user });
      // console.log( "xyz",this.state.applicationList);
    });
  }

  render() {
    if (sessionStorage.userId == null) {
      window.location = "login";
    } else {
      return (
        <div>
          <div className="container bg-dark m-5 p-2 mx-auto text-white">
            <h1>ViewProfile</h1>
          </div>

          <div className="m-5 p-2 container bg-info text-white mx-auto shadow  ">
            <center>
              <table>
                <tr>
                  <td>
                    {" "}
                    <label>
                      <h3>UserId :</h3>
                    </label>
                  </td>
                  <td>
                    <input value={this.state.userList.userId}></input>
                  </td>
                </tr>

                <tr>
                  <td>
                    {" "}
                    <label>
                      <h3>First Name :</h3>
                    </label>
                  </td>

                  <td>
                    <input value={this.state.userList.firstName}></input>
                  </td>
                </tr>
                <tr>
                  <td>
                    {" "}
                    <label>
                      <h3>Middle Name :</h3>
                    </label>
                  </td>
                  <td>
                    <input value={this.state.userList.middleName}></input>
                  </td>
                </tr>
                <tr>
                  <td>
                    {" "}
                    <label>
                      <h3>Last Name :</h3>
                    </label>
                  </td>
                  <td>
                    <input value={this.state.userList.lastName}></input>
                  </td>
                </tr>
                <tr>
                  <td>
                    {" "}
                    <label>
                      {" "}
                      <h3>Email :</h3>
                    </label>
                  </td>
                  <td>
                    {" "}
                    <input value={this.state.userList.email}></input>
                  </td>
                </tr>
                <tr>
                  <td>
                    {" "}
                    <label>
                      <h3>Mobile Number :</h3>
                    </label>
                  </td>
                  <td>
                    <input value={this.state.userList.mobileNumber}></input>
                  </td>
                </tr>
                <tr>
                  <td>
                    {" "}
                    <label>
                      <h3>Aadharcard Number :</h3>
                    </label>
                  </td>
                  <td>
                    <input value={this.state.userList.aadharCardNo}></input>
                  </td>
                </tr>
              </table>
            </center>
            <br />
            <Link
              to={{
                pathname: "UpdateUserDetails",
              }}
            >
              <button className="btn btn-warning btn-lg" type="submit">
                Update User Details
              </button>
            </Link>
          </div>
        </div>
      );
    }
  }
}

export default ViewUserDetails;
