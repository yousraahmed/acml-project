import React, { Component } from 'react'
import axios from "axios"

export default class del extends Component {
    
    constructor(props){
        super(props)
        this.handleChangelocation=this.handleChangelocation.bind(this)
        this.onSubmit = this.onSubmit.bind(this);
        this.state={
           location:'',
           text:""

        }
    }

    componentDidMount (){
      
        //axios.post("/staffAffairs").then(response =>{
        
       // })
     }
    handleChangelocation(evt) {
      this.setState({
          location:evt.target.value
      })
      }
   
     onSubmit(e) {
        e.preventDefault();
    
        const user = {
          location: this.state.location
        }
    
        console.log(user);
    
        axios.post('/deleteLocation', user)
          .then(res => this.setState({text:res.data}));
    
         
       
      }
   
    render() {
        return (
            <div>
             <h3>Delete Location</h3>
              <form onSubmit={this.onSubmit}>
              <div className="form-group"> 
          <label>location: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.location}
              onChange={this.handleChangelocation}
              />
              </div>
                
                <div className="form-group">
               <input type="submit" value="Delete location" className="btn btn-primary" />
               </div>
                </form>
                <label>{this.state.text}</label>
                </div>
               
           
        )
    }
}
