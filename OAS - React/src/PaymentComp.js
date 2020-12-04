import React from "react";
import axios from "axios";
import { Link, Switch, Route } from "react-router-dom";
import swal from "sweetalert";

class PaymentComp extends React.Component {
  constructor(props) {
    super(props);

    // var today = new Date(),
    //  date = today.getFullYear() + '-' + today.getMonth() + '-' + today.getDate();

    this.state = {
      myFormD: {
        emailId: this.props.location.state.currEmail,
        applicationId: this.props.location.state.currApplid,
        paymentAmount: 0,
        paymentDescription: "",
        paymentDate: "",
        paymentStatus: "successful",
      },
    };
    // this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state.myFormD);
    axios.post("http://localhost:8082/payment/new", this.state.myFormD);
    swal("Payment Successful ", "task accomplished!", "success").then(
      function () {
        window.location = "/ViewApplication";
      }
    );
  };

  render() {
    if (sessionStorage.userId == null) {
      window.location = "login";
    } else {
      return (
        <div className="container bg-light text-center m-5 p-5 shadow">
          <div>
            <h1>Payment Form</h1>
          </div>{" "}
          <br />
          <form onSubmit={this.handleSubmit}>
            <label for="email">
              <h3>
                <i>Email Id</i>
              </h3>
            </label>
            <h6>{this.state.myFormD.emailId}</h6>
            <label for="aplliId">
              <h3>
                <i>Application Id</i>
              </h3>
            </label>
            <h6>{this.state.myFormD.applicationId}</h6>
            <label for="PayAmount">
              <h3>
                <i>Payment Amount</i>
              </h3>
            </label>
            <h6>
              <input
                type="number"
                required="true"
                onChange={(e) =>
                  (this.state.myFormD.paymentAmount = e.target.value)
                }
              />
            </h6>
            <label for="payDesc">
              <i>
                {" "}
                <h3>Payment Description</h3>
              </i>
            </label>
            <h6>
              <input
                type="text"
                required="true"
                onChange={(e) =>
                  (this.state.myFormD.paymentDescription = e.target.value)
                }
              />
            </h6>
            <label for="payDate">
              <i>
                {" "}
                <h3>Payment Date</h3>
              </i>
            </label>
            <h6>
              {/* <input  value= {this.state.myFormD.paymentDate} onChange={this.handleChange.bind(this)} 
                    />    */}

              <input
                type="date"
                required="true"
                onChange={(e) =>
                  (this.state.myFormD.paymentDate = e.target.value)
                }
              />
            </h6>

            <br />

            <button className="btn btn-success btn-lg" type="submit">
              Pay
            </button>

            <br />
            <br />
            <button type="reset" className="btn btn-danger btn-lg ">
              Cancel
            </button>
          </form>
          <br />
        </div>
      );
    }
  }
}

export default PaymentComp;
