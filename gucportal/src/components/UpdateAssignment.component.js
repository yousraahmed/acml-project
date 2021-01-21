import React, {Component} from 'react';
import axios from 'axios';

export default class instructor extends Component{
  constructor(props){
    super(props);
    this.handleChangeSlotTime = this.handleChangeSlotTime.bind(this);
    this.handleChangeSlotLocation = this.handleChangeSlotLocation.bind(this);
    this.handleChangeCourseName = this.handleChangeCourseName.bind(this);
    this.handleChangeInstructorID = this.handleChangeInstructorID.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state={
      instructorID:'',
      slotTime:'',
      slotLocation:'',
      courseName:''
    }
  }

  componentDidMount(){

  }

  handleChangeSlotTime(e){
    this.setState({
      slotTime: e.target.value
    })
  }

  handleChangeCourseName(e){
    this.setState({
      courseName: e.target.value
    })
  }

  handleChangeInstructorID(e){
    this.setState({
      instructorID: e.target.value
    })
  }

  handleChangeSlotLocation(e){
    this.setState({
      slotLocation: e.target.value
    })
  }

  onSubmit(e){
    e.preventDefault();

    const newAssignment ={
      instructorID: this.state.instructorID,
      slotTime: this.state.slotTime,
      slotLocation: this.state.slotLocation,
      courseName: this.state.courseName
    }
    console.log(newAssignment);

    axios.put('/UpdateAssignment', newAssignment,{headers:{'auth-token':localStorage.getItem('auth-token')}})
    .then(res => this.setState({text:res.data}));
  }

      render() {
        return (
            <div>
             <h3>Update Academic member's assignment</h3>
              <form onSubmit={this.onSubmit}>
              <div className="form-group"> 
          <label>Instructor ID: </label>
          <input  type="text"
            //  required
              className="form-control"
              value={this.state.instructorID}
              onChange={this.handleChangeInstructorID}
              />
              </div>
              <div className="form-group"> 
          <label>Slot time: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.slotTime}
              onChange={this.handleChangeSlotTime}
              />
              </div>
                 <div className="form-group"> 
          <label>Slot location: </label>
          <input  type="text"
             // required
              className="form-control"
              value={this.state.slotLocation}
              onChange={this.handleChangeSlotLocation}
              />
        </div>
        <div className="form-group"> 
          <label>Course name: </label>
          <input  type="text"
             // required
              className="form-control"
              value={this.state.courseName}
              onChange={this.handleChangeCourseName}
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

