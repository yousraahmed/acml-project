import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

export default class Coverage extends Component{
    
        constructor(props)
    {
        super(props);
        this.state={
            //token
            hodid:0,
            course:"",
            text:[]
        }
        

        //token 
        this.handleChangingHODID = this.handleChangingHODID.bind(this)

        this.handleChangingCourse = this.handleChangingCourse.bind(this)

        this.handleClick = this.handleClick.bind(this)
        
    }
    //token
    handleChangingHODID(e)
    {
        this.setState({
            hodid: e.target.value
        })
    }

    handleChangingCourse(e)
    {
        this.setState({
            course: e.target.value
        })
    }
    
    
    handleClick(e)
    {
        e.preventDefault();

        const course = {
            //token
            hodid: this.state.hodid,
            course: this.state.course
        }

        console.log(course);

        axios.post('http://localhost:5000/coverage', course,  {headers: {'auth-token':localStorage.getItem('auth-token')}})
        .then(res => {console.log(res.data);
            if(res.data.length>0){
                let temp=[]
                for(let i=0;i<res.data.length;i++)
                {
                  temp.push(res.data[i])
                }
                 this.setState({text:temp})
              
              }
          })
    }
    render() {

        return( 
            <div>

            <form>

            <div className="mb-3">
              <label htmlFor="exampleInputHODID1" className="form-label">HOD ID</label>
              <input type="hodid" className="form-control" value={this.state.hodid} onChange= {this.handleChangingHODID} id="exampleInputHODID1"/>
            </div>

            <div className="mb-3">
              <label htmlFor="exampleInputHODID1" className="form-label">Course</label>
              <input type="hodid" className="form-control" value={this.state.course} onChange= {this.handleChangingCourse} id="exampleInputHODID1"/>
            </div>

            <button onClick={this.handleClick} type="submit" className="btn btn-primary">View Coverage</button>
          </form>

          <h1>Results:  </h1>
          <div>  
                 {this.state.text.map(text=>
                 <div>
                 <h4>course: {text.course}</h4>
                 <p>coverage : {text.coverage}</p>
                 <p>.</p>  
                 </div>
                 )} 
            </div>

          </div>
        )
    }
}