import React, {Component} from 'react';
import axios from 'axios';

export default class viewSlotAssign extends Component{
  constructor(props){
    super(props);

    this.instructorID = this.instructorID.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state={
      instructorID:'',
      coursename:'',
      text:[]
    }
  }

  componentDidMount(){

  }

  instructorID(e){
    this.setState({
      instructorID: e.target.value
    })
  }
  onSubmit(e){
    e.preventDefault();
    const slassignment={
      instructorID:this.state.instructorID,
      coursename: this.state.coursename
    }
    console.log(slassignment);

    axios.get('/viewSlotAssign',{headers:{'auth-token':localStorage.getItem('auth-token')}}, slassignment)
    .then((res )=> {
            if(res.data.length>0){
              let temp=[]
              for(let i=0;i<res.data.length;i++){
                temp.push(res.data[i])
              }
              this.setState({text:temp})
            }
          });  
  }

  render() {
        return (
            <div>
             <h3>View Slot assignment</h3>
              <form onSubmit={this.onSubmit}>
              <div className="form-group"> 
          <label>Instructor ID: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.instructorID}
              onChange={this.instructorID}
              />
              </div>

                 <div className="form-group">
               <input type="submit" value="view" className="btn btn-primary" />
               </div>
                </form>
                <label>{this.state.text}</label>
                </div>
               
           
        )
    }

}

















