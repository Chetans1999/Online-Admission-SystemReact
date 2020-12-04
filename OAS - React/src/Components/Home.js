import React from "react";

// import cllg from "./cllg.jpg";

const Home = () => {
  return (
    <div
      className="alert alert-success text-center m-5 p-5 shadow"
      style={{
        // backgroundImage: `url(${cllg})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
        color: "black",
      }}
    >
      <div className="alert alert-light text-center m-5 p-5 shadow">
        <h1>Why Online Admission?</h1>
        <br />
        <p>
          Every year, students in thousands queue up for collecting
          admission/application forms and then again for submitting the
          admission/application forms. This leads to problems in managing the
          applications, resulting in annoyed parents and students alike.
        </p>

        <br />

        <p align="left">
          <strong>Online Admission System Software</strong> simplifies the
          complexities of admission by -
          <br />
          <ul>
            <li>Enabling students to upload required admission documents.</li>
            <li>Online registration fees payment & collection.</li>
            <li>User-Based login access for greater security.</li>
          </ul>
          <br />
        </p>

        <h1>Features of Online Admission System</h1>
        <br />
        <ul align="left">
          <li>Online Application form filling and submission</li>
          <li>24 X 7 availability of application forms</li>
          <li>Password protected Pre Registration process</li>
          <li>Online Payment Processing</li>
          <li>Configurable Start Date, End Date and Fees Details</li>
          <li>real time update on application payment details</li>
          <li>Online Admission Confirmation</li>
          <li>Student Registration and Record Management</li>
        </ul>
      </div>
    </div>
  );
};

export default Home;
