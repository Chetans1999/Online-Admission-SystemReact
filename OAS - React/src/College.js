import React from 'react';
import axios from 'axios';
import { Link, Switch, Route } from 'react-router-dom';
import Program from './Program';
import Course from './CurrentCourse';

class College extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            collegeList: [],
            currentCourseList: [],
            currentProgramList: [],
            search: ''
        }
    }

    componentDidMount(){
        axios.get("http://localhost:8082/colleges/all").then(res => {
            const college = res.data;
            this.setState({ collegeList: college });
          })
    }

    onChange = e => {
        this.setState({ search: e.target.value})
    }

    render(){
        if(sessionStorage.userId==null){
            window.location="login"
        }
        else{
        const { search } = this.state;

        const filteredColleges = this.state.collegeList.filter( college => {
            return college.collegeName.toLowerCase().indexOf( search.toLowerCase() ) !== -1
        })

        return(
            <div style={{textAlign:'center'}}>
                <input className="form-control container shadow mb-4 mt-4" type="text" placeholder="Type College Name to Search..." aria-label="Search" onChange={this.onChange} />
                <div className="container">
                <h3 className="alert alert-info shadow">Colleges</h3>
                <div className="row">
                    {
                    filteredColleges.map(
                    (n)=><div className="col-sm-4 p-4 shadow">
                            <div className="card">
                                <img className="card-img-top" src="https://i.picsum.photos/id/1/5616/3744.jpg?hmac=kKHwwU8s46oNettHKwJ24qOlIAsWN9d2TtsXDoCWWsQ" alt="College img" height="200px" />
                                <div className="card-body">
                                    <h4 className="card-title" className="alert alert-secondary" style={{textDecoration:'underline black'}}><b>{n.collegeName}</b></h4>
                                    <h5 textAlign='center' ><b>-Address-</b></h5>
                                    <p className="card-text">{n.collegeAddress.city + ', ' + n.collegeAddress.state + ', ' + n.collegeAddress.country + ', ZipCode-' + n.collegeAddress.zipcode + ', Landmark- ' + n.collegeAddress.landmark}</p>
                                    <Link to={{pathname:"currentcourse", state:{currCollId: n.collegeRegId, currCollName: n.collegeName}}}>
                                        <button className="btn btn-primary btn-md" >View Courses</button>
                                    </Link> 
                                        {/* <button className="btn btn-secondary btn-sm m-2 shadow" onClick={e=> this.handleClick(n.collegeId)}>Delete</button> */}
                                </div>
                            </div>
                        </div>)}
                    </div>
                    </div>
            {/* <table className="table table-dark">
                <thead>
                    <th>Name</th>
                    <th>Address</th>
                    <th>View Course</th>
                    <th>View Programs</th>
                </thead>
                {
                    filteredColleges.map(
                    (n)=> <tr>
                        <td>{n.collegeName}</td>
                        <td>{n.collegeAddress.city + ', ' + n.collegeAddress.state + ', ' + n.collegeAddress.country + ', ZipCode-' + n.collegeAddress.zipcode + ', Landmark- ' + n.collegeAddress.landmark}</td>
                        <td><Link to={{pathname:"course", state:{currCollId: n.collegeRegId}}}>
                                <button className="btn btn-secondary btn-lg disabled" >View Courses</button>
                            </Link>    
                        </td>
                        <td><Link to={{pathname:"program", state:{currCollId: n.collegeRegId}}}>
                                <button className="btn btn-secondary btn-lg disabled" >View Programs</button>
                            </Link>
                        </td>
                    </tr>
                    )
                }
            </table> */}
            </div>
        );
    }
}
}

export default College;