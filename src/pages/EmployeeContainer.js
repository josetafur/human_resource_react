import React from 'react';
import axios from 'axios';
import RaisedButton from 'material-ui/RaisedButton';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import AutoComplete from 'material-ui/AutoComplete';


import Employee from '../components/Employee';
import EmployeeDialog from '../components/EmployeeDialog';
import domain from '../consts/domain';



export default class EmployeeContainer extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      employees: [],
      currentEmployee: {},
      open: false,
      isEdit: false,
      errors: [],
      dataSource: [],

      dataSourceConfig: {
        text: 'textKey',
        value: 'valueKey',
      }
    }

    this.addEmployee = this.addEmployee.bind(this)
  }

  componentDidMount(){
    axios.get(domain.local+'/api/v1/employees.json')
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
      domain.local+"/api/v1/employees/"+ employee.id
    )
    .then(response=>{
      this.modifyEmployee(response.data)
    })
    .catch(error=> console.log(error))
  }

  handleErrors = (errors) => {
    this.setState({errors: errors})
  }

//  ********  FUNCIONALIDAD EN PRUEBA - AUTOCOMPLETE ****************

  autocompleteText = (value)=>{
    axios.get("http://localhost:3000/api/v1/employees/autocomplete?term="+value)
    .then((response)=>{
      // const dataSource = [{textKey: 'demo', valueKey: 1},{textKey: 'demoxxx', valueKey: 2}]
      this.setState({dataSource: response.data.map((el)=>{
        var obj = {};
        obj.textKey = el.name;
        obj.valueKey = el.id
        return obj
      })})
      // this.setState({dataSource: dataSource})
    })
  }

  selectElementAutocomplete = (value) => {
    this.setState((prevState)=>{
      let new_array = []
      const new_employees = prevState.employees.find(el=> el.id === value.valueKey)
      new_array.push(new_employees)
      return{
        employees: new_array
      }
    })
    // this.setState({employees: this.state.employees.find((el)=> el.id === value.valueKey)})
    // const new_array = []
    // const new_employees = this.state.employees.find(el=> el.id === value.valueKey)
    //
    // console.log()
  }

  render(){
    return(
        <div className="row" style={{'padding': '50px'}}>
          <div className="col-xs-12">
            <RaisedButton label="Agregar" onClick={this.newEmployee} primary={true} className="button-add"/>
            <EmployeeDialog errors={this.state.errors} onError={this.handleErrors} onAdd={this.addEmployee} onModify={this.modifyEmployee} onDisable={this.disableEmployee} isEdit={this.state.isEdit} open={this.state.open} onClose={this.closeModal} currentEmployee={this.state.currentEmployee}></EmployeeDialog>

            <h2 >Lista de trabajadores </h2>
            <AutoComplete hintText="Busque por nombre" dataSource={this.state.dataSource} onUpdateInput={this.autocompleteText} onNewRequest={this.selectElementAutocomplete} dataSourceConfig={this.state.dataSourceConfig}/>
            <div className='container-colors'>
              <div className='employee-active'></div><span>Activados</span>
              <div className='employee-desactive'></div><span>Desactivados</span>
            </div>

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
      </div>
    )
  }
}
