import React, { Component } from 'react'
import axios from "axios"

export default class hr extends Component {
    
    constructor(props){
        super(props)
        this.handleChangeCourseName=this.handleChangeCourseName.bind(this)
        this.handleChangeDepartmentName=this.handleChangeDepartmentName.bind(this)
        this.onSubmit = this.onSubmit.bind(this);
        this.state={
          courseName:'',
          departmentName:'',
           text:""

        }
    }

    componentDidMount (){
      
        //axios.post("/staffAffairs").then(response =>{
        
       // })
     }
    handleChangeCourseName(evt) {
      this.setState({
          courseName:evt.target.value
      })
      }
      handleChangeDepartmentName(evt) {
        this.setState({
            departmentName:evt.target.value
        })
        }
    onSubmit(e) {
        e.preventDefault();
    
        const cour = {
         courseName:this.state.courseName,
         departmentName:this.state.departmentName
        }
    
        console.log(cour);
    
        axios.post('/hr/deleteCourse', cour)
          .then(res => this.setState({text:res.data}));
    
        //window.location = '/';
      }
   
    render() {
        return (
            <div>
             <h3>delete course</h3>
              <form onSubmit={this.onSubmit}>
              <div className="form-group"> 
          <label>Course name: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.courseName}
              onChange={this.handleChangeCourseName}
              />
              </div>
              <div className="form-group"> 
          <label>Department name: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.departmentName}
              onChange={this.handleChangeDepartmentName}
              />
              </div>
                 <div className="form-group">
               <input type="submit" value="delete course" className="btn btn-primary" />
               </div>
                </form>
                <label>{this.state.text}</label>
                </div>
               
           
        )
    }
}