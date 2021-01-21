import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {
  constructor(props){
    super(props);
    this.logout = this.logout.bind(this);
    this.viewprofile = this.viewprofile.bind(this);
    this.updateprofile = this.updateprofile.bind(this);
    this.signin=this.signin.bind(this)
    
     
   }
   logout(){
    localStorage.setItem('auth-token','');
    this.props.history.push('/')
  }
  
  viewprofile(){
    this.props.history.push('/viewprofile')
  }
  
  updateprofile(){
    this.props.history.push('/updateinfouser')
  }
  signin(){
   this.props.history.push('/recordAttendance')
  }
  
  
  render() {
    return (
      <div style={{ backgroundColor: "lightblue",
      width: '1280px',
      height: '1000px'}}>
      <div style={{ backgroundColor: "#DAF4FE", width: '1280px', height: '60px',position:'relative',top:"80px"}}>
      <button style={{position:'relative',top:"20px",right:"30px",left:"230px"}} onClick={this.viewprofile}>View your profile</button>
      <button style={{position:'relative',top:"20px",right:"50px",left:"255px"}} onClick={this.updateprofile}>Update your profile</button>
      <button style={{position:'relative',top:"20px",right:"30px",left:"280px"}} onClick={this.signin}>Record your attendance</button>
      </div>
      <button style= {{position:'relative',top:"-30px",right:"00px",left:"1050px"}} onClick={this.logout}>Log out</button>



     
        
        <div style={{position:'relative',top:"70px", left:"60px"}} className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
          <Link to="/academicmember/send" className="nav-link">Send Requests</Link>
          </li>
          <li className="navbar-item">
          <Link to="/academicmember/viewReqState" className="nav-link">Your Requests</Link>
          </li>
          <li className="navbar-item">
          <Link to="/academicmember/cancelReq" className="nav-link">Cancel Request</Link>
          </li>
          <li className="navbar-item">
          <Link to="/academicmember/viewReplacmentReq" className="nav-link">Replacement Requests </Link>
          </li>
          <li className="navbar-item">
          <Link to="/academicmember/viewSchedule" className="nav-link">Schedule</Link>
          </li>
          <li className="navbar-item">
          <Link to="/academicmember/getNotified" className="nav-link">Notifications</Link>
          </li>
        </ul>
        </div>
     
      </div>
    );
  }
}
