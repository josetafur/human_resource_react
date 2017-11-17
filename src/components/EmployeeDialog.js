import React from 'react';
import axios from 'axios';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import ErrorNotification from './ErrorNotification';

export default class EmployeeDialog extends React.Component{
  constructor(props){
    super(props);
    this.state = {
        errors: []
    }
  }

  handleInput = (e)=>{
    this.setState({[e.target.name]: e.target.value})
  }

  handleClick = ()=>{
    const employee = {
      name: this.state.name,
      last_name: this.state.last_name,
      job_position: this.state.job_position,
      team: this.state.team,
      phone: this.state.phone
    };

    axios.post(
        'http://localhost:3000/api/v1/employees',
        { employee }
    )
    .then(response=>{
      this.props.onSubmit(response.data)
      this.setState({open: false});
    })
    .catch(error =>{
      this.state.errors = error.response.data
    });
  }

  render(){
    return(
      <div>
        <Dialog title="Nuevo trabajador" modal={false} open={this.props.open} onRequestClose={this.props.onClose}>

          <form >
            <TextField hintText="Ingrese nombre" value={this.props.currentEmployee.name} name="name" onChange={this.handleInput}  ref={this.props.nameRef} /><br/>
            <TextField hintText="Ingrese apellidos" value={this.props.currentEmployee.last_name} name="last_name" onChange={this.handleInput}/><br/>
            <TextField hintText="Ingrese ocupación" value={this.props.currentEmployee.job_position} name="job_position" onChange={this.handleInput}/><br/>
            <TextField hintText="Ingrese equipo" value={this.props.currentEmployee.team} name="team" onChange={this.handleInput} /><br/>
            <TextField hintText="Ingrese teléfono" value={this.props.currentEmployee.phone || ''} name="phone" onChange={this.handleInput} /><br/>

            <RaisedButton label="Grabar" onClick={this.handleClick} ></RaisedButton>
          </form>
        </Dialog>
      </div>
    )

  }



}
