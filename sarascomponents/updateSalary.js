import React, { Component } from 'react'
import axios from "axios"

export default class hr extends Component {
    
    constructor(props){
        super(props)
        this.onChangeID=this.onChangeID.bind(this)
        this.onChangenewSalary=this.onChangenewSalary.bind(this)
        this.onSubmit = this.onSubmit.bind(this);
        this.state={
          memberID:"",
          newSalary:'',
           text:[]

        }
    }

    componentDidMount (){
      
        //axios.post("/staffAffairs").then(response =>{
        
       // })
     }
    onChangeID(evt) {
      this.setState({
        memberID:evt.target.value
      })
      }
      onChangenewSalary(evt) {
        this.setState({
         newSalary:evt.target.value
        })
        }
    onSubmit(e) {
        e.preventDefault();
    
        const mem = {

         id:this.state.memberID,
         newSalary:this.state.newSalary

        }
    
        console.log(mem);
    
        axios.put('/updateSalary', mem)
        .then(res => this.setState({text:res.data}));
    
        //window.location = '/';
      }
   
    render() {
        return (
            <div>
             <h3>View attendance record</h3>
              <form onSubmit={this.onSubmit}>
              <div className="form-group"> 
          <label>id: </label>
          <input  newSalary="text"
              required
              className="form-control"
              value={this.state.memberID}
              onChange={this.onChangeID}
              />
              </div>
              <div className="form-group"> 
          <label>newSalary : </label>
          <input  newSalary="text"
              required
              className="form-control"
              value={this.state.newSalary}
              onChange={this.onChangenewSalary}
              />
              </div>
              <div className="form-group">
               <input type="submit" value="update " className="btn btn-primary" />
               </div>
                </form>
                <label>{this.state.text}</label>
                </div>
               
           
        )
    }
}
