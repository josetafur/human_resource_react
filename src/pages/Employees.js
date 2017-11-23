import React from 'react';
import axios from 'axios';
import RaisedButton from 'material-ui/RaisedButton';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow } from 'material-ui/Table';
import AutoComplete from 'material-ui/AutoComplete';


import Employee from '../components/employees/Employee';
import EmployeeModal from '../components/employees/EmployeeModal';
import EmployeeFilter from '../components/employees/EmployeeFilter';
import EmployeeSkillModal from '../components/employeeSkills/EmployeeSkillModal';
import domain from '../consts/domain';


export default class Employees extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      employees: [],
      currentEmployee: {},
      openModalEmployee: false,
      isEdit: false,
      dataSource: [],
      dataSourceConfig: { text: 'name', value: 'id'},
      openModalEmployeeSkill: false,
    }

    this.addEmployee = this.addEmployee.bind(this)
  }

  componentDidMount(){
    this.loadEmployees();
  }

  loadEmployees = () => {
    axios.get(domain.local+'/api/v1/employees.json')
    .then(response=>{
      this.setState({employees: response.data})
    })
    .catch(err => console.log(err))
  }

  // ADD EMPLOYEE IN EMPLOYEE LIST
  addEmployee = (employee) => {
    this.setState(prevState => {
      return {
        employees: [...prevState.employees, employee]
      }
    })
  }

  // UPDATE EMPLOYEE IN EMPLOYEE LIST
  updateEmployee = (employee) => {
    const i = this.state.employees.findIndex((e) => e.id === employee.id)
    const new_employees = this.state.employees
    new_employees[i] = employee

    this.setState((prevState)=>{
      return{
        employees: new_employees,
      }
    })
  }

  // OPEN MODAL TO NEW EMPLOYEE
  newEmployee = () => {
    this.setState({
        openModalEmployee: true,
        currentEmployee: {},
        isEdit: false
    });
  }

  // OPEN MODAL TO EDIT EMPLOYEE
  editEmployee = (employee) => () => {
    this.setState({
      openModalEmployee: true,
      currentEmployee: employee,
      isEdit: true
    });
  }

  // DISABLE AN EMPLOYEE
  disableEmployee = (employee) => () => {
    axios.delete(domain.local+"/api/v1/employees/"+ employee.id)
    .then(response=>{
      this.updateEmployee(response.data)
    })
    .catch(error=> console.log(error))
  }

  // CLOSE MODAL OF EMPLOYEES
  closeModalEmployee = () => {
    this.setState({openModalEmployee: false})
  }

  // MODAL TO OPEN EMPLOYEE_SKILLS
  listSkills = (employee) => () => {
    this.setState({openModalEmployeeSkill: true,currentEmployee: employee});
  }

  // CLOSE MODAL OF EMPLOYEE_SKILLS
  closeModalEmployeeSkill = () =>{
    this.setState({openModalEmployeeSkill: false})
  }

  //  AUTOCOMPLETE
  autocompleteText = (value)=>{
    if(value.trim().length === 0) return false;
    axios.get(domain.local+"/api/v1/employees/autocomplete?term="+value)
    .then((response)=>{
      this.setState({dataSource: response.data.map((el)=>{
        var obj = {};
        obj.name = el.name;
        obj.id = el.id
        return obj
      })})
    })
  }

  selectElementAutocomplete = (value) => {
    axios.get(domain.local+"/api/v1/employees/"+value.id)
    .then((response)=>{
      this.setState({employees: [response.data]})
    })
  }

  //  FILTERS BY SKILLS
  selectByFilter = (employees) =>{
    this.setState({employees: employees})
  }
  
  render(){
    return(
        <div className="row" style={{'padding': '24px'}}>
          <div className="col-xs-12">
            <RaisedButton label="Agregar" onClick={this.newEmployee} primary={true} className="button-add"/>
            <EmployeeModal
              onAdd={this.addEmployee} onUpdate={this.updateEmployee}
              onDisable={this.disableEmployee} isEdit={this.state.isEdit}
              open={this.state.openModalEmployee} onClose={this.closeModalEmployee}
              currentEmployee={this.state.currentEmployee} />

            <h2 >Lista de trabajadores </h2>
            <AutoComplete hintText="Busque por nombre" dataSource={this.state.dataSource} onUpdateInput={this.autocompleteText} onNewRequest={this.selectElementAutocomplete} dataSourceConfig={this.state.dataSourceConfig}/>
            <RaisedButton label="Todos" onClick={this.loadEmployees} secondary={true} className="margin-left"/>
            <div className='container-colors'>
              <div className='employee-active'></div><span>Activados</span>
              <div className='employee-desactive'></div><span>Desactivados</span>
            </div>

            <EmployeeFilter onModify={this.selectByFilter} />
            <EmployeeSkillModal openModalEmployeeSkill={this.state.openModalEmployeeSkill}
                onCloseModalEmployeeSkill={this.closeModalEmployeeSkill}
                employee={this.state.currentEmployee} />

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
                  return(<Employee employee={employee} key={employee.id} onEdit={this.editEmployee} onDisable={this.disableEmployee} onListSkills={this.listSkills}/>)
                })}
              </TableBody>
            </Table>
          </div>
        </div>
    )
  }
}
