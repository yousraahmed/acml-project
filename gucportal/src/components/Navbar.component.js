import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {

  constructor(props) {
    super(props);
    this.redirect = this.redirect.bind(this);
    
    }
  redirect(){
    this.props.history.push('/academicmember')
  }
  render() {
    return (
      <div style={{backgroundColor:'lightblue'}}className="collpase navbar-collapse">
        <Link to="/" className="navbar-brand">Co-ordinators' home page</Link>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">

          <li className="navbar-item">
          <Link to="/coordinator/add" className="nav-link">Add slot</Link>
          </li>

          <li className="navbar-item">
          <Link to="/coordinator/delete" className="nav-link">Delete slot</Link>
          </li>

          <li className="navbar-item">
          <Link to="/coordinator/update" className="nav-link">Update slot</Link>
          </li>

          <li className="navbar-item">
          <Link to="/coordinator/slotlinkingreq" className="nav-link">Slot linking requests</Link>
          </li>

          <li className="navbar-item">
          <Link to="/coordinator/accept" className="nav-link">Accept slot linking requests</Link>
          </li>

          <li className="navbar-item">
          <Link to="/coordinator/refuse" className="nav-link">Refuse slot linking requests</Link>
          </li>

        </ul>
        <button style={{position:'relative',left:'800px',top:"-250px"}} onClick={this.redirect}>Your profile</button>
        </div>
    </div>
    );
  }
}