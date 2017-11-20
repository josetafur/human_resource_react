import React, {Component} from 'react';import { TableRow, TableRowColumn } from 'material-ui/Table'
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';

export default class Employee extends Component{

  constructor(props){
    super(props);
  }

  render(){
    return(
      <TableRow key={this.props.employee.id} className={this.props.employee.state == 0 ? 'active' : 'desactive'}>
        <TableRowColumn>{this.props.employee.id}</TableRowColumn>
        <TableRowColumn>{this.props.employee.name}</TableRowColumn>
        <TableRowColumn>{this.props.employee.last_name}</TableRowColumn>
        <TableRowColumn>{this.props.employee.job_position}</TableRowColumn>
        <TableRowColumn>{this.props.employee.team}</TableRowColumn>
        <TableRowColumn>{this.props.employee.phone || '-'}</TableRowColumn>
        <TableRowColumn>{this.props.employee.state == 0 ? 'Activo' : 'Desactivado'}</TableRowColumn>

        <TableRowColumn>
          <IconButton onClick={this.props.onEdit(this.props.employee)}>
              <FontIcon className="material-icons">edit</FontIcon>
          </IconButton>

          {this.props.employee.state == 0 &&
            <IconButton onClick={this.props.onDisable(this.props.employee)}>
                <FontIcon className="material-icons">block</FontIcon>
            </IconButton>
          }
        </TableRowColumn>
      </TableRow>
    )
  }
}
