import React from 'react';
import axios from 'axios';

import EmployeeFilterBySkill from './EmployeeFilterBySkill';
import domain from '../../consts/domain';

export default class EmployeeFilter extends React.Component{

  constructor(props){
    super(props);

    this.state = {
      skills: [],
      skillsFilters: []
    }
  }

  componentDidMount(){
    axios.get(domain.local+"/api/v1/skills")
    .then((response)=>{
      this.setState({skillsFilters: response.data})
    })
    .catch(err=> console.log(err))
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

    return(
      <div>
        <p>Filtra por habilidades:</p>
        {this.state.skillsFilters.map((skill)=>{
          return(<EmployeeFilterBySkill skill={skill} key={skill.id} onSelected={this.select_skill} onRemove={this.deselect_skill}/>)
        })}
      </div>
    )
  }
}
