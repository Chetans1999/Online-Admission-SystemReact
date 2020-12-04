import './App.css';
// import Back from './bg.jpg'
import Program from './Program';
// import Course from './Course';
import Login from "./Components/Login";
import College from './College';
import Branch from './Branch';
import Nav from "./Components/Nav";
import NavbarUser from './NavbarUser';
import { Switch, Route } from 'react-router-dom';
import Home from './Components/Home';
// import ApplicationForm from './ApplicationForm';
import NavbarAdmin from './NavbarAdmin';
import Register from "./Components/Register";
import CollegeAdmin from './CollegeAdmin'
import CourseAdmin from './CourseAdmin'
import ProgramAdmin from './ProgramAdmin'
import BranchAdmin from './BranchAdmin'
import AdminLogin from './Components/AdminLogin';
import CreateBranch from './CreateBranch';
import CourseForm from './CourseForm';
import CollegeForm from './CollegeForm';
import UpdateCourseForm from './UpdateCourseForm';
import CurrentCourse from './CurrentCourse';
 
function RouterUser() {
  return (
    <div>
        <NavbarUser/>
          <Switch>
            <Route path='/home' component={Home} />
            <Route path='/college' component={College} />
            <Route path='/currentcourse' component={CurrentCourse} />
            <Route path='/program' component={Program} />
            <Route path='/branch' component={Branch} />
            {/* <Route path='/course' component={Course} />  */}
          </Switch>)
    </div>
  );
}
 
export default RouterUser;