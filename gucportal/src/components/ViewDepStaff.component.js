import React, {Component} from 'react';
import axios from 'axios';



export default class courstaff extends Component{

  constructor(props){
    super(props);
    this.onSubmit= this.onSubmit.bind(this);
    this.handledepartmentName = this.handledepartmentName.bind(this);
    this.state = {
      departmentName:''
      };

  }

  componentDidMount(){
 
  }
  
  handledepartmentName(e){
    this.setState({
      departmentName: e.target.value
    })
  }


  onSubmit(e){
    e.preventDefault();
    const depstaff ={
      departmentName: this.state.departmentName
    }
    console.log(depstaff)
    axios.get('/allStaff',{headers:{'auth-token':localStorage.getItem('auth-token')}}, depstaff)
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
             <h3>View staff by department</h3>
              <form onSubmit={this.onSubmit}>
              <div className="form-group"> 
          <label>Department name: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.departmentName}
              onChange={this.handledepartmentName}
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


//e.log(myinfo)
//etstate({err:"profile Updated!"})
//es= await axios.put('/updateprofile',myinfo,{headers:{'auth-token':localStorage.getItem('auth-token')}})
//Storage.setItem('auth-token',res.data)