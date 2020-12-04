import React from "react";
import { Table } from "reactstrap";

const ContactUs = () => {
  return (
    <div>
      <Table striped bordered>
        <thead>
          <tr>
            <th>Employee Name</th>
            <th>Employee Email ID</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Ankita Singh</td>
            <td>ankita.singh@capgemini.com</td>
          </tr>

          <tr>
            <td>Anubhav Chandrawl</td>
            <td>anubhav.bunny@capgemini.com</td>
          </tr>

          <tr>
            <td>Chetan Sharma</td>
            <td>chetan.sharma@capgemini.com</td>
          </tr>

          <tr>
            <td>Sanjay Singh Bisht</td>
            <td>sanjay-singh.bisht@capgemini.com</td>
          </tr>

          <tr>
            <td>Shivani Shrivastava</td>
            <td>shivani.shrivastava@capgemini.com</td>
          </tr>

          <tr>
            <td>Syed Hasan</td>
            <td>syed.hasan@capgemini.com</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default ContactUs;
