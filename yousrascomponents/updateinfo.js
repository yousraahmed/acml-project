import React, { Component } from 'react';
import axios from "axios";
import {BrowserRouter, Redirect, Link,Route, Switch,useHistory } from "react-router-dom";
import change from './change'
import jwt from 'jwt-decode'
class updateinfo extends Component {
  constructor(props) {
    super(props);
    this.update = this.update.bind(this);
    const myuser=jwt(localStorage.getItem('auth-token'))
    this.state = {
        
        email:myuser.email,
        daysOff:myuser.daysOff,
        department:myuser.department,
        salary:myuser.salary,
        role:myuser.role,
        officeLocation:myuser.officeLocation,
        err:'',
        courseName:myuser.courseName
     };
    

     
  }
 
   async update(){
    try{
      
        var myinfo= {
            email:this.state.email,
            daysOff:this.state.daysOff,
            salary:this.state.salary,
            role:this.state.role,
            department:this.state.department,
            officeLocation:this.state.officeLocation,
            courseName:this.state.courseName
        }

        console.log(myinfo) 
         
         let res= axios.put('/updateprofile',myinfo,{headers:{'token':localStorage.getItem('auth-token')}})
         //this.setState({err:res})
         console.log(res)
       
       
   
    }
   
  
   catch(e){
    
        console.log(e)
        }
  
        
  }

  
  handleInputChange = (event) => {
    const { value, name } = event.target;
    this.setState({
      [name]: value
    });
  }

  
 render() {
 
     const homepage={
      backgroundColor: "#DAF4FE",
      width: '1280px',
      height: '550px'
     }
    return (
    <div  style={homepage}>
    <h1 style={{fontSize:"120%"}}>Please enter the data of the fields you want to update.</h1>
        
      
        <input style={{position:'relative',top:"50px",left:"510px",padding: "2px"}}
          name="email"
          placeholder="Enter new email"
          value={this.state.email}
          onChange={this.handleInputChange}
          
        ></input>
        <input style={{position:'relative',top:"90px",left:"340px",padding: "2px"}}
          name="salary"
          placeholder="Enter new salary"
          value={this.state.salary}
          onChange={this.handleInputChange}
          
        />
        <input  style={{position:'relative',top:"130px",left:"170px",padding: "2px"}}
          name="daySoff"
          placeholder="Enter new day off"
          value={this.state.daysOff}
          onChange={this.handleInputChange}
         
        
         />
          <input style={{position:'relative',top:"170px",right:"0px",padding: "2px"}}
          name="courseName"
          placeholder="Enter your new course/s"
          value={this.state.courseName}
          onChange={this.handleInputChange}
         />
          <input  style={{position:'relative',top:"210px",right:"170px",padding: "2px"}}
          name="role"
          placeholder="Enter new role"
          value={this.state.role}
          onChange={this.handleInputChange}
          />
           <input style={{position:'relative',top:"250px",right:"340px",padding: "2px"}}
          name="department"
          placeholder="Enter new department"
          value={this.state.department}
          onChange={this.handleInputChange}
         />
           <input style={{position:'relative',top:"290px",right:"510px",padding: "2px"}}
          name="officeLocation"
          placeholder="Enter new office Location"
          value={this.state.officeLocation}
          onChange={this.handleInputChange}
         />
        <button style={{position:'relative',top:"330px",right:"630px",padding: "2px"}} onClick={this.update}>Update</button>
        <l1>{this.state.err}</l1>
      </div>
     
    );
  }
}

export default updateinfo