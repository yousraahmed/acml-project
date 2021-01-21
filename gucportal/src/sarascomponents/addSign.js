import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class CreateExercise extends Component {
  constructor(props) {
    super(props);

    this.onChangecheckIn = this.onChangecheckIn.bind(this);
    this.onChangecheckOut = this.onChangecheckOut.bind(this);
    this.onChangeID = this.onChangeID.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      checkIn: null,
     checkOut:null,
      id: "",
      date: new Date(),
     text:""
    }
  }

  componentDidMount() {
   

  }

  onChangecheckIn(date) {
    this.setState({
      checkIn: date
    })
  }

  onChangecheckOut(date) {
    this.setState({
     checkOut: date
    })
  }

  onChangeID(e) {
    this.setState({
      id: e.target.value
    })
  }

  onChangeDate(date) {
    this.setState({
      date: date
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const att= {
      checkIn: this.state.checkIn,
      checkOut: this.state.checkOut,
      id: this.state.id,
      date: this.state.date
    }

    console.log(att);

    axios.put('/hr/addMissingSign', att)
      .then(res => this.setState({text:res.data}));

   
  }

  render() {
    return (
    <div>
      <h3>Add missing sign</h3>
      <form onSubmit={this.onSubmit}>
       
        <div className="form-group">
          <label>checkIn: </label>
          <div>
            <DatePicker
             selected={this.state.checkIn}
              onChange={this.onChangecheckIn}
            />
          </div>
        </div>
        <div className="form-group">
          <label>checkOut: </label>
          <div>
            <DatePicker
             selected={this.state.checkOut}
              onChange={this.onChangecheckOut}
            />
          </div>
        </div>
        <div className="form-group">
          <label>Member id : </label>
          <input 
              type="text" 
              className="form-control"
              value={this.state.id}
              onChange={this.onChangeID}
              />
        </div>
        <div className="form-group">
          <label>Date: </label>
          <div>
            <DatePicker
              selected={this.state.date}
              onChange={this.onChangeDate}
            />
          </div>
        </div>

        <div className="form-group">
          <input type="submit" value="Add sign" className="btn btn-primary" />
        </div>
      </form>
      <label>{this.state.text}</label>
    </div>
    )
  }
}