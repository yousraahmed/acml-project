import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

export default class AcceptChangeDayOffRequests extends Component{
    
    constructor(props)
    {
        super(props);
        this.state={
            //token
            hodid:"",
            reqId:0,
            text:""
        }

        this.handleChangingReqId = this.handleChangingReqId.bind(this);

        //token 
        this.handleChangingHODID = this.handleChangingHODID.bind(this)

        this.handleClick = this.handleClick.bind(this)
        
    }
    //token
    handleChangingHODID(event)
    {
        this.setState({
            hodid: event.target.value
        })
    }
    handleChangingReqId(event)
    {
        this.setState({
            reqId: event.target.value
        })
    }
    
    

    handleClick(event)
    {
        event.preventDefault();

        const request = {
            //token
            hodid: this.state.hodid,

            reqId: this.state.reqId
        }

        console.log(request);

        axios.post('http://localhost:5000/acceptLeaveRequests', request,  {headers: {'auth-token':localStorage.getItem('auth-token')}})
        .then(res => this.setState({text:res.data}))

        
    }
    
    render()
    {
        return(
            <div>
            <form>
            <div className="mb-3">
              <label htmlFor="exampleInputHODID1" className="form-label">HOD ID</label>
              <input type="hodid" className="form-control" value={this.state.hodid} onChange= {this.handleChangingHODID} id="exampleInputHODID1"/>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputInstructorID1" className="form-label">Request ID</label>
              <input type="id" className="form-control" value={this.state.reqId} onChange= {this.handleChangingReqId} id="exampleInputInstructorID1"/>
            </div>
            <button onClick={this.handleClick} type="submit" className="btn btn-primary">Accept Request</button>
          </form>
          <p>         </p>
            <h1>{this.state.text}</h1>
          </div>
          
        )
    }
}
