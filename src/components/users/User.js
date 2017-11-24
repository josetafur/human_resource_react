import React, {Component} from 'react';import { TableRow, TableRowColumn } from 'material-ui/Table'
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';

export default class User extends Component{

  render(){
    return(
      <TableRow key={this.props.user.id}>
        <TableRowColumn>{this.props.user.id}</TableRowColumn>
        <TableRowColumn>{this.props.user.email}</TableRowColumn>
      </TableRow>
    )
  }
}
