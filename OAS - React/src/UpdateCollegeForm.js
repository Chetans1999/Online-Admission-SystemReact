import React from 'react';
import axios from 'axios';
import swal from 'sweetalert';

class UpdateCollegeForm extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            collegeFormData: {
                collegeName: this.props.location.state.currCollName,
                collegeAddress: this.props.location.state.currCollAddress,
                courseList: [],
                programList: this.props.location.state.currPgmList,
            },
            collegeId: this.props.location.state.currCollId,
            crsList : [],
            pgmList : []
        }
    }


    componentDidMount(){
        axios.get("http://localhost:8082/fcourses/all").then(res => {
            const course = res.data;
            this.setState({ crsList: course });
          });
        axios.get("http://localhost:8082/fprogram/all").then(res => {
            const program = res.data;
            this.setState({ pgmList: program });
          })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if(window.confirm('!Are you sure you want to add these courses?')){
        console.log('----------------------------------------------------', this.state.collegeFormData)
        this.state.collegeFormData.courseList.forEach(i => {
            delete i["courseId"];
            i["branches"].forEach(j => {
                delete j["branchId"]
            });
        })

        this.state.collegeFormData.programList.forEach(i => {
                delete i["programId"];
        })

        console.log("collegeId==================", this.state.collegeId)

        delete this.state.collegeFormData.collegeAddress["addressId"];
       
        axios.put(`http://localhost:8082/colleges/update/${this.state.collegeId}`,this.state.collegeFormData)
        swal("Courses added successfully!", "task accomplished!", "success").then(function(){
            window.location = "/collegeadmin";
        })  
        console.log('----------------------------------------------------', this.state.collegeFormData)

    }
    }

    handleChange1 = (e) => {
        let value = Array.from(e.target.selectedOptions, option => option.value);
        // this.setState({branchIdList: value});
        value.forEach(element => {
            this.state.collegeFormData.courseList.push(this.state.crsList[element])
        });

        console.log('updated crs==================++++++++++',this.state.collegeFormData.courseList)
      }

    handleChange2 = (e) => {
        let value = Array.from(e.target.selectedOptions, option => option.value);
        // this.setState({branchIdList: value});
        value.forEach(element => {
            this.state.collegeFormData.programList.push(this.state.pgmList[element])
        });
      }


    render() {
        return (
            <div className="row p-5 bg-info" style={{textAlign:'justify'}}>
                <div className="col-sm-12 col-md-8 offset-2 bg-white shadow-sm p-3">
                    <h6 className="text-secondary">Add More Courses in {this.state.collegeFormData.collegeName}</h6>
                    <form onSubmit={this.handleSubmit} className="row p-3">

                        <div className="col-6">
                            <label><b>Select Courses*</b></label><br/>
                            <select onChange={this.handleChange1} className="mul-select2" multiple style={{width: '100%'}} required>
                                {
                                    this.state.crsList.map((n, i)=><option value={i}>{n.courseName}</option>)
                                }
                            </select>
                        </div>
                        {/* <div className="col-6"></div>
                        <div className="col-6 mt-3">
                            <label><b>Select Program for the Courses*</b></label><br/>
                            <select onChange={this.handleChange2} className="mul-select" style={{width: '100%'}} required>
                                {
                                    this.state.pgmList.map((n, i)=><option value={i}>{n.programName}</option>)
                                }
                            </select>                             
                        </div> */}
                        <div className="col-12 mt-4">
                            <input type="submit" className="btn btn-dark shadow btn-block"/>
                        </div>
                        </form>

                </div>
            </div>
        )
    }
}

export default UpdateCollegeForm;