import React, { Component } from 'react';
import axios from 'axios';


export default class ChangeDayOff extends Component {
  constructor(props) {
    super(props);
   

    this.onChangeDayOff = this.onChangeDayOff.bind(this);
    this.onChangeReason = this.onChangeReason.bind(this);
       this.onSubmit = this.onSubmit.bind(this);

    this.state = { 
      dayOff: '',
      reason: '',
      msg:''
     
  }
  }
 

  onChangeDayOff(e) {
    this.setState({
      dayOff: e.target.value
    })
    this.setState({msg:""});
  }

  onChangeReason(e) {
    this.setState({
      reason: e.target.value
    })
    this.setState({msg:""});
  }

  

  async onSubmit(e) {
    e.preventDefault();

    const re = {
      
      dayOff: this.state.dayOff,
      reason:this.state.reason
      
    }

    console.log(re);

    let result= await axios.post('/academicmember/changeDayReq', re,{headers:{'auth-token':localStorage.getItem('auth-token')}})
      if(result!=null){
          const err= "Your request has been sent to the HOD";
          this.setState({msg:err});
          console.log(result.data);

      }

   // window.location = '/';
  }

  render() {
    return (
    <div>
      <h3>Send Change Day Off Request: </h3>
      <form onSubmit={this.onSubmit}>
    
        <div className="form-group"> 
          <label>Requested Day Off: </label>
          <input type="text"
              required
              className="form-control"
              value={this.state.dayOff}
              onChange={this.onChangeDayOff}>
              
          </input>
        </div>
        <div className="form-group"> 
          <label>Reason: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.reason}
              onChange={this.onChangeReason}
              />
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