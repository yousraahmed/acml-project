import React, { Component } from 'react'
import axios from "axios"

export default class hr extends Component {
    
    constructor(props){
        super(props)
        this.onChangeID=this.onChangeID.bind(this)
        this.onChangeType=this.onChangeType.bind(this)
        this.onSubmit = this.onSubmit.bind(this);
        this.state={
          memberID:"",
          type:'',
           text:[]

        }
    }

    componentDidMount (){
      
        //axios.post("/staffAffairs").then(response =>{
        
       // })
     }
    onChangeID(evt) {
      this.setState({
        memberID:evt.target.value
      })
      }
      onChangeType(evt) {
        this.setState({
         type:evt.target.value
        })
        }
    onSubmit(e) {
        e.preventDefault();
    
        const mem = {

         id:this.state.memberID,
         type:this.state.type

        }
    
        console.log(mem);
    
        axios.post('/viewMissingHoursOrDays', mem)
        .then((res )=> {
            if(res.data.length>0){
              let temp=[]
              for(let i=0;i<res.data.length;i++){
                temp.push(res.data[i])
              }
              this.setState({text:temp})
            }
          });
    
        //window.location = '/';
      }
   
    render() {
        return (
            <div>
             <h3>View attendance record</h3>
              <form onSubmit={this.onSubmit}>
              <div className="form-group"> 
          <label>id: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.memberID}
              onChange={this.onChangeID}
              />
              </div>
              <div className="form-group"> 
          <label>TYPE (days or hours) : </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.type}
              onChange={this.onChangeType}
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
