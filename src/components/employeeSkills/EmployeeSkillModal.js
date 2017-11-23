import React from 'react';
import axios from 'axios';
import Dialog from 'material-ui/Dialog';
import Chip from 'material-ui/Chip';

import EmployeeSkillForm from './EmployeeSkillForm';
import domain from '../../consts/domain';

const styles = {
  chip: { margin: 4}, wrapper: { display: 'flex', flexWrap: 'wrap'}
};

export default class EmployeeSkillModal extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      currentSkillId: 0,
      skills: [],
      employeeSkills: []
    }
  }

  componentDidUpdate(prevProps,prevState){
    if(prevProps !== this.props && this.props.openModalEmployeeSkill){
      axios.get(domain.local+"/api/v1/employees/"+this.props.employee.id+"/employee_skills")
      .then((response)=>{
        this.setState({skills: response.data.skills, employeeSkills: response.data.employee_skills});
      })
      .catch((err)=> console.log(err))
    }
  }

  deleteSkill = (employeeSkill) =>{
    axios.delete(domain.local+"/api/v1/employee_skills/"+employeeSkill.id)
    .then((response)=>{
      this.setState((prevState)=>{
        return{
          employeeSkills: prevState.employeeSkills.filter((el)=> el.id != employeeSkill.id)
        }
      });
    }).catch((err)=> console.log(err))
  }

  saveSkill = (skillId, skillName)=>{
    if(this.state.employeeSkills.findIndex((el)=> el.skill.id == skillId) !== -1) return false;

    axios.post(domain.local+"/api/v1/employees/"+this.props.employee.id+"/employee_skills",{skill_id: skillId})
    .then((response)=>{
      this.setState((prevState)=>{
        return{
          employeeSkills: [...prevState.employeeSkills, Object.assign(response.data,{ skill: { id: skillId, name: skillName }})],
          currentSkillId: 0
        }
      });
    })
    .catch(err=> console.log(err))
  }

  render(){
    return(
      <Dialog title='Lista de hablidades' modal={false} open={this.props.openModalEmployeeSkill} onRequestClose={this.props.onCloseModalEmployeeSkill}  autoScrollBodyContent={true} >
        <div style={styles.wrapper}>
          {this.state.employeeSkills.map((employeeSkill)=>{
            return(<Chip key={employeeSkill.id} style={styles.chip} onRequestDelete={()=>this.deleteSkill(employeeSkill)}>{employeeSkill.skill.name}</Chip>)
          })}
        </div>

        <EmployeeSkillForm skills={this.state.skills} onSave={this.saveSkill} currentSkillId={this.state.currentSkillId}/>
      </Dialog>
    )
  }
}
