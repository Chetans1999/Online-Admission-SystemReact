import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userList: {
        userId: 0,
        firstName: "",
        middleName: "",
        lastName: "",
        email: "",
        mobileNumber: 0,
        aadharCardNo: 0,
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
  //       .get(`http://localhost:8082/application/getbyapplicationid/${id}`)
  //       .then((res) => {
  //         const application = res.data;
  //         this.setState({ applicationList: application });
  //       });
  //   }

  handleSubmit = (e) => {
    e.preventDefault();

    // const id=12;
    // const pass="mayank";

    // + this.state.userList.userId + '/' + this.state.userList.password ;
    axios
      .get(
        `http://localhost:8082/users/login/${this.state.userList.userId}/${this.state.userList.password}`
      )
      .then((response) => {
        const user = response.data;
        this.setState({ userList: user });
        console.log(this.state.userList);

        if (this.state.userList != null) {
          sessionStorage.setItem("userId", this.state.userList.userId);
          // alert("User doesn't Exist")
          window.location = "college";
          // window.location.reload();
        } else {
          alert("User doesn't Exist");
          window.location.reload();
        }
      });
  };

  render() {
    return (
      <div className="alert alert-warning text-center m-5 p-5 shadow">
        <h1>Login Form</h1>
        <form onSubmit={this.handleSubmit}>
          <label for="userId">
            <br />
            <b>User Id</b>
          </label>
          <h3>
            <input
              type="number"
              onChange={(e) => (this.state.userList.userId = e.target.value)}
              required
            />
          </h3>
          <label for="password">
            <b>Password</b>
          </label>
          <h3>
            <input
              type="password"
              onChange={(e) => (this.state.userList.password = e.target.value)}
              required
            />
          </h3>

          <br />

          <button className="btn btn-success btn-lg mx-4 shadow" type="submit">
            Login
          </button>
          <button type="reset" className="btn btn-danger btn-lg mx-4 shadow">
            Cancel
          </button>
        </form>

        {/* <div>{this.state.userList.firstName}</div> */}
      </div>
    );
  }
}

export default Login;
