import React, {Component} from 'react';
import axios from 'axios';



export default class coveragee extends Component{

  constructor(props){
    super(props);
    this.viewcourseName = this.viewcourseName.bind(this);
    this.viewcoverage= this.viewcoverage.bind(this);
    this.viewinstructorID= this.viewinstructorID.bind(this);
    this.onSubmit= this.onSubmit.bind(this);
    this.state = {
      courseName:'',
      coverage:'',
      instructorID:'',
      text:[]
    }
  }

  componentDidMount(){
    
  }

  viewcourseName(e){
    this.setState({
      courseName: e.target.value
    })
  }
  viewcoverage(e){
    this.setState({
      coverage: e.target.value
    })
  }
  viewinstructorID(e){
    this.setState({
      instructorID: e.target.value
    })
  }
  onSubmit(e){
    e.preventDefault();

    const cov ={
      courseName: this.state.courseName,
      coverage: this.state.coverage,
      instructorID: this.state.instructorID
    }
    console.log(cov);

    axios.get('/viewCoverage',{headers:{'auth-token':localStorage.getItem('auth-token')}},cov)
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
             <h3>View course coverage</h3>
              <form onSubmit={this.onSubmit}>
              <div className="form-group"> 
          <label>Instructor ID: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.instructorID}
              onChange={this.viewinstructorID}
              />
              </div>
              <div className="form-group"> 
          <label>Course name: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.courseName}
              onChange={this.viewcourseName}
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
