import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as AiIcons from 'react-icons/ai';
import * as GiIcons from 'react-icons/gi';
import * as ImIcons from 'react-icons/im';
import * as GoIcons from 'react-icons/go';
import * as CgIcons from 'react-icons/cg';
import * as HiIcons from 'react-icons/hi';
import * as BsIcons from 'react-icons/bs';
import * as FaIcons from 'react-icons/fa';

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
    <div style={{      backgroundColor: "lightblue",
  
}}>
    
       

        <ul style ={{position:'relative',left :'50px', top:"40px"}} className="navbar-nav mr-auto">

          <li className="navbar-item">
          <Link to="/HOD/instructorAssign" style={{fontSize: "15px", fontWeight: "bold"}} className="nav-link"><BsIcons.BsFillPersonPlusFill /> Assign Instructor</Link>
          </li>
          <li className="navbar-item">
          <Link to="/HOD/instructorDelete" className="nav-link"><BsIcons.BsFillPersonDashFill /> Delete Instructor</Link>
          </li>
          <li className="navbar-item">
          <Link to="/HOD/instructorUpdate" className="nav-link"><BsIcons.BsFillPersonCheckFill /> Update Instructor </Link>
          </li>
          <li className="navbar-item">
          <Link to="/HOD/viewStaffByDepartment" className="nav-link"><HiIcons.HiUserGroup /> View Staff By Department</Link>
          </li>
          <li className="navbar-item">
          <Link to="/HOD/viewStaffByCourse" className="nav-link"><ImIcons.ImBooks /> View Staff By Course</Link>
          </li>
          <li className="navbar-item">
          <Link to="/HOD/daysOffAllStaff" className="nav-link"><ImIcons.ImBlocked /> View Day Off All</Link>
          </li>
          <li className="navbar-item">
          <Link to="/HOD/daysOffSingleStaff" className="nav-link"><ImIcons.ImBlocked /> View Day Off Single</Link>
          </li>
          <li className="navbar-item">
          <Link to="/HOD/requestsChangeDayOff" className="nav-link"><CgIcons.CgViewList/> View Change Day Off Requests</Link>
          </li>
          <li className="navbar-item">
          <Link to="/HOD/requestsLeave" className="nav-link"><CgIcons.CgViewList/> View Leave Requests</Link>
          </li>
          <li className="navbar-item">
          <Link to="/HOD/acceptChangeDayOffRequests" className="nav-link"><FaIcons.FaThumbsUp /> Accept Change Day Off Requests</Link>
          </li>
          <li className="navbar-item">
          <Link to="/HOD/acceptLeaveRequests" className="nav-link"><FaIcons.FaThumbsUp />Accepet Leave Requests</Link>
          </li>
          <li className="navbar-item">
          <Link to="/rejectChangeDayOffRequests" className="nav-link"><GoIcons.GoThumbsdown />Reject Change Day Off Requests</Link>
          </li>
          <li className="navbar-item">
          <Link to="/HOD/rejectLeaveRequests" className="nav-link"><GoIcons.GoThumbsdown />Reject Leave Requests</Link>
          </li>
          <li className="navbar-item">
          <Link to="/HOD/coverage" className="nav-link"><GiIcons.GiChecklist/> View Coverage</Link>
          </li>
          <li  style={{position:'relative',top:"-550px",left:"300px"}}className="navbar-item">
          <Link to="/HOD/teachingAssignments" className="nav-link"><GiIcons.GiTeacher /> TeachingAssignments</Link>
          </li>
        </ul>
         <button style={{position:'relative',left:'800px',top:"-530px"}} onClick={this.redirect}>Your profile</button>
        </div>
       
      
    );
  }
}