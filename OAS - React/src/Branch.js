import React from "react";
import axios from "axios";

class Branch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      branchList: [],
    };
  }

  componentDidMount() {
    const id = this.props.location.state.currCrsId;
    axios
      .get(`http://localhost:8082/branches/getByCourseId/${id}`)
      .then((res) => {
        const branch = res.data;
        this.setState({ branchList: branch });
      });
  }

  render() {
    if (sessionStorage.userId == null) {
      window.location = "login";
    } else {
      return (
        <div className="container m-4 mx-auto" style={{ textAlign: "center" }}>
          <h3 className="alert alert-warning shadow">
            Branches Available in {this.props.location.state.currCrsName}
          </h3>
          <table className="table table-dark rounded shadow">
            <thead>
              <th>Name</th>
              <th>Description</th>
            </thead>
            {this.state.branchList.map((n) => (
              <tr>
                <td>{n.branchName}</td>
                <td>{n.branchDescription}</td>
              </tr>
            ))}
          </table>
        </div>
      );
    }
  }
}

export default Branch;
