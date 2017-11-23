import React from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';


export default class EmployeeSkillForm extends React.Component{

  selected = (event,index,value)=>{
    this.props.onSave(value,event.target.innerHTML);
  }

  render(){
    return(
      <form>
        <div className="row">
          <div className="col-xs-12">
            <SelectField floatingLabelText="Habilidad" value={this.props.currentSkillId} onChange={this.selected}>
              {this.props.skills.map((skill)=>{
                return(<MenuItem key={skill.id} value={skill.id} primaryText={skill.name} />)
              })}
            </SelectField>
          </div>
        </div>
      </form>
    )
  }


}
