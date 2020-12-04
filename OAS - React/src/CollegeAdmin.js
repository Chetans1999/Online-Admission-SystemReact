import React from 'react';
import axios from 'axios';
import { Link, Switch, Route } from 'react-router-dom';

class CollegeAdmin extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            collegeList: [],
            search: ''
        }
    }

    componentDidMount(){
        axios.get("http://localhost:8082/colleges/all").then(res => {
            const college = res.data;
            this.setState({ collegeList: college });
          })
    }

    handleClick(id){
        axios.delete(`http://localhost:8082/colleges/delete/${id}`);
          alert('!Are you sure you want to delete?');
          window.location.reload();
    }

    onChange = e => {
        this.setState({ search: e.target.value})
    }

    render(){
        if(sessionStorage.adminId==null){
            window.location="adminlogin"
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
                    <h3 className="alert alert-info shadow" style={{textAlign:'center'}}>Colleges</h3>
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
                                    <Link to={{pathname:"updatecollegeform", state:{currCollId: n.collegeRegId, currCollName: n.collegeName, currCollAddress: n.collegeAddress, currCrsList: n.courseList, currPgmList: n.programList}}}>
                                        <button className="btn btn-primary btn-sm m-2 shadow">Add More Courses</button>
                                    </Link>
                                        {/* <button className="btn btn-secondary btn-sm m-2 shadow" onClick={e=> this.handleClick(n.collegeId)}>Delete</button> */}
                                </div>
                            </div>
                        </div>)}
                        <div className="col-sm-4 p-4 shadow">
                            <div className="card">
                                <img className="card-img-top" src="https://upload.wikimedia.org/wikipedia/commons/0/0c/Catholicate_College.jpg" alt="College img" height="200px" />
                                <div className="card-body">
                                    <h3 className="card-title" className=""><b><br /> Want a new college? <br /><br />Have it now.</b></h3>
                                    <Link to="collegeform">
                                        <button className="btn btn-outline-warning pl-5 pr-5 m-2 shadow"><i className="fa fa-plus fa-2x"></i></button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
}

export default CollegeAdmin;