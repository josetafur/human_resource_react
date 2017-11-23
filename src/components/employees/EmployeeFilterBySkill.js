import React from 'react';
import Checkbox from 'material-ui/Checkbox';


export default class EmployeeFilterBySkill extends React.Component{

  constructor(props){
    super(props);
  }

  handleSelect = (value,isInputChecked) => {

    if(isInputChecked){
      this.props.onSelected(this.props.skill.id);
    }else{
      this.props.onRemove(this.props.skill.id)
    }
  }

  render(){
    return(
      <div className="inline-block">
        <Checkbox label={this.props.skill.name} onCheck={this.handleSelect} />
      </div>
    )
  }
}
