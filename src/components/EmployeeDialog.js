import React from 'react';
import axios from 'axios';
import Dialog from 'material-ui/Dialog';

import EmployeeForm from './EmployeeForm';
import ErrorNotification from './ErrorNotification';

export default class EmployeeDialog extends React.Component{

  constructor(props){
    super(props);
  }

  createEmployee = (employee)=>{
    axios.post(
        'http://localhost:3000/api/v1/employees',
        { employee: employee }
    )
    .then(response=>{
      this.props.onAdd(response.data)
      this.props.onClose()
    })
    .catch(error =>{
      console.log(error.response.data.error)
      this.props.onError(error.response.data.error)
    });
  }

  updateEmployee = (employee)=>{
    axios.put(
      "http://localhost:3000/api/v1/employees/"+this.props.currentEmployee.id,
      {
          employee: employee
      })
    .then(response=>{
      this.props.onModify(response.data);
      this.props.onClose()
    })
    .catch(error=> {
      this.props.onError(error.response.data.error)
    })
  }

  render(){
    return(
      <div>
        <Dialog title={!this.props.isEdit ? 'Nuevo trabajador': 'Editar trabajador'} modal={false} open={this.props.open} onRequestClose={this.props.onClose}  autoScrollBodyContent={true}>
          {this.props.errors.length> 0 && <ErrorNotification errors={this.props.errors}/>}
          <EmployeeForm currentEmployee={this.props.currentEmployee} isEdit={this.props.isEdit} onCreate={this.createEmployee} onUpdate={this.updateEmployee}/>
        </Dialog>
      </div>
    )
  }


}
