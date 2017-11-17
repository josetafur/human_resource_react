import React from 'react';
import axios from 'axios';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

export default class EmployeeForm extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      name: this.props.employee.name,
      last_name: this.props.employee.last_name,
      job_position: this.props.employee.job_position,
      team: this.props.employee.team,
      phone: this.props.employee.phone
    }

    // this.handleInput = this.handleInput.bind(this);
  }

  handleInput = (e)=>{
    this.setState({[e.target.name]: e.target.value})
  }

  handleSubmit = (e)=>{
    const employee = {
      name: this.state.name,
      last_name: this.state.last_name,
      job_position: this.state.job_position,
      team: this.state.team,
      phone: this.state.phone
    }

    axios.put(
      "http://localhost:3000/api/v1/employees/"+this.props.employee.id,
      {
          employee: employee
      })
    .then(response=>{
      console.log(response);
      this.props.updateEmployee(response.data);
    })
    .catch(error=> console.log(error))
  }

  render(){
    return(
      <form onSubmit={this.handleSubmit} >
        <TextField hintText="Ingrese nombre" name="name" value={this.state.name} ref={this.props.nameRef} /><br/>
        <TextField hintText="Ingrese apellidos" name="last_name" value={this.state.last_name} /><br/>
        <TextField hintText="Ingrese ocupación" name="job_position" value={this.state.job_position}/><br/>
        <TextField hintText="Ingrese equipo" name="team" value={this.state.team} /><br/>
        <TextField hintText="Ingrese teléfono" name="phone" value={this.state.phone} /><br/>
      </form>
    )
  }
}
