import React, { Component } from "react";
import {withRouter,BrowserRouter, Link,Route, Switch,Redirect, useHistory} from "react-router-dom";
import './App.css';
import ReactDOM from 'react-dom'

//YOUSRA
import Login from './yousrascomponents/Login';
import viewprofile from './yousrascomponents/viewprofile'
import change from './yousrascomponents/change'
import updateinfo from './yousrascomponents/updateinfo'
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





class App extends Component{
     
  render() {
   
    return (
      <div>
       
<BrowserRouter>
        <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/changepassword" component={change} />
        
        

       <Route exact path="/HR" component={Navbar}/>
       <Route path="/HR/updateinfo" component={updateinfo}/>
       <Route path="/HR/viewprofile" component={viewprofile} />
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
