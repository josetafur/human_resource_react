import React from 'react';

import EmployeeSkill from './EmployeeSkill';

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
    })
  }

  deselect_skill = (skill_id) => {
    this.setState((prevState)=>{
      return{
        skills: prevState.skills.find((el)=> el != skill_id)
      }
    })

    console.log(this.state.skills)
  }

  render(){
    const skills = [{id: 1,name: 'React'},{id: 2,name: 'Angular'},{id: 3,name: 'Polymer'},{id: 4,name: 'Vue'}]

    return(
      <div>
        <p>Filtra por habilidades:</p>

        {skills.map((skill)=>{
          return(<EmployeeSkill skill={skill} key={skill.id} onSelected={this.select_skill} onRemove={this.deselect_skill} skills_params={this.state.skills}/>)
        })}
      </div>
    )
  }
}
