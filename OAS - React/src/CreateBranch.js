import React from 'react'
import axios from 'axios';
import Branch from './Branch';

class CreateBranch extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            myFormD: {
                branchName: '',
                branchDescription: ''           
            }
        }
    }
    
    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state.myFormD);
        var resp = axios.post("http://localhost:8082/fbranches/new",this.state.myFormD)
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input type="text" placeholder="Branch Name" onChange={e=> this.state.myFormD.branchName=e.target.value}/>
                <input type="text" placeholder="Description" onChange={e=> this.state.myFormD.branchDescription=e.target.value}/>
                <input className="btn btn-danger shadow" type="submit" value="Create Branch"/>
            </form>
        )
    }
}


export default CreateBranch;