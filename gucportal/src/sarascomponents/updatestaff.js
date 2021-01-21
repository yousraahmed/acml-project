import React, { Component } from 'react'
import axios from "axios"

export default class hr extends Component {
    
    constructor(props){
        super(props)
        this.handleChangeEmail=this.handleChangeEmail.bind(this)
        this.handleChangeID=this.handleChangeID.bind(this)
        this.handleChangeSalary=this.handleChangeSalary.bind(this)
        this.handleChangeOffice=this.handleChangeOffice.bind(this)
        this.handleChangeDepartment=this.handleChangeDepartment.bind(this)
        this.handleChangeName=this.handleChangeName.bind(this)
        this.onSubmit = this.onSubmit.bind(this);
        this.state={
           email:'',
           office:'',
           salary:0,
           department:'',
           name:'',
           id:'',
           text:""

        }
    }

    componentDidMount (){
      
        //axios.post("/staffAffairs").then(response =>{
        
       // })
     }
    handleChangeEmail(evt) {
      this.setState({
          email:evt.target.value
      })
      }
      handleChangeID(evt) {
        this.setState({
            id:evt.target.value
        })
        }
    handleChangeOffice(evt) {
        this.setState({
            office:evt.target.value
        })} 
    handleChangeSalary(evt) {
            this.setState({
                salary:evt.target.value
            })}  
 handleChangeName(evt) {
    this.setState({
      name:evt.target.value
                })} 
handleChangeDepartment(evt) {
  this.setState({
    department:evt.target.value
     })}    
     
     onSubmit(e) {
        e.preventDefault();
    
        const user = {
          id:this.state.id,
          name: this.state.name,
          department: this.state.department,
          office: this.state.office,
         salary: this.state.salary,
         email:this.state.email
        }
    
        console.log(user);
    
        axios.put('/hr/staffAffairs', user)
          .then(res => this.setState({text:res.data}));
    
        //window.location = '/';
      }
   
    render() {
        return (
            <div>
             <h3>UPDATE STAFF (the field you dont want to update write the old value)</h3>
              <form onSubmit={this.onSubmit}>
              <div className="form-group"> 
          <label>Email: </label>
          <input  type="text"
            //  required
              className="form-control"
              value={this.state.email}
              onChange={this.handleChangeEmail}
              />
              </div>
              <div className="form-group"> 
          <label>ID: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.id}
              onChange={this.handleChangeID}
              />
              </div>
                 <div className="form-group"> 
          <label>Office: </label>
          <input  type="text"
             // required
              className="form-control"
              value={this.state.office}
              onChange={this.handleChangeOffice}
              />
        </div>
        <div className="form-group"> 
          <label>Salary: </label>
          <input  type="text"
             // required
              className="form-control"
              value={this.state.salary}
              onChange={this.handleChangeSalary}
              />
        </div>
         <div className="form-group"> 
          <label>Department: </label>
          <input  type="text"
              
              className="form-control"
              value={this.state.department}
              onChange={this.handleChangeDepartment}
              />
        </div>
        <div className="form-group"> 
          <label>Name: </label>
          <input  type="text"
             
              className="form-control"
              value={this.state.name}
              onChange={this.handleChangeName}
              />
        </div>
                <div className="form-group">
               <input type="submit" value="update" className="btn btn-primary" />
               </div>
                </form>
                <label>{this.state.text}</label>
                </div>
               
           
        )
    }
}
