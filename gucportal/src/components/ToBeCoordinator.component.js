import React, {Component} from 'react';
import axios from 'axios';




export default class coordinator extends Component{
constructor(props){
    super(props);
    this.handleChangeRole= this.handleChangeRole.bind(this);
    this.handleName= this.handleName.bind(this);
    this.handleChangeOfficeLocation= this.handleChangeOfficeLocation.bind(this);
    this.handleDepartment= this.handleDepartment.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handleID = this.handleID.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state ={
      name:'',
      id:'',
      department:'',
      officeLocation:'',
      role:'',
      email:'' 
    }
  }

  componentDidMount(){
    
    
  }

  handleChangeRole(e){
    this.setState({
      role: e.target.value
    });
  }
  handleChangeOfficeLocation(e){
    this.setState({
      officeLocation: e.target.value
    });
  }
  handleDepartment(e){
    this.setState({
      department: e.target.value
    });
  }
  handleEmail(e){
    this.setState({
      email: e.target.value
    });
  }
  handleID(e){
    this.setState({
      id: e.target.value
    });
  }
  handleName(e){
    this.setState({
      name: e.target.value
    })
  }
  onSubmit(e){
    e.preventDefault();

    const newCoordinator={
      name: this.state.name,
      id: this.state.id,
      email: this.state.email,
      department: this.state.department,
      officeLocation: this.state.officeLocation,
      role: this.state.role
    }
     console.log(newCoordinator)
     axios.put('/tbcoordinator', newCoordinator,{headers:{'auth-token':localStorage.getItem('auth-token')}})
     .then(res => this.setState({text:res.data}));

  }

  render() {
        return (
            <div>
             <h3>Update academic member to be co-ordinator</h3>
             <h5>If you don't want to change something write it as it is.</h5>
             <h6>Fill the data of the required to change member:</h6>
              <form onSubmit={this.onSubmit}>
              <div className="form-group"> 
          <label>Name: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.name}
              onChange={this.handleName}
              />
              </div>
              <div className="form-group"> 
          <label>ID: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.id}
              onChange={this.handleID}
              />
              </div>
              <div className="form-group"> 
          <label>email: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.email}
              onChange={this.handleEmail}
              />
              </div>
               <div className="form-group"> 
          <label>Depratment: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.department}
              onChange={this.handleDepartment}
              />
              </div>
               <div className="form-group"> 
          <label>New role: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.role}
              onChange={this.handleChangeRole}
              />
              </div>
               <div className="form-group"> 
          <label>New office location: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.officeLocation}
              onChange={this.handleChangeOfficeLocation}
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
