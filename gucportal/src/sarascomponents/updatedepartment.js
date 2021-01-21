import React, { Component } from 'react'
import axios from "axios"

export default class hr extends Component {
    
    constructor(props){
        super(props)
        this.handleChangeFacultyName=this.handleChangeFacultyName.bind(this)
        this.handleChangeDepartmentName=this.handleChangeDepartmentName.bind(this)
        this.handleChangeDepartmentName2=this.handleChangeDepartmentName2.bind(this)
        this.onSubmit = this.onSubmit.bind(this);
        this.state={
          facultyName:'',
          departmentName:'',
          departmentName2:'',
           text:""

        }
    }

    componentDidMount (){
      
        //axios.post("/staffAffairs").then(response =>{
        
       // })
     }
    handleChangeFacultyName(evt) {
      this.setState({
          facultyName:evt.target.value
      })
      }
      handleChangeDepartmentName(evt) {
        this.setState({
            departmentName:evt.target.value
        })
        }
        handleChangeDepartmentName2(evt) {
            this.setState({
                departmentName2:evt.target.value
            })
            }
    onSubmit(e) {
        e.preventDefault();
    
        const dep = {
         facultyName:this.state.facultyName,
         departmentName:this.state.departmentName,
         departmentName2:this.state.departmentName2
        }
    
        console.log(dep);
    
        axios.put('/hr/departmentAffairs', dep)
          .then(res => this.setState({text:res.data}));
    
        //window.location = '/';
      }
   
    render() {
        return (
            <div>
             <h3>update department</h3>
              <form onSubmit={this.onSubmit}>
              <div className="form-group"> 
          <label>Faculty name: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.facultyName}
              onChange={this.handleChangeFacultyName}
              />
              </div>
              <div className="form-group"> 
          <label>the department to be updated: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.departmentName}
              onChange={this.handleChangeDepartmentName}
              />
              </div>
              <div className="form-group"> 
          <label>the new department name: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.departmentName2}
              onChange={this.handleChangeDepartmentName2}
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