import React, { Component } from 'react'
import axios from "axios"

export default class del extends Component {
    
    constructor(props){
        super(props)
        this.handleChangeid=this.handleChangeid.bind(this)
        this.onSubmit = this.onSubmit.bind(this);
        this.state={
           id:'',
           text:""

        }
    }

    componentDidMount (){
      
        //axios.post("/staffAffairs").then(response =>{
        
       // })
     }
    handleChangeid(evt) {
      this.setState({
          id:evt.target.value
      })
      }
   
     onSubmit(e) {
        e.preventDefault();
    
        const user = {
          id: this.state.id
        }
    
        console.log(user);
    
        axios.post('/deleteStaffMember', user)
          .then(res => this.setState({text:res.data}));
    
         
       
      }
   
    render() {
        return (
            <div>
             <h3>Delete staff member</h3>
              <form onSubmit={this.onSubmit}>
              <div className="form-group"> 
          <label>ID: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.id}
              onChange={this.handleChangeid}
              />
              </div>
                
                <div className="form-group">
               <input type="submit" value="Delete member" className="btn btn-primary" />
               </div>
                </form>
                <label>{this.state.text}</label>
                </div>
               
           
        )
    }
}
