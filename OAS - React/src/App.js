import "./App.css";
// import Back from './bg.jpg'
import Program from "./Program";
// import Course from './Course';
import Login from "./Components/Login";
import College from "./College";
import Branch from "./Branch";
import Nav from "./Components/Nav";
import NavbarUser from "./NavbarUser";
import { Switch, Route } from "react-router-dom";
import Home from "./Components/Home";
// import ApplicationForm from './ApplicationForm';
import NavbarAdmin from "./NavbarAdmin";
import CollegeAdmin from "./CollegeAdmin";
import CourseAdmin from "./CourseAdmin";
import ProgramAdmin from "./ProgramAdmin";
import BranchAdmin from "./BranchAdmin";
import CreateBranch from "./CreateBranch";
import CourseForm from "./CourseForm";
import CollegeForm from "./CollegeForm";
import UpdateCourseForm from "./UpdateCourseForm";
import CurrentCourse from "./CurrentCourse";
import Register from "./Components/Register";
import AdminLogin from "./Components/AdminLogin";
import UpdateCollegeForm from "./UpdateCollegeForm";
import AvailableColleges from "./AvailableColleges";
import ApplicationForm from "./ApplicationForm";
import ViewApplication from "./ViewApplication";
import ViewAllApplication from "./ViewAllApplication";
import PaymentComp from "./PaymentComp";
import DocumentForm from "./DocumentForm";
import ViewDocument from "./ViewDocument";
import RegisterAdmin from "./RegisterAdmin";
import ViewUserDetails from "./ViewUserDetails";
import UpdateUserForm from "./UpdateUserForm";
import ContactUs from "./Components/ContactUs";
function App() {
  return (
    <div className="App">
      {/* Admin's View */}
      <NavbarAdmin />
      <NavbarUser />
      <Nav />
      <Switch>
        <Route path="/contactus" component={ContactUs} />
        <Route path="/" component={Home} exact />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/adminlogin" component={AdminLogin} />
        <Route path="/collegeform" component={CollegeForm} />
        <Route path="/courseForm" component={CourseForm} />
        <Route path="/updatecourseform" component={UpdateCourseForm} />
        <Route path="/updatecollegeform" component={UpdateCollegeForm} />
        <Route path="/collegeadmin" component={CollegeAdmin} />
        <Route path="/createbranch" component={CreateBranch} />
        <Route path="/courseadmin" component={CourseAdmin} />
        <Route path="/programadmin" component={ProgramAdmin} />
        <Route path="/branchadmin" component={BranchAdmin} />
        <Route path="/availablecolleges" component={AvailableColleges} />
        <Route path="/college" component={College} />
        <Route path="/currentcourse" component={CurrentCourse} />
        <Route path="/program" component={Program} />
        <Route path="/branch" component={Branch} />
        <Route path="/application" component={ApplicationForm} />
        <Route path="/viewapplication" component={ViewApplication} />
        <Route path="/applicationadmin" component={ViewAllApplication} />
        <Route path="/payment" component={PaymentComp} />
        <Route path="/documentform" component={DocumentForm} />
        <Route path="/viewdocument" component={ViewDocument} />
        <Route path="/registeradmin" component={RegisterAdmin} />
        <Route path="/viewuserdetails" component={ViewUserDetails} />
        <Route path="/updateuserdetails" component={UpdateUserForm} />

        {/* <Route path='/course' component={Course} /> */}
      </Switch>
    </div>
  );
}

export default App;

// import "./App.css";
// import Home from "./Components/Home";
// import ContactUs from "./Components/ContactUs";
// import Login from "./Components/Login";
// import Nav from "./Components/Nav";
// import College from "./College";
// import NavbarUser from "./NavbarUser";
// import AdminLogin from './Components/AdminLogin';
// import Register from "./Components/Register";

// import { Switch, Route } from "react-router-dom";

// function App() {
//   return (
//    <div className="App">

//       {

//         localStorage.userId!==undefined ? <NavbarUser /> :   <Nav />

//       }

//       <Switch>

//         <Route path="/" component={Home} exact />
//         <Route path="/login" component={Login} exact />
//         <Route path="/register" component={Register} exact />
//         <Route path="/contactus" component={ContactUs} />
//         <Route path="/adminlogin" component={AdminLogin} />
//         <Route path="/college" component={College} />

//       </Switch>

//     </div>
//   );
// }

// export default App;
