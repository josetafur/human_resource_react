import React from 'react';
import axios from 'axios';
import RaisedButton from 'material-ui/RaisedButton';

import Employee from './Employee';
import EmployeeDialog from './EmployeeDialog';


export default class ListEmployees extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      employees: [],
      currentEmployee: {},
      open: false
    }

    this.addEmployee = this.addEmployee.bind(this)
  }

  componentDidMount(){
    axios.get('http://localhost:3000/api/v1/employees.json')
    .then(response=>{
      console.log(response)
      this.setState({employees: response.data})
    })
    .catch(err => console.log(err))
  }

  addEmployee(values){
    this.setState(prevState => {
      return {
        employees: [...prevState.employees, values]
      }
    })
  }

  handleOpen = () => {
    this.setState({
        open: true,
        currentEmployee: {}
      })
  }

  handleClose = () => {
    this.setState({open: false})
  }

  handleEmployeeClick = (employee) => () => {
    this.setState({
      open: true,
      currentEmployee: employee
    })
  }

  disableEmployee = (employee) => () => {
    // eliminar de la lista
    console.log(employee)
  }

  
  render(){
    return (
      <div>
        <EmployeeDialog onSubmit={this.addEmployee} open={this.state.open} onClose={this.handleClose} currentEmployee={this.state.currentEmployee}></EmployeeDialog>

        <RaisedButton label="Agregar" onClick={this.handleOpen} primary={true} className="button-add"/>

        {this.state.employees.map((employee) =>{
          return (<Employee employee={employee} key={employee.id} enClick={this.handleEmployeeClick} onDisable={this.disableEmployee}/>)
        })}

      </div>
    )
  }



}
