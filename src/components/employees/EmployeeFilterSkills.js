import React from 'react';
import axios from 'axios';

import EmployeeSkill from './EmployeeSkill';
import domain from '../../consts/domain';

export default class EmployeeFilterSkills extends React.Component{

  constructor(props){
    super(props);

    this.state = {
      skills: []
    }
  }

  select_skill = (skill_id) =>{
    this.setState((prevState)=>{
      return{
        skills: [...prevState.skills, skill_id]
      }
    },()=> this.sendServer())
  }

  deselect_skill = (skill_id) => {
    this.setState((prevState)=>{
      return{
        skills: prevState.skills.filter((el) => el != skill_id)
      }
    },()=> this.sendServer())
  }

  sendServer = () =>{
    axios.get(domain.local+"/api/v1/employees",{
        params: {
          skills: this.state.skills
        }
    }).then((response)=>{
      this.props.onModify(response.data)
    }).catch(err => {
      console.log(err);
    })
  }

  render(){
    const skills = [{id: 1,name: 'React'},{id: 2,name: 'Angular'},{id: 3,name: 'Polymer'},{id: 4,name: 'Vue'}]

    return(
      <div>
        <p>Filtra por habilidades:</p>

        {skills.map((skill)=>{
          return(<EmployeeSkill skill={skill} key={skill.id} onSelected={this.select_skill} onRemove={this.deselect_skill}/>)
        })}
      </div>
    )
  }
}
