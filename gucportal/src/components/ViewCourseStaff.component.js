import React, {Component} from 'react';
import axios from 'axios';



export default class courstaff extends Component{

  constructor(props){
    super(props);
    this.onSubmit= this.onSubmit.bind(this);
    this.handleCourseName = this.handleCourseName.bind(this);
    this.state = {
      courseName:''
      };

  }

  componentDidMount(){
 
  }
  
  handleCourseName(e){
    this.setState({
      courseName: e.target.value
    })
  }


  onSubmit(e){
    e.preventDefault();
    const coursestaff ={
      coursename: this.state.coursename
    }
    console.log(coursestaff)
    axios.get('/allStaff',{headers:{'auth-token':localStorage.getItem('auth-token')}}, coursestaff)
    .then((res)=>{
      if(res.data.length>0){
              let temp=[]
              for(let i=0;i<res.data.length;i++){
                temp.push(res.data[i])
              }
              this.setState({text:temp})
            }
    })

  }

   render() {
        return (
            <div>
             <h3>View staff by course</h3>
              <form onSubmit={this.onSubmit}>
              <div className="form-group"> 
          <label>Course name: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.courseName}
              onChange={this.handleCourseName}
              />
              </div>
              <div className="form-group">
               <input type="submit" value="View" className="btn btn-primary" />
               </div>
                </form>
                <label>{this.state.text}</label>
                </div>
               
           
        )
    }

}
