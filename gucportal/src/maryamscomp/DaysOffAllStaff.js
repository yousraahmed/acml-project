import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

export default class DaysOffAllStaff extends Component{
    
        constructor(props)
    {
        super(props);
        this.state={
            //token
            hodid:0,
            text:[]
        }
        

        //token 
        this.handleChangingHODID = this.handleChangingHODID.bind(this)

        this.handleClick = this.handleClick.bind(this)
        
    }
    //token
    handleChangingHODID(e)
    {
        this.setState({
            hodid: e.target.value
        })
    }
    
    
    handleClick(e)
    {
        e.preventDefault();

        const hod = {
            //token
            hodid: this.state.hodid
        }

        console.log(hod);


        axios.post('http://localhost:5000/daysOffAllStaff', hod,  {headers: {'auth-token':localStorage.getItem('auth-token')}})
        .then((res) => { 
            console.log(res.data)
             if(res.data.length>0){
                 let temp=[]
                 for(let i=0;i<res.data.length;i++)
                 {
                   temp.push(res.data[i])
                 }
                  this.setState({text:temp})
               
               }
               

              
          });

          

    }
    render() {

        return( 
            <div>
            <form>

            <div className="mb-3">
              <label htmlFor="exampleInputHODID1" className="form-label">HOD ID</label>
              <input type="hodid" className="form-control" value={this.state.hodid} onChange= {this.handleChangingHODID} id="exampleInputHODID1"/>
            </div>
            
            <button onClick={this.handleClick} type="submit" className="btn btn-primary">View Days Off</button>

          </form>

          <h1>Results:  </h1>
          

           <div>
              
                 {this.state.text.map(text=>
                 <div>
                 <h4>Name :{text.name}</h4>
                 <p>ID : {text.id}</p>
                 <p>Days Off : {text.daysOff}</p>
                 <p>.</p>
                 </div>
                 )}
                
            </div>

          </div>

        )
    }

}