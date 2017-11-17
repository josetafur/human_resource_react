import React, {Component} from 'react';
import {Card, CardHeader,CardText} from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';

import EmployeeDialog from './EmployeeDialog';


export default class Employee extends Component{

  render(){
    return(
      <Card key={this.props.employee.id}>
        <CardHeader title={this.props.employee.name.concat(" ").concat(this.props.employee.last_name)} subtitle={this.props.employee.job_position}>
        </CardHeader>
        <CardText>
          <p>{this.props.employee.team}</p>
          <p>{this.props.employee.phone}</p>

          <IconButton onClick={this.props.enClick(this.props.employee)}>
              <FontIcon className="material-icons">edit</FontIcon>
          </IconButton>

          <IconButton onClick={this.props.onDisable(this.props.employee)}>
              <FontIcon className="material-icons">delete</FontIcon>
          </IconButton>
        </CardText>
      </Card>
    )
  }
}
