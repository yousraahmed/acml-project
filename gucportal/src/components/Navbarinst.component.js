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
       
        <Link to="/instructor" className="navbar-brand">Instructors' home page</Link> 
        <ul style={{position:'relative', top:'30px',left:'100px'}} className="navbar-nav mr-auto">

          <li className="navbar-item">
          <Link to="/instructor/slotassign" className="nav-link">My slots</Link>
          </li>

          <li className="navbar-item">
          <Link to="/instructor/coverage" className="nav-link">course coverage</Link>
          </li>

          <li className="navbar-item">
          <Link to="/instructor/coursestaff" className="nav-link">View staff by course</Link>
          </li>

          <li className="navbar-item">
          <Link to="/instructor/depstaff" className="nav-link">View staff by department</Link>
          </li>

          <li className="navbar-item">
          <Link to="/instructor/assign" className="nav-link">Assign an academic member to unassigned slots</Link>
          </li>

          <li className="navbar-item">
          <Link to="/instructor/update" className="nav-link">Update assignment of an academic member</Link>
          </li>

          <li className="navbar-item">
          <Link to="/instructor/delete" className="nav-link">Remove assignment of an academic member</Link>
          </li>

          <li className="navbar-item">
          <Link to="/instructor/tbcoordinator" className="nav-link">Update user to be Coordinator</Link>
          </li>

        </ul>
        <button style={{position:'relative',left:'800px',top:"-300px"}} onClick={this.redirect}>Your profile</button>
        </div>
      
    );
  }
}