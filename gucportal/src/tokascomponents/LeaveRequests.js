import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";


export default class LeaveRequests extends Component {
  constructor(props) {
    super(props);

    this.onChangeLeaveType= this.onChangeLeaveType.bind(this);
    this.onChangeReason = this.onChangeReason.bind(this); 
    this.onChangeDate= this.onChangeDate.bind(this);
    this.onChangeDocs= this.onChangeDocs.bind(this);


       this.onSubmit = this.onSubmit.bind(this);

    this.state = { 
    reason:'',
    leavetype:'',
    date: new Date(),
    docu:'',
      msg:''
     
  }
  }
 
  
    onChangeLeaveType(e) {
        this.setState({
          leavetype:e.target.value
        })
        this.setState({msg:""})
        }


  onChangeReason(e) {
    this.setState({
      reason: e.target.value
    })
    this.setState({msg:""})
  }
  
  onChangeDocs(e) {
    this.setState({
      docu: e.target.value
    })
    this.setState({msg:""})
  }
  
  
  onChangeDate(date) {
    this.setState({
      date: date
    })
    this.setState({msg:""})
  }

  

  async onSubmit(e) {
    e.preventDefault();

    const re = {
        
       reason:this.state.reason,
       leavetype: this.state.leavetype,
       docu: this.state.docu,
      date:this.state.date
      
    }

    console.log(re);

    let result= await axios.post('/academicmember/sendLeaveRequest', re,{headers:{'auth-token':localStorage.getItem('auth-token')}})
        if(result.data==="a"){
            const err= "You cant submit request without a reason";
            this.setState({msg:err});
            console.log(result.data);
        }
        if(result.data==="b"){
            const err= "You cant submit request without documents";
            this.setState({msg:err});
            console.log(result.data);
        }
        if(result.data==="c"){
            const err= "You cant submit this kind of leave request because YOU'RE A MALE";
            this.setState({msg:err});
            console.log(result.data);
        }
        if(result.data==="d"){
            const err= "You cant submit this request because you're LATE";
            this.setState({msg:err});
            console.log(result.data);
        }
        if(result.data==="x"){
            const err= "You cant submit request because you ran out of accidental LEAVES";
            this.setState({msg:err});
            console.log(result.data);
        }
        if(result.data==="y"){
            const err= "You cant submit request because you dont have enough annual balance";
            this.setState({msg:err});
            console.log(result.data);

        }
        if(result.data==="f"){
            const err= "Annual leaves must be submitted before the targeted day!";
            this.setState({msg:err});
            console.log(result.data);
        }
        if(result.data==="g"){
            const err= "Please enter the type correctly (maternity-sick-annual-accidental-compensation)!";
            this.setState({msg:err});
            console.log(result.data);
        }


        if(result.data.leaveType===this.state.leavetype){
          const err= "Your leave request has been sent to the HOD";
          this.setState({msg:err});
          console.log(result.data);}
          
            
      }

     // window.location = '/';
  

  render() {
    return (
    <div>
      <h3>Send Replacement Request: </h3>
      <form onSubmit={this.onSubmit}>
        <div className="form-group"> 
          <label>Enter Type Of Leave Request: </label>
          <input type="text"
              required
              className="form-control"
              value={this.state.leavetype}
              onChange={this.onChangeLeaveType}>
              
          </input>
        </div>
        <div className="form-group"> 
          <label>Reason: </label>
          <input type="text"
              
              className="form-control"
              value={this.state.reason}
              onChange={this.onChangeReason}>
              
          </input>
        </div>
        <div className="form-group"> 
          <label>Documents if needed: </label>
          <input  type="text"
              
              className="form-control"
              value={this.state.docu}
              onChange={this.onChangeDocs}
              />
        </div>

        <div className="form-group">
          <label>Enter The Targeted Day Date: </label>
          <div>
            <DatePicker
              selected={this.state.date}
              onChange={this.onChangeDate}
            />
          </div>
          </div> 
        
        <div className="form-group">
          <input onClick={this.onSubmit} type="submit" value="Send Request" className="btn btn-primary" />
        </div>

      </form>

            <l1 style={{color:"red",position:'relative'} }> {this.state.msg} </l1>
    </div>
    )
  }
}