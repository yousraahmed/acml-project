import React, {Component} from 'react';
import axios from 'axios';

export default class acceptReq extends Component{
  constructor(props){
    super(props);
    this.handleReqID = this.handleReqID.bind(this);
    this.onChangeState = this.onChangeState.bind(this);
    this.onSubmit= this.onSubmit.bind();
    this.state={
      reqid:'',
      state:''
    }
  }

  componentDidMount(){

  }
  handleReqID(e){
    this.setState({
      reqid: e.target.value
    })
  }
  onChangeState(e){
    this.setState({
      state: e.target.value
    })
  }

  onSubmit(e){
    e.preventDefault();
    const acc ={
      reqid: this.state.reqid,
      state: this.state.state
    }
    console.log(acc);
    axios.put('/coordinator/SLreq', acc,{headers:{'auth-token':localStorage.getItem('auth-token')}})
    .then(res => this.setState({text:res.data}));
  }

  render() {
        return (
            <div>
             <h3>Accept slot linking request</h3>
             <h6>state should be "accepted"</h6>
              <form onSubmit={this.onSubmit}>
              <div className="form-group"> 
          <label>Request ID: </label>
          <input  type="text"
            //  required
              className="form-control"
              value={this.state.reqid}
              onChange={this.handleReqID}
              />
              </div>
              <div className="form-group"> 
          <label>New state: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.state}
              onChange={this.onChangeState}
              />
              </div>
                <div className="form-group">
               <input type="submit" value="Accept" className="btn btn-primary" />
               </div>
                </form>
                <label>{this.state.text}</label>
                </div>
               
           
        )
    }

}
