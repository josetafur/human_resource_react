import React, {Component} from 'react';
import { TableRow, TableRowColumn } from 'material-ui/Table'
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';

export default class Skill extends Component{

  render(){
    return(
      <TableRow key={this.props.skill.id}>
        <TableRowColumn>{this.props.skill.id}</TableRowColumn>
        <TableRowColumn>{this.props.skill.name}</TableRowColumn>

        <TableRowColumn>
          <IconButton onClick={this.props.onEdit(this.props.skill)}>
              <FontIcon className="material-icons">edit</FontIcon>
          </IconButton>

          <IconButton onClick={this.props.onDelete(this.props.skill)}>
              <FontIcon className="material-icons">delete</FontIcon>
          </IconButton>

        </TableRowColumn>
      </TableRow>
    )
  }
}
