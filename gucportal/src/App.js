import React, { Component } from "react";
import {withRouter,BrowserRouter, Link,Route, Switch,Redirect, useHistory} from "react-router-dom";
import './App.css';
import ReactDOM from 'react-dom'
import "bootstrap/dist/css/bootstrap.min.css";


//YOUSRA
import Login from './yousrascomponents/Login';
import viewprofile from './yousrascomponents/viewprofile'
import change from './yousrascomponents/change'
import updateinfo from './yousrascomponents/updateinfo'
import updateinfouser from './yousrascomponents/updateinfouser'
import loginafterpass from './yousrascomponents/loginafterpass'
import changeuser from './yousrascomponents/changeuser'
import signin from './yousrascomponents/signin'


//SARA
import Addstaff from './sarascomponents/addstaff'
import Navbar from './sarascomponents/navbar'
import deletestaff from './sarascomponents/deleteStaff'
import addloc from './sarascomponents/addloc'
import addfac from './sarascomponents/addfac'
import adddep from './sarascomponents/addDep'
import addcourse from './sarascomponents/addcourse'
import addsign from './sarascomponents/addSign'
import viewrecord from './sarascomponents/viewatt'
import updatestaff from './sarascomponents/updatestaff'
import viewMissing from './sarascomponents/viewMissing'
import updateSalary from './sarascomponents/updateSalary'
import updateLoc from './sarascomponents/updateLoc'
import deleteLoc from './sarascomponents/deleteLoc'
import updateFac from './sarascomponents/updateFaculty'
import deletefaculty from './sarascomponents/deletefaculty'
import updatedepartment from './sarascomponents/updatedepartment'
import deletedepartment from './sarascomponents/deletedepartment'
import updateCourse from './sarascomponents/updateCourse'
import deletecourse from './sarascomponents/deleteCourse'

//TOKA
import navbar from "./tokascomponents/Navbar";
import CancelRequest from "./tokascomponents/CancelRequest";
import ReplacementRequests from "./tokascomponents/ReplacementRequests";
import RequestsState from "./tokascomponents/RequestsState";
import Schedule from "./tokascomponents/Schedule";
import SendRequests from "./tokascomponents/SendRequests";
import SendReplReq from "./tokascomponents/SendReplReq";
import ChangeDayOff from "./tokascomponents/ChangeDayOff";
import SlotLinking from "./tokascomponents/SlotLinking";
import LeaveRequests from "./tokascomponents/LeaveRequests";
import Notification from "./tokascomponents/Notification";

//MARYAM
import NavbarBrian from './maryamscomp/NavbarBrian';
import homme from './maryamscomp/Navbar'
import Assigninstructor from './maryamscomp/AssignInstructor'
import DeleteInstructor from './maryamscomp/DeleteInstructor'
import UpdateInstructor from './maryamscomp/UpdateInstructor'
import ViewStaffByDepartment from './maryamscomp/ViewStaffByDepartment'
import Coverage from './maryamscomp/Coverage'
import ViewStaffByCourse from './maryamscomp/ViewStaffByCourse';
import DaysOffAllStaff from './maryamscomp/DaysOffAllStaff';
import DaysOffSingleStaff from './maryamscomp/DaysOffSingleStaff';
import ChangeDayOffRequests from './maryamscomp/ChangeDayOffRequests';
import Leaverequests from './maryamscomp/LeaveRequests';
import TeachingAssignments from './maryamscomp/TeachingAssignments';
import AcceptChangeDayOffRequests from './maryamscomp/AcceptChangeDayOffRequests';
import AcceptLeaveRequests from './maryamscomp/AcceptLeaveRequests';
import RejectChangeDayOffRequests from './maryamscomp/RejectChangeDayOffRequests';
import RejectLeaveRequests from './maryamscomp/RejectLeaveRequests';


//cooord
import coornavbar  from "./components/Navbar.component"
import SlotLink from "./components/SlotLink.component"
import AddSlot  from "./components/AddSlot.component"
import DeleteSlot from "./components/DeleteSlot.component"
import UpdateSlot from "./components/UpdateSlot.component"
import AcceptRequest from "./components/AcceptRequest.component"
import RefuseRequest from "./components/RefuseRequest.component"

//inst
import Navbarinst  from "./components/Navbarinst.component"
import Assign  from "./components/Assign.component"
import RemoveAssignment  from "./components/RemoveAssignment.component"
import ToBeCoordinator from "./components/ToBeCoordinator.component"
import UpdateAssignment from "./components/UpdateAssignment.component"
import ViewCourseStaff from "./components/ViewCourseStaff.component"
import ViewCoverage from "./components/ViewCoverage.component"
import ViewDepStaff from "./components/ViewDepStaff.component"
import ViewSlotAssign from "./components/ViewSlotAssign.component"


class App extends Component{
     
  render() {
   
    return (
      <div>
       
<BrowserRouter>
        <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/changepassword" component={change} />
        <Route path="/changepassword/login" component={loginafterpass}></Route>
       

       <Route exact path="/HR" component={Navbar}/>
       
       <Route path ="/recordAttendance" component={signin}/>
       <Route exact path="/changepassword" component={changeuser}/>
       <Route path="/updateinfo" component={updateinfo}/>
       <Route path="/viewprofile" component={viewprofile} />
      
       <Route path="/HR/Add" component={Addstaff} />
       <Route path="/HR/delete" component={deletestaff} />
       <Route path="/HR/Addlocation" component={addloc} />
       <Route path="/HR/Addfaculty" component={addfac} />
       <Route path="/HR/Adddepartment" component={adddep} />
       <Route path="/HR/Addcourse" component={addcourse} />
       <Route path="/HR/missingsign" component={addsign} />
       <Route path="/HR/vieiwrecord" component={viewrecord} />
       <Route path="/HR/updatestaff" component={updatestaff} />
       <Route path="/HR/viewMissingHoursorDays" component={viewMissing} />
       <Route path="/HR/updateSalary" component={updateSalary} />
       <Route path="/HR/Updatelocation" component={updateLoc} />
       <Route path="/HR/deletelocation" component={deleteLoc} />
       <Route path="/HR/Updatefaculty" component={updateFac} />
       <Route path="/HR/Deletefaculty" component={deletefaculty} />
       <Route path="/HR/Updatedepartment" component={updatedepartment} />
       <Route path="/HR/deletedepartment" component={deletedepartment} />
       <Route path="/HR/updatecourse" component={updateCourse} />
       <Route path="/HR/deletecourse" component={deletecourse} />


        <Route exact path="/academicmember" component={navbar}/>
        <Route path="/updateinfouser" component={updateinfouser}/>
        <Route path="/academicmember/viewReqState" component={RequestsState}/>
        <Route path="/academicmember/cancelReq" component={CancelRequest}/>
        <Route path="/academicmember/send" component={SendRequests}/>
        <Route path="/academicmember/viewReplacmentReq" component={ReplacementRequests}/>
        <Route path="/academicmember/viewSchedule" component={Schedule}/>
        <Route path="/academicmember/sendReplacmentReq" component={SendReplReq}/>
        <Route path="/academicmember/changeDayReq" component={ChangeDayOff}/>
        <Route path="/academicmember/sendSlotLinkingRequest" component={SlotLinking}/>
        <Route path="/academicmember/sendLeaveRequest" component={LeaveRequests}/>
        <Route path="/academicmember/getNotified" component={Notification}/>




         <Route exact path='/HOD/' component={homme}/>
         <Route path='/HOD/instructorAssign' component={Assigninstructor}/>
         <Route path='/HOD/instructorDelete' component={DeleteInstructor}/>
         <Route path='/HOD/instructorUpdate' component={UpdateInstructor}/>
         <Route path='/HOD/coverage' component={Coverage}/>
         <Route path='/HOD/viewStaffByDepartment' component={ViewStaffByDepartment}/>
         <Route path='/HOD/viewStaffByCourse' component={ViewStaffByCourse}/>
         <Route path='/HOD/daysOffAllStaff' component={DaysOffAllStaff}/>
         <Route path='/HOD/daysOffSingleStaff' component={DaysOffSingleStaff}/>
         <Route path='/HOD/requestsChangeDayOff' component={ChangeDayOffRequests}/>
         <Route path='/HOD/requestsLeave' component={Leaverequests}/>
         <Route path='/HOD/acceptChangeDayOffRequests' component={AcceptChangeDayOffRequests}/>
         <Route path='/HOD/acceptLeaveRequests' component={AcceptLeaveRequests}/>
         <Route path='/HOD/rejectChangeDayOffRequests' component={RejectChangeDayOffRequests}/>
         <Route path='/HOD/rejectLeaveRequests' component={RejectLeaveRequests}/>
         <Route path='/HOD/teachingAssignments' component={TeachingAssignments}/> 
       
       
       
      <Route exact path ="/coordinator" component={coornavbar}/>
      <Route path="/coordinator/slotlinkingreq" component={SlotLink} />
      <Route path="/coordinator/slotlinkingreq" component={SlotLink} />
      <Route path="/coordinator/add" component={AddSlot} />
      <Route path="/coordinator/delete" component={DeleteSlot} />
      <Route path="/coordinator/update" component={UpdateSlot} />
      <Route path="/coordinator/accept" component={AcceptRequest}/>
      <Route path = "/coordinator/refuse" component={RefuseRequest}/>  

      <Route exact path="/instructor" component={Navbarinst}/>
      <Route path="/instructor/assign"  component={Assign} />
      <Route path="/instructor/update" component={UpdateAssignment} />
      <Route path="/instructor/delete" component={RemoveAssignment} />
      <Route path="/instructor/tbcoordinator" component={ToBeCoordinator} />
      <Route path="/instructor/coursestaff" component={ViewCourseStaff}/>
      <Route path = "/instructor/coverage" component={ViewCoverage} />
      <Route path = "/instructor/depstaff" component={ViewDepStaff} />
      <Route path = "/instructor/slotassign" component={ViewSlotAssign} />

        </Switch>
        </BrowserRouter>


  );
      </div>
    );
  }
}
ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>

 , document.getElementById('root'));

export default App; 
