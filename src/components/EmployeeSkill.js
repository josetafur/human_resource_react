import React from 'react';
import axios from 'axios';
import Checkbox from 'material-ui/Checkbox';

import domain from '../consts/domain';


export default class EmployeeSkill extends React.Component{

  constructor(props){
    super(props);
  }

  handleSelect = (value,isInputChecked) => {

    if(isInputChecked){
      this.props.onSelected(this.props.skill.id);
    }else{
      console.log(this.props.skill.id)
      this.props.onRemove(this.props.skill.id)
    }

    axios.get(domain.local+"/api/v1/employees",{
        params: {
          skills: this.props.skills_params
        }
    }).then((response)=>{
      // console.log(response.data)

    }).catch(err => {
      console.log(err);
    })
  }

  render(){
    return(
      <div className="inline-block">
        <Checkbox label={this.props.skill.name} onCheck={this.handleSelect} />
      </div>
    )
  }
}
