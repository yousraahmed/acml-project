import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {
  constructor(props){
   super(props);
   this.logout = this.logout.bind(this);
   this.viewprofile = this.viewprofile.bind(this);
    
  }
logout(){
  this.props.history.push('/')
}
viewprofile(){
  this.props.history.push('/HR/viewprofile')
}
  render() {
    return (
      <div style={{ backgroundColor: "lightblue",
       width: '1280px',
       height: '550px'}}>
       <h1 to="/HR" className="navbar-brand">HR</h1>
       <button style= {{position:'relative',top:"-30px",right:"00",left:"1000px",padding:"5px"}} onClick={this.logout}>Log out</button>
       <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
       <div style={{ backgroundColor: "#CDEBF7", width: '1280px', height: '60px',position:'relative',top:"-20px"}}>
       <button style={{position:'relative',top:"20px",right:"30px",left:"200px"}} onClick={this.viewprofile}>View your profile</button>
       </div>
        <div style={{position:'relative',top:"-35px"}}className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
       
          <li className="navbar-item">
          <Link to="/HR/Addlocation" className="nav-link">Add location</Link>
          </li>
          <li className="navbar-item">
          <Link to="/HR/Updatelocation" className="nav-link">Update location</Link>
          </li>
          <li className="navbar-item">
          <Link to="/HR/deletelocation" className="nav-link">Delete location</Link>
          </li>
          <li className="navbar-item">
          <Link to="/HR/Addfaculty" className="nav-link">Add faculty</Link>
          </li>
          <li className="navbar-item">
          <Link to="/HR/Updatefaculty" className="nav-link">Update faculty</Link>
          </li>
          <li className="navbar-item">
          <Link to="/HR/Deletefaculty" className="nav-link">Delete faculty</Link>
          </li>
          <li className="navbar-item">
          <Link to="/HR/Adddepartment" className="nav-link">Add department</Link>
          </li>
          <li className="navbar-item">
          <Link to="/HR/Updatedepartment" className="nav-link">Update department</Link>
          </li>
          <li className="navbar-item">
          <Link to="/HR/deletedepartment" className="nav-link">Delete department</Link>
          </li>
          <li className="navbar-item">
          <Link to="/HR/Addcourse" className="nav-link">Add course</Link>
          </li>
          <li className="navbar-item">
          <Link to="/HR/updatecourse" className="nav-link">Update course</Link>
          </li>
          <li className="navbar-item">
          <Link to="/HR/deletecourse" className="nav-link">Delete course</Link>
          </li>
          <li className="navbar-item">
          <Link to="/HR/Add" className="nav-link">Add new staff member</Link>
          </li>
          <li className="navbar-item">
          <Link to="/HR/Delete" className="nav-link">Delete staff member</Link>
          </li>
          <li className="navbar-item">
          <Link to="/HR/missingsign" className="nav-link">Add missing sign</Link>
          </li>
          <li className="navbar-item">
          <Link to="/HR/vieiwrecord" className="nav-link">View attendance record</Link>
          </li>
          <li className="navbar-item">
          <Link to="/HR/updatestaff" className="nav-link">Update staff member</Link>
          </li>
          <li className="navbar-item">
          <Link to="/HR/viewMissingHoursorDays" className="nav-link">View missing hours or days </Link>
          </li>
          <li className="navbar-item">
          <Link to="/HR/updateSalary" className="nav-link">Update salary</Link>
          </li>
          
        </ul>
        </div>
      </nav>
      </div>
    );
  }
}