import React from "react";
import { Link } from "react-router-dom";
import Logo from "./lg.png";
import Profile from "./profile2.png";
class NavbarAdmin extends React.Component {
  constructor(props) {
    super(props);
  }

  onClickLogout() {
    sessionStorage.removeItem("adminId");
    // window.location="/currentcourse";
    window.location.reload();
  }

  render() {
    if (
      sessionStorage.userId == undefined &&
      sessionStorage.adminId !== undefined
    ) {
      return (
        <nav className="navbar navbar-expand-lg sticky-top navbar-light bg-secondary shadow">
          <Link to="/collegeadmin" className="navbar-brand text-light">
            <img className="image" src={Logo} width="50px" />
            <b>Online Admission System</b>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav ml-auto p-4">
              <li className="nav-item">
                <Link className="nav-link text-light" to="/collegeadmin">
                  Colleges
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-light" to="/courseadmin">
                  Course
                </Link>
              </li>
              {/* <li className="nav-item">
                      <Link className="nav-link text-light" to="/branchadmin">Branch</Link>
                  </li> */}
              {/* <li className="nav-item active">
                      <Link className="nav-link text-light" to="/programadmin">Programs<span className="sr-only">(current)</span></Link>
                  </li> */}
              <li className="nav-item">
                <Link className="nav-link text-light" to="/applicationadmin">
                  Application
                </Link>
              </li>
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle text-light"
                  id="navbarDropdownMenuLink"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <img className="image" src={Profile} width="30px" />
                </Link>
                <div
                  className="dropdown-menu ml-auto"
                  aria-labelledby="navbarDropdownMenuLink"
                >
                  <Link
                    className="dropdown-item"
                    to="/login"
                    onClick={this.onClickLogout}
                  >
                    Logout
                  </Link>
                  <Link className="dropdown-item" to="/RegisterAdmin">
                    Register More Admin
                  </Link>
                </div>
              </li>
            </ul>
          </div>
        </nav>
      );
    } else {
      return null;
    }
  }
}

export default NavbarAdmin;
