import React, { Component } from 'react';
import axios from "axios";
import {BrowserRouter, Redirect, Link,Route, Switch,useHistory } from "react-router-dom";
import change from './change'
import jwt from 'jwt-decode'
class Login extends Component {
  constructor(props) {
    super(props);
    this.loginfunc = this.loginfunc.bind(this);
    this.state = {
      
      email : '',
      password: '',
      err:'',
      redirect:''
     
    };

  }
 
   async loginfunc(){
    try{
  
    const token = 'auth-token'
     let res= await axios.post('/login',{email:this.state.email,password:this.state.password})
    if(res.data!=null){
     if(res.data==='Please enter a valid email or password.'||res.data==='User is not registered. Please contact HR.'||
     res.data==='Invalid credentials'){
      this.setState({err:res.data})
    }
    else{
      axios.defaults.headers.common={'Authentication':`Bearer ${res.data}`}
     const token= res.data
      localStorage.setItem('auth-token', token);
      console.log(res.data)
      const myuser=jwt(res.data)
      console.log(myuser)
      if(myuser.department=='hr'){
        console.log("HRRR")
        this.props.history.push('/HR')
      }

   
    }
    if(res.data=='Please Change your password.'){
      this.props.history.push('/changepassword')
    }}
    }
  
   catch(e){
     console.log(this.state.err)
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
      backgroundColor: "lightblue",
      width: '1280px',
      height: '550px'
     }
    return (
    <div  style={homepage}>
        <h1>GUC Portal</h1>
        <text style={{position:'relative',top:"170px",left:"555px",padding: "5px"}}>Login</text>
        <input style={{position:'relative',top:"200px",left:"510px",padding: "2px"}}
          name="email"
          placeholder="Enter email"
          value={this.state.email}
          onChange={this.handleInputChange}
          required
        ></input>
        <input  style={{position:'relative',top:"235px",left:"340px",padding: "2px"}}
          type="password"
          name="password"
          placeholder="Enter password"
          value={this.state.password}
          onChange={this.handleInputChange}
          required
        />
        <button style={{position:'relative',top:"275px",left:"225px"}}
        onClick={this.loginfunc}>submit</button>
        
         <l1 style={{color:"red",position:'relative',top:"320px",left:"70px"}}> {this.state.err}</l1>
  
      </div>
     
    );
  }
}

export default Login