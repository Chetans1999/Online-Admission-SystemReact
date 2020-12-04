import React, { Component } from "react";
import NavbarUser from "./NavbarUser";
import { Link, Switch, Route } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";

// import ViewDocument from './ViewDocument';

class DocumentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      myFormD: {
        applicationId: this.props.location.state.currApplid,
        documentName: "",
        documentUrl: "",
        emailId: this.props.location.state.currEmail,
        documentStatus: "Uploaded",
      },
      errors: {},
    };
  }
  handleValidation() {
    let myFormD = this.state.myFormD;
    let errors = {};
    let formIsValid = true;

    if (!myFormD["documentName"]) {
      formIsValid = false;
      errors["documentName"] = "Cannot be empty";
    }
    if (typeof myFormD["documentName"] !== "undefined") {
      if (!myFormD["documentName"].match(/^[a-zA-Z]+$/)) {
        formIsValid = false;
        errors["documentName"] = "Only letters";
      }
    }
    if (!myFormD["documentUrl"]) {
      formIsValid = false;
      errors["documentUrl"] = "Cannot be empty";
    }

    this.setState({ errors: errors });
    return formIsValid;
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.handleValidation()) {
      console.log(this.state.myFormD);
      var resp = axios.post(
        "http://localhost:8082/document/new",
        this.state.myFormD
      );
      swal("Form Submitted!", "Document Submitted", "success").then(
        function () {
          window.location = "/ViewApplication";
        }
      );
    } else {
      alert("Form has errors.");
    }
  };

  render() {
    if (sessionStorage.userId == null) {
      window.location = "login";
    } else {
      return (
        <div className="container">
          <h1 className="alert alert-warning text-center m-5 p-5 shadow">
            <form onSubmit={this.handleSubmit}>
              {/* <label for="documentId">
                  <h6>document Id</h6>
                </label>
                <h3>
                  <input
                    type="number"
                    required="true"
                    onChange={(e) =>
                      (this.state.myFormD.documentId = e.target.value) //sessionStorage.userId
                    }
                  />
                </h3> */}
              <h3> Document Form</h3>
              <label for="applicationId">
                <h6>Application Id</h6>
              </label>
              <h3>{this.props.location.state.currApplid}</h3>
              <label for="emailId">
                <h6>Email Id</h6>
              </label>
              <h3>{this.props.location.state.currEmail}</h3>

              <label for="dname">
                <h6>Document Name</h6>
              </label>
              <h3>
                <input
                  type="text"
                  required="true"
                  onChange={(e) =>
                    (this.state.myFormD.documentName = e.target.value)
                  }
                />
              </h3>
              <label for="documenturl">
                <h6>Document URL</h6>
              </label>
              <h3>
                <input
                  type="url"
                  required="true"
                  onChange={(e) =>
                    (this.state.myFormD.documentUrl = e.target.value)
                  }
                />
              </h3>

              <br />
              <button
                className="btn btn-primary btn-lg btn-block shadow"
                type="submit"
              >
                Submit
              </button>
              <button
                type="reset"
                className="btn btn-primary btn-lg btn-block shadow"
              >
                Cancel
              </button>
            </form>
          </h1>

          <br />
        </div>
      );
    }
  }
}

export default DocumentForm;
