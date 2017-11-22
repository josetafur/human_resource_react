  import React from 'react';
import axios from 'axios';
import Dialog from 'material-ui/Dialog';
import Chip from 'material-ui/Chip';

import EmployeeSkillForm from './EmployeeSkillForm';
import domain from '../../consts/domain';

const styles = {
  chip: { margin: 4}, wrapper: { display: 'flex', flexWrap: 'wrap'}
};

export default class EmployeeSkillDialog extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      currentSkillValue: 0,
      skills: [],
      employee_skills: []
    }
  }

  deleteSkill = (employeeSkill) =>{
    this.props.onDeleteSkill(employeeSkill)
  }

  onSelected = (skill_id)=>{
    axios.post(domain.local+"/api/v1/employees/"+this.props.employee.id+"/employee_skills",{
      skill_id: skill_id
    }).then((response)=>{
      // this.props.onSelected(skill_id);
      this.setState((prevState)=>{
        return{
          employee_skills: [...prevState.employee_skills,response.data],
          currentSkillValue: skill_id
        }
      })
    })
    .catch(err=> console.log(err))
  }

  render(){
    return(
      <Dialog title='Lista de hablidades' modal={false} open={this.props.openModalEmployeeSkill} onRequestClose={this.props.onCloseModalEmployeeSkill}  autoScrollBodyContent={true} >
        <div style={styles.wrapper}>
          {this.props.employee_skills.map((employee_skill)=>{
            return(<Chip key={employee_skill.id} style={styles.chip} onRequestDelete={()=>this.deleteSkill(employee_skill)}>{employee_skill.skill.name}</Chip>)
          })}
        </div>

        <EmployeeSkillForm skills={this.state.skills} onSelected={this.onSelected} currentSkillValue={this.state.currentSkillValue}/>
      </Dialog>
    )
  }
}
