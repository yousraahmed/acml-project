import React, { Component } from 'react';
import axios from "axios";
import { Link,Route, Switch,useHistory } from "react-router-dom";


class change extends Component {
  constructor(props) {
    super(props);
    this.changepassword = this.changepassword.bind(this);
    this.state = {
      email:localStorage.getItem('email'),
      old: '',
      newbie: '',
      err:'',
      redirect:''
     
    };

  }
 
  async changepassword(){
    try{
      let res= await axios.put('/changepass',{email:this.state.email,
      password:this.state.old,newpassword:this.state.newbie})
      this.setState({err:res.data})
      console.log(res.data)
      console.log(this.state.email)
   
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
      backgroundColor: "lightblue",
      width: '1280px',
      height: '550px'
     }
    return (
    <div style={homepage}>
        <div  style={homepage}>
        <h1>GUC Portal</h1>
        <h2 style={{position:'relative',top:"100px",right:"0px",left:"230px",padding: "1px"}}>Please change your password</h2>
        <input style={{position:'relative',top:"105px",left:"500px",padding: "2px"}}
          
          name="email"
          placeholder="Enter"
          value={this.state.email}
          onChange={this.handleInputChange}
          required
        ></input>
        <input style={{position:'relative',top:"140px",left:"330px",padding: "2px"}}
          type="password"
          name="old"
          placeholder="Enter old"
          value={this.state.old}
          onChange={this.handleInputChange}
          required
        ></input>
        <input  style={{position:'relative',top:"180px",left:"160px",padding: "2px"}}
         type="password"
          name="newbie"
          placeholder="Enter new password"
          value={this.state.newbie}
          onChange={this.handleInputChange}
          required
        />
        <button style={{position:'relative',top:"220px",left:"40px"}}
        onClick={this.changepassword}>submit</button>
        
         <l1 style={{color:"red",position:'relative',top:"280px",right:"120px"}}> {this.state.err}</l1>
  
      </div>
      </div>
     
    );
  }
}

export default change