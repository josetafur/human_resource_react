import React from 'react';
import axios from 'axios';
import RaisedButton from 'material-ui/RaisedButton';

import Employee from '../components/Employee';
import EmployeeDialog from '../components/EmployeeDialog';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';


export default class EmployeeContainer extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      employees: [],
      currentEmployee: {},
      open: false,
      isEdit: false,
      errors: []
    }

    this.addEmployee = this.addEmployee.bind(this)
  }

  componentDidMount(){
    axios.get('http://localhost:3000/api/v1/employees.json')
    .then(response=>{
      this.setState({employees: response.data})
    })
    .catch(err => console.log(err))
  }

  addEmployee = (employee) => {
    this.setState(prevState => {
      return {
        employees: [...prevState.employees, employee]
      }
    })
  }

  modifyEmployee = (employee) => {
    const i = this.state.employees.findIndex((e) => e.id === employee.id)
    const new_employees = this.state.employees
    new_employees[i] = employee

    this.setState((prevState)=>{
      return{
        employees: new_employees
      }
    })

    this.state.employees[i] = employee;

    console.log(i)
  }

  newEmployee = () => {
    this.setState({
        open: true,
        currentEmployee: {},
        isEdit: false,
        errors: []
    });
  }

  closeModal = () => {
    this.setState({open: false})
  }

  editEmployee = (employee) => () => {
    this.setState({
      open: true,
      currentEmployee: employee,
      isEdit: true,
      errors: []
    })
  }

  disableEmployee = (employee) => () => {
    axios.delete(
      "http://localhost:3000/api/v1/employees/"+ employee.id
    )
    .then(response=>{
      this.modifyEmployee(response.data)
    })
    .catch(error=> console.log(error))
  }

  handleErrors = (errors) => {
    this.setState({errors: errors})
  }

  render(){
    return(
        <div>
          <RaisedButton label="Agregar" onClick={this.newEmployee} primary={true} className="button-add"/>
          <EmployeeDialog errors={this.state.errors} onError={this.handleErrors} onAdd={this.addEmployee} onModify={this.modifyEmployee} onDisable={this.disableEmployee} isEdit={this.state.isEdit} open={this.state.open} onClose={this.closeModal} currentEmployee={this.state.currentEmployee}></EmployeeDialog>
          <h2 style={{'margin-left': '1.3em'}}>Lista de trabajadores </h2>
          <Table>
            <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
              <TableRow>
                <TableHeaderColumn>ID</TableHeaderColumn>
                <TableHeaderColumn>Nombre</TableHeaderColumn>
                <TableHeaderColumn>Apellido</TableHeaderColumn>
                <TableHeaderColumn>Cargo</TableHeaderColumn>
                <TableHeaderColumn>Team</TableHeaderColumn>
                <TableHeaderColumn>Teléfono</TableHeaderColumn>
                <TableHeaderColumn>Estado</TableHeaderColumn>
                <TableHeaderColumn>Acción</TableHeaderColumn>
              </TableRow>
            </TableHeader>

          <TableBody displayRowCheckbox={false}>
            {this.state.employees.map((employee) =>{
              return (<Employee employee={employee} key={employee.id} onEdit={this.editEmployee} onDisable={this.disableEmployee}/>)
            })}
          </TableBody>
        </Table>
      </div>
    )
  }
}
