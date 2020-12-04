import React from 'react';
import axios from 'axios';

class Program extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            programList: []
        }
    }

    componentDidMount(){
        const id = this.props.location.state.currCollId;
        axios.get(`http://localhost:8082/program/getByCollegeId/${id}`).then(res => {
        const program = res.data;
        this.setState({ programList: program });
        })
      console.log(this.props.location.state);
      }

    render(){
        return(
            <div style={{textAlign:'center'}}>
                {console.log('here'+this.props.currCollId)}
                <h3 className="alert alert-success">Program Table</h3>
            <table className="table table-dark">
                
                <thead>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Elegibility</th>
                    <th>Duration</th>
                    <th>Degree Offered</th>
                </thead>
                {
                    this.state.programList.map(
                    (n)=> <tr>
                        <td>{n.programName}</td>
                        <td>{n.programDescription}</td>
                        <td>{n.programEligibility}</td>
                        <td>{n.programDuration}</td>
                        <td>{n.degreeOffered}</td>
                    </tr>
                    )
                }
            </table>
            </div>
        );
    }
}

export default Program;