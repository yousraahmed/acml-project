import React, { Component } from 'react';
import axios from "axios";
import {BrowserRouter, Link,Route, Switch,useHistory ,withRouter} from "react-router-dom";

export default class viewprofile extends Component {
  constructor(){
    super()
    this.state={
     dataa:''

    }
  }
  componentDidMount= async()=>{
    try{
    
     let res=  await axios.get('/viewprofile',{headers:{'token':localStorage.getItem('auth-token')}})
     this.setState({dataa:res.data})
     console.log(this.state.dataa)
}
        catch(e){
            console.log(e)
        } }

 newline(text) {
    return text.split('\n').map(str => <p>{str}</p>);
        }
render() {
    return (
        <div style= {{backgroundColor: "lightblue", width: '1280px', height: '550px'}}>
        <h1 style={{position:'relative',left:"80px",top:"60px"}}>View your profile</h1>
        <div style={{position:'relative',left:"100px",top:"70px"}}>
        {this.newline(this.state.dataa)}</div>
        </div>
    );
  }
}