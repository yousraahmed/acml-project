import React, { Component } from 'react'
import axios from "axios"

export default class hr extends Component {
    
    constructor(props){
        super(props)
        this.handleChangedepartmentName=this.handleChangedepartmentName.bind(this)
        this.handleChangecourseName=this.handleChangecourseName.bind(this)
        this.handleChangecourseName2=this.handleChangecourseName2.bind(this)
        this.onSubmit = this.onSubmit.bind(this);
        this.state={
          departmentName:'',
          courseName:'',
          courseName2:'',
           text:""

        }
    }

    componentDidMount (){
      
        //axios.post("/staffAffairs").then(response =>{
        
       // })
     }
    handleChangedepartmentName(evt) {
      this.setState({
          departmentName:evt.target.value
      })
      }
      handleChangecourseName(evt) {
        this.setState({
            courseName:evt.target.value
        })
        }
        handleChangecourseName2(evt) {
            this.setState({
                courseName2:evt.target.value
            })
            }
    onSubmit(e) {
        e.preventDefault();
    
        const dep = {
         departmentName:this.state.departmentName,
         courseName:this.state.courseName,
         courseName2:this.state.courseName2
        }
    
        console.log(dep);
    
        axios.put('/courseAffairs', dep)
          .then(res => this.setState({text:res.data}));
    
        //window.location = '/';
      }
   
    render() {
        return (
            <div>
             <h3>update course</h3>
              <form onSubmit={this.onSubmit}>
              <div className="form-group"> 
          <label>department name: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.departmentName}
              onChange={this.handleChangedepartmentName}
              />
              </div>
              <div className="form-group"> 
          <label>the course to be updated: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.courseName}
              onChange={this.handleChangecourseName}
              />
              </div>
              <div className="form-group"> 
          <label>the new course name: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.courseName2}
              onChange={this.handleChangecourseName2}
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