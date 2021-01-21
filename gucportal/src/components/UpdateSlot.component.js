import React, {Component} from 'react';
import axios from 'axios';
export default class update extends Component{
  constructor(props){
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleInstructorID = this.handleInstructorID.bind(this);
    //this.handleAssigned = this.handleAssigned.bind(this);
    this.handleSlotTime = this.handleSlotTime.bind(this);
    this.handleSlotLocation = this.handleSlotLocation.bind(this);
    this.handleCourseName = this.handleCourseName.bind(this);
    this.handleDepartment = this.handleDepartment.bind(this);
    this.state={
      instructorID:'',
      //assigned:'',
      slotTime:'',
      slotLocation:'',
      courseName:'',
      department:''
    }
  }

    componentDidMount(){

    }

    handleInstructorID(e){
      this.setState({
        instructorID: e.target.value
      })
    }
    // handleAssigned(e){
    //   this.setState({
    //     assigned: e.target.value
    //   })
    // }
    handleSlotTime(e){
      this.setState({
        slotTime: e.target.value
      })
    }
    handleSlotLocation(e){
      this.setState({
        slotLocation: e.target.value
      })
    }
    handleCourseName(e){
      this.setState({
        courseName: e.target.value
      })
    }
    handleDepartment(e){
      this.setState({
        department: e.target.value
      })
    }

    onSubmit(e){
      e.preventDefault();
      const update ={
        instructorID: this.state.instructorID,
        //assigned: true,
        slotTime:this.state.slotTime,
        slotLocation: this.state.slotLocation,
        department: this.state.department,
        courseName: this.state.courseName,
      }

      console.log(update);
      axios.put('/coordinator/courseSlotsUpdate', update,{headers:{'auth-token':localStorage.getItem('auth-token')}})
      .then(res => this.setState({text:res.data}));
    }

  
  render() {
        return (
            <div>
             <h3>Update slot</h3>
             <h6>If you want to keep an old value write it as it is.</h6>
              <form onSubmit={this.onSubmit}>
              <div className="form-group"> 
          <label>Instructor ID: </label>
          <input  type="text"
            //  required
              className="form-control"
              value={this.state.instructorID}
              onChange={this.handleInstructorID}
              />
              </div>
              <div className="form-group"> 
          <label>Slot time: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.slotTime}
              onChange={this.handleSlotTime}
              />
              </div>
                 <div className="form-group"> 
          <label>Slot location: </label>
          <input  type="text"
             // required
              className="form-control"
              value={this.state.slotLocation}
              onChange={this.handleSlotLocation}
              />
        </div>
        <div className="form-group"> 
          <label>Course name: </label>
          <input  type="text"
             // required
              className="form-control"
              value={this.state.courseName}
              onChange={this.handleCourseName}
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


//