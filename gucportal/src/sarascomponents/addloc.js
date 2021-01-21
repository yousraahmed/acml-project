import React, { Component } from 'react'
import axios from "axios"

export default class hr extends Component {
    
    constructor(props){
        super(props)
        this.handleChangeLocation=this.handleChangeLocation.bind(this)
        this.handleChangeCapacity=this.handleChangeCapacity.bind(this)
        this.handleChangeType=this.handleChangeType.bind(this)
        this.onSubmit = this.onSubmit.bind(this);
        this.state={
          location:'',
          capacity:'',
          type:'',
           text:""

        }
    }

    componentDidMount (){
      
        //axios.post("/staffAffairs").then(response =>{
        
       // })
     }
    handleChangeLocation(evt) {
      this.setState({
          location:evt.target.value
      })
      }
    handleChangeType(evt) {
        this.setState({
            type:evt.target.value
        })} 
    handleChangeCapacity(evt) {
            this.setState({
                capacity:evt.target.value
            })}   
     
     onSubmit(e) {
        e.preventDefault();
    
        const loc = {
         location:this.state.location,
         capacity:this.state.capacity,
         type:this.state.type
        }
    
        console.log(loc);
    
        axios.post('/hr/locationAffairs', loc)
          .then(res => this.setState({text:res.data}));
    
        //window.location = '/';
      }
   
    render() {
        return (
            <div>
             <h3>Add new location</h3>
              <form onSubmit={this.onSubmit}>
              <div className="form-group"> 
          <label>Location: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.location}
              onChange={this.handleChangeLocation}
              />
              </div>
                 <div className="form-group"> 
          <label>Type: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.type}
              onChange={this.handleChangeType}
              />
        </div>
        <div className="form-group"> 
          <label>Capacity: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.capacity}
              onChange={this.handleChangeCapacity}
              />
        </div>
         
                <div className="form-group">
               <input type="submit" value="Add location" className="btn btn-primary" />
               </div>
                </form>
                <label>{this.state.text}</label>
                </div>
               
           
        )
    }
}
