import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

export default class AssignInstructor extends Component{
    
    constructor(props)
    {
        super(props);
        this.state={
            //token
            hodid:0,
            id:0,
            name: "",
            email: "",
            password: "",
            courseName:'',
            gender: "",
            salary:0,
            text: ""

        }
        this.handleChangingID = this.handleChangingID.bind(this);
        this.handleChangingCourseName = this.handleChangingCourseName.bind(this)
        this.handleChangingName = this.handleChangingName.bind(this);
        this.handleChangingEmail = this.handleChangingEmail.bind(this);
        this.handleChangingPass = this.handleChangingPass.bind(this);
        this.handleChangingGender = this.handleChangingGender.bind(this);
        this.handleChangingSalary = this.handleChangingSalary.bind(this);

        //token 
        this.handleChangingHODID = this.handleChangingHODID.bind(this)

        this.handleClick = this.handleClick.bind(this)
        
    }
    //token
    handleChangingHODID(event)
    {
        this.setState({
            hodid: event.target.value
        })
    }
    handleChangingID(event)
    {
        this.setState({
            id: event.target.value
        })
    }
    handleChangingName(event)
    {
        this.setState({
            name: event.target.value
        })
    }
    handleChangingEmail(event)
    {
        this.setState({
            email: event.target.value
        })
    }
    handleChangingPass(event)
    {
        this.setState({
            pass: event.target.value
        })
    }
    handleChangingGender(event)
    {
        this.setState({
            gender: event.target.value
        })
    }
    handleChangingSalary(event)
    {
        this.setState({
            salary: event.target.value
        })
    }
    handleChangingCourseName(event)
    {
        this.setState({
            courseName: event.target.value
        })
    }
    
    handleClick(event)
    {
        event.preventDefault();

        const instructor = {
            //token
            hodid: this.state.hodid,

            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            gender: this.state.gender,
            salary:0,
            id: this.state.id,
            courseName: this.state.courseName
        }

        console.log(instructor);

        axios.post('http://localhost:5000/instructorAssign', instructor,  {headers: {'auth-token':localStorage.getItem('auth-token')}})
        .then(res => this.setState({text:res.data}))
          

        
    }
    
    render()
    {
                    //token in first div in each form
        return(
            <div>
            <form>
            <div className="mb-3">
              <label htmlFor="exampleInputHODID1" className="form-label">HOD ID</label>
              <input type="hodid" className="form-control" value={this.state.hodid} onChange= {this.handleChangingHODID} id="exampleInputHODID1"/>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputInstructorID1" className="form-label">Instructor ID</label>
              <input type="id" className="form-control" value={this.state.id} onChange= {this.handleChangingID} id="exampleInputInstructorID1"/>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputInstructorID1" className="form-label">Name</label>
              <input type="id" className="form-control" value={this.state.name} onChange= {this.handleChangingName} id="exampleInputInstructorID1"/>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputInstructorID1" className="form-label">Email</label>
              <input type="id" className="form-control" value={this.state.email} onChange= {this.handleChangingEmail} id="exampleInputInstructorID1"/>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputInstructorID1" className="form-label">Password</label>
              <input type="id" className="form-control" value={this.state.pass} onChange= {this.handleChangingPass} id="exampleInputInstructorID1"/>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputInstructorID1" className="form-label">Gender</label>
              <input type="id" className="form-control" value={this.state.gender} onChange= {this.handleChangingGender} id="exampleInputInstructorID1"/>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputInstructorID1" className="form-label">Salary</label>
              <input type="id" className="form-control" value={this.state.salary} onChange= {this.handleChangingSalary} id="exampleInputInstructorID1"/>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputCourse1" className="form-label">Course to be assigned to</label>
              <input type="course" className="form-control" value={this.state.courseName} onChange= {this.handleChangingCourseName} id="exampleInputCourse1"/>
            </div>
            <button onClick={this.handleClick} type="submit" className="btn btn-primary">Assign Instructor</button>
          </form>

          <p>         </p>
            <h1>{this.state.text}</h1>
          </div>
          
        )
    }
}
