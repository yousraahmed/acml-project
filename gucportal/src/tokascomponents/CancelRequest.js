import React, { Component } from 'react';
import axios from 'axios';


export default class CancelRequest extends Component {
  constructor(props) {
    super(props);
   

    this.onChangeReqId = this.onChangeReqId.bind(this);
   
       this.onSubmit = this.onSubmit.bind(this);

    this.state = { 
      rId: '',
     
      msg:''
     
  }
  }
 
  
  onChangeReqId(e) {
    this.setState({
      rId: e.target.value
    })
    this.setState({msg:""});
  }

  

  async onSubmit(e) {
    e.preventDefault();

    const re = {
       
      rId: this.state.rId
    
      
    }

    console.log(re);

    let result= await axios.post('/academicmember/cancelReq', re,{headers:{'auth-token':localStorage.getItem('auth-token')}})
     if(result.data==="CanceledSuccessfully"){
         const err= "Your pending request has been canceled successfully"
         this.setState({msg:err})
     }
     if(result.data==="CanceledSuccessfullya"){
        const err= "Your request that its day is yet to come has been canceled successfully"
        this.setState({msg:err})
    }

   // window.location = '/';
  }

  render() {
    return (
    <div>
      <h3>Cancel Request: </h3>
      <form onSubmit={this.onSubmit}>
     
        <div className="form-group"> 
          <label>Request ID: </label>
          <input type="text"
              required
              className="form-control"
              value={this.state.rId}
              onChange={this.onChangeReqId}>
              
          </input>
        </div>
        
        
        <div className="form-group">
          <input onClick={this.onSubmit} type="submit" value="Cancel Request" className="btn btn-primary" />
        </div>
      </form>
      <l1 style={{color:"red",position:'relative'} }> {this.state.msg} </l1>
    </div>
    )
  }
}