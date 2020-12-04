import React from "react";
import axios from "axios";
import { Link, Switch, Route } from "react-router-dom";
import NavbarUser from "./NavbarUser";

class ViewDocument extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //    documentList: {
      //       documentId: 0,
      //       documentName: "",
      //       documentUrl: "",
      //       emailId: "",
      //       documentStatus: "Uploaded",
      //     },
      document: [],
    };
  }
  componentDidMount() {
    const id = this.props.location.state.currApplid;
    console.log(id);
    // const id = 32;
    axios
      .get(`http://localhost:8082/document/getbyaplicationid/${id}`)
      .then((res) => {
        const doc = res.data;
        console.log("====", doc);
        this.setState({ document: doc });
        console.log(document);
      });
  }
  render() {
    if (sessionStorage.userId == null) {
      window.location = "login";
    } else {
      return (
        <div style={{ textAlign: "center" }}>
          <h3 className="alert alert-danger">Document Table</h3>
          <table className="table table-dark">
            <thead>
              <th>Application Id</th>
              <th>Document Name</th>
              <th>Document URL</th>
              <th>Email</th>
              <th>Document Status</th>
            </thead>
            {this.state.document.map((n) => (
              <tr>
                <td>{this.props.location.state.currApplid}</td>
                <td>{n.documentName}</td>
                <td>{n.documentUrl}</td>
                <td>{n.emailId}</td>
                <td>{n.documentStatus}</td>
              </tr>
            ))}
          </table>
        </div>
      );
    }
  }
}

export default ViewDocument;
