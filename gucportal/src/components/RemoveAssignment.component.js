import React, {Component} from 'react';
import axios from 'axios';

export default class remove extends Component{
  constructor(props){
    super(props);
    this.handleChangeSlotTime = this.handleChangeSlotTime.bind(this);
    this.handleChangeAssignment = this.handleChangeAssignment.bind(this);
    this.handleChangeSlotLocation = this.handleChangeSlotLocation.bind(this);
    this.handleChangeInstructorID = this.handleChangeInstructorID.bind(this);
    this.handleChangeCourseName = this.handleChangeCourseName.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state={
      slotTime:'',
      slotLocation:'',
      instructorID:'',
      assigned:'',
      courseName:''
    }
  }

  componentDidMount(){

  }

  handleChangeAssignment(e){
    this.setState({
      assigned: e.target.value
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

  handleChangeSlotTime(e){
    this.setState({
      slotTime: e.target.value
    })
  }

  onSubmit(e){
    e.preventDefault();

    const removeassignment={
      instructorID: this.state.instructorID,
      courseName: this.state.courseName,
      slotTime: this.state.slotTime,
      slotLocation: this.state.slotLocation,
      assigned: this.state.assigned
    }

    console.log(removeassignment);
    axios.delete('/updateAssignment',removeassignment,{headers:{'auth-token':localStorage.getItem('auth-token')}})
    .then(res => this.setState({text:res.data}));
  }

  render() {
        return (
            <div>
             <h3>Remove assignment of an academic member</h3>
              <form onSubmit={this.onSubmit}>
              <div className="form-group"> 
          <label>Instructor ID: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.instructorID}
              onChange={this.handleChangeInstructorID}
              />
              </div>

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
              required
              className="form-control"
              value={this.state.slotLocation}
              onChange={this.handleChangeSlotLocation}
              />
              </div>

              <div className="form-group"> 
          <label>Assigned: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.assigned}
              onChange={this.handleChangeAssignment}
              />
              </div>
                
                <div className="form-group">
               <input type="submit" value="Remove" className="btn btn-primary" />
               </div>
                </form>
                <label>{this.state.text}</label>
                </div>
               
           
        )
    }

}

// export default class RemoveAssignment extends Component{
//   render(){
//     return(
//       <div>
//         <p> You are on the Remove assignment component </p>
//       </div>  
//     )
//   }

// }
