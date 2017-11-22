import React from 'react';
import axios from 'axios';
import RaisedButton from 'material-ui/RaisedButton';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow } from 'material-ui/Table';
import AutoComplete from 'material-ui/AutoComplete';


import Employee from '../components/employees/Employee';
import EmployeeDialog from '../components/employees/EmployeeDialog';
import EmployeeFilterSkills from '../components/employees/EmployeeFilterSkills';
import EmployeeSkillDialog from '../components/employee_skills/EmployeeSkillDialog';
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
        text: 'name',
        value: 'id',
      },
      currentEmployeeFiltered: {},
      openModalEmployeeSkill: false,
      skills: [],
      employee_skills: []
    }

    this.addEmployee = this.addEmployee.bind(this)
  }

  componentDidMount(){
    this.load_employees();
  }

  load_employees = () => {
    axios.get(domain.local+'/api/v1/employees.json')
    .then(response=>{
      console.log(response.data)
      this.setState({
        employees: response.data,
        currentEmployeeFiltered: {}
      })
    })
    .catch(err => console.log(err))
  }

  addEmployee = (employee) => {
    this.setState(prevState => {
      return {
        employees: [...prevState.employees, employee],
        currentEmployeeFiltered: {}
      }
    })
  }

  modifyEmployee = (employee) => {
    const i = this.state.employees.findIndex((e) => e.id === employee.id)
    const new_employees = this.state.employees
    new_employees[i] = employee

    this.setState((prevState)=>{
      return{
        employees: new_employees,
        currentEmployeeFiltered: employee
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

  // DIALOG EMPLOYEE_SKILL
  list_skills_employee = (employee) => () => {
    axios.get(domain.local+"/api/v1/employees/"+employee.id+"/employee_skills")
    .then((response)=>{
      console.log(response.data.skills)
      this.setState({
        employee_skills: response.data.employee_skills,
        skills: response.data.skills,
        openModalEmployeeSkill: true,
        currentEmployee: employee
      })
    })
    .catch((err)=> console.log(err))
  }

  closeModalEmployeeSkill = () =>{
    this.setState({openModalEmployeeSkill: false})
  }

  deleteSkill = (employee_skill) =>{
      axios.delete(domain.local+"/api/v1/employee_skills/"+employee_skill.id)
      .then((response)=>{
        this.setState((prevState)=>{
          return{
            employee_skills: prevState.employee_skills.filter((el)=> el.id != employee_skill.id)
          }
        })
      }).catch((err)=> console.log(err))
  }

  //  ERROR NOTIFICATION
  handleErrors = (errors) => {
    this.setState({errors: errors})
  }

//  ********  FUNCIONALIDAD EN PRUEBA - AUTOCOMPLETE ****************

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
    const employee_selected = this.state.employees.find(el=> el.id === value.id)
    this.setState({currentEmployeeFiltered: employee_selected});
  }

  //  FILTROS

  selectByFilter = (employees_array) =>{
    this.setState({employees: employees_array})
  }

  addSkill = (skill_id) => {
    this.setState((prevState)=>{
      return{
        "employee_skills": [...prevState.employee_skills,]
      }
    })
  }

  render(){

    return(
        <div className="row" style={{'padding': '24px'}}>
          <div className="col-xs-12">
            <RaisedButton label="Agregar" onClick={this.newEmployee} primary={true} className="button-add"/>
            <EmployeeDialog errors={this.state.errors} onError={this.handleErrors} onAdd={this.addEmployee} onModify={this.modifyEmployee} onDisable={this.disableEmployee} isEdit={this.state.isEdit} open={this.state.open} onClose={this.closeModal} currentEmployee={this.state.currentEmployee}></EmployeeDialog>


            <h2 >Lista de trabajadores </h2>
            <AutoComplete hintText="Busque por nombre" dataSource={this.state.dataSource} onUpdateInput={this.autocompleteText} onNewRequest={this.selectElementAutocomplete} dataSourceConfig={this.state.dataSourceConfig}/>
            <RaisedButton label="Todos" onClick={this.load_employees} secondary={true} className="margin-left"/>
            <div className='container-colors'>
              <div className='employee-active'></div><span>Activados</span>
              <div className='employee-desactive'></div><span>Desactivados</span>
            </div>


            <EmployeeFilterSkills onModify={this.selectByFilter}/>
            <EmployeeSkillDialog openModalEmployeeSkill={this.state.openModalEmployeeSkill} onCloseModalEmployeeSkill={this.closeModalEmployeeSkill} skills={this.state.skills} employee_skills={this.state.employee_skills} onDeleteSkill={this.deleteSkill} skills={this.state.skills} onSelected={this.addSkill} employee={this.state.currentEmployee}/>

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
                {!this.state.currentEmployeeFiltered.hasOwnProperty('id') ? (
                    this.state.employees.map((employee) =>{
                    return(<Employee employee={employee} key={employee.id} onEdit={this.editEmployee} onDisable={this.disableEmployee} onSkills={this.list_skills_employee}/>)
                    })
                  ) : <Employee employee={this.state.currentEmployeeFiltered} key={this.state.currentEmployeeFiltered.id} onEdit={this.editEmployee} onDisable={this.disableEmployee} onSkills={this.list_skills_employee}/>

                }
              </TableBody>
            </Table>
          </div>

        </div>
    )
  }
}
