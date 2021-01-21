import React, {Component} from 'react';
import axios from 'axios';

export default class slreq extends Component{
  constructor(props){
    super(props);
    this.handleReqID = this.handleReqID.bind(this);
    this.handleState = this.handleState.bind(this);
    this.handleSenderID = this.handleSenderID.bind(this);
    this.handleDate = this.handleDate.bind(this);
    this.handleSlotreq1 = this.handleSlotreq1
    .bind(this);
    this.handleSlotreq2 = this.handleSlotreq2
    .bind(this);

    this.onSubmit= this.onSubmit.bind();
    this.state={
      reqid:'',
      state:'',
      senderID:'',
      date:'',
      slotreq1:'',
      slotreq2:''
    }
  }

  componentDidMount(){

  }
  handleReqID(e){
    this.setState({
      reqid: e.target.value
    })
  }
  handleState(e){
    this.setState({
      state: e.target.value
    })
  }
  handleSenderID(e){
    this.setState({
      senderID: e.target.value
    })
  }
  handleDate(e){
    this.setState({
      date: e.target.value
    })
  }
  handleSlotreq1(e){
    this.setState({
      slotreq1: e.target.value
    })
  }
  handleSlotreq2(e){
    this.setState({
      slotreq2: e.target.value
    })
  }

  onSubmit(e){
    e.preventDefault();
    const req ={
      reqid: this.state.reqid,
      state: this.state.state,
      senderID: this.state.senderID,
      date: this.state.date,
      slotreq1: this.state.slotreq1,
      slotreq2: this.state.slotreq2
    }
    console.log(req);
    axios.get('/coordinator/SLreq',{headers:{'auth-token':localStorage.getItem('auth-token')}}, req)
    .then(res => this.setState({text:res.data}));
  }

  render() {
        return (
            <div>
             <h3>Your slot linking requests</h3>
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
          <label>state: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.state}
              onChange={this.handleState}
              />
              </div>
              <div className="form-group"> 
          <label>Sender ID: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.senderID}
              onChange={this.handleSenderID}
              />
              </div>
              <div className="form-group"> 
          <label>Date: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.date}
              onChange={this.handleDate}
              />
              </div>
              
                
                </form>
                <label>{this.state.text}</label>
                </div>
               
           
        )
    }

}
