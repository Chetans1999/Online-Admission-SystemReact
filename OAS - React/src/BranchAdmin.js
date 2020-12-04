import React from "react";
import axios from "axios";
import { Link, Switch, Route } from "react-router-dom";

class BranchAdmin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      branchList: [],
      search: "",
    };
  }

  componentDidMount() {
    axios.get("http://localhost:8082/fbranches/all").then((res) => {
      const branch = res.data;
      this.setState({ branchList: branch });
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

      const filteredBranches = this.state.branchList.filter((branch) => {
        return (
          branch.branchName.toLowerCase().indexOf(search.toLowerCase()) !== -1
        );
      });

      return (
        <div>
          <input
            className="form-control container shadow m-4"
            type="text"
            placeholder="Type Branch Name to Search..."
            aria-label="Search"
            onChange={this.onChange}
          />
          <Link to="createbranch">
            <button className="btn btn-danger m-4 shadow">Add Branch</button>
          </Link>
          <h3 className="alert alert-warning" style={{ textAlign: "center" }}>
            Branch Table
          </h3>
          <table className="table table-dark" style={{ textAlign: "center" }}>
            <thead>
              <th>Name</th>
              <th>Description</th>
              <th>Update</th>
            </thead>
            {filteredBranches.map((n) => (
              <tr>
                <td>{n.branchName}</td>
                <td>{n.branchDescription}</td>
                <td>
                  <Link
                    to={{
                      pathname: "updatebranchform",
                      state: { currBrId: n.branchId },
                    }}
                  >
                    <button className="btn btn-primary btn-lg shadow-lg">
                      Update
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

export default BranchAdmin;
