import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

export default class DeleteInstructor extends Component{
    
    constructor(props)
    {
        super(props);
        this.state={
            //token
            hodid:0,
            courseName: "",
            id:0,
            text: ""
        }
        this.handleChangingID = this.handleChangingID.bind(this);
        this.handleChangingCourse = this.handleChangingCourse.bind(this);

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
    handleChangingCourse(event)
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
            id: this.state.id,
            courseName:this.state.courseName
        }

        console.log(instructor);

        axios.post('http://localhost:5000/instructorDelete', instructor,  {headers: {'auth-token':localStorage.getItem('auth-token')}})
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
              <label htmlFor="exampleInputInstructorID1" className="form-label">Course to Be Deleted From</label>
              <input type="id" className="form-control" value={this.state.courseName} onChange= {this.handleChangingCourse} id="exampleInputInstructorID1"/>
            </div>
            
            <button onClick={this.handleClick} type="submit" className="btn btn-primary">Delete Instructor</button>
          </form>

            <p>         </p>
            <h1>{this.state.text}</h1>
          </div>
          
        )
    }
}
