import React from 'react';
import axios from 'axios';
import Dialog from 'material-ui/Dialog';

import EmployeeForm from './EmployeeForm';
import ErrorNotification from '../errors/ErrorNotification';
import domain from '../../consts/domain';

export default class EmployeeModal extends React.Component{

  constructor(props){
    super(props);
    this.state = {errors: []};
  }

  componentDidUpdate(prevProps,prevState){
    if(prevProps !== this.props){
      this.setState({errors: []});
    }
  }

  create = (employee) => {
    axios.post(domain.local+'/api/v1/employees',{ employee: employee })
    .then(response=>{
      this.props.onAdd(response.data);
      this.props.onClose();
    })
    .catch(error =>{
      this.setState({errors: error.response.data.error});
    });
  }

  update = (employee) => {
    axios.put(domain.local+"/api/v1/employees/"+this.props.currentEmployee.id,{employee: employee})
    .then(response=>{
      this.props.onUpdate(response.data);
      this.props.onClose();
    })
    .catch(error=> {
      this.setState({errors: error.response.data.error});
    });
  }

  render(){
    return(
      <div>
        <Dialog title={!this.props.isEdit ? 'Nuevo trabajador': 'Editar trabajador'} modal={false} open={this.props.open} onRequestClose={this.props.onClose}  autoScrollBodyContent={true}>
          {this.state.errors.length> 0 && <ErrorNotification errors={this.state.errors}/>}
          <EmployeeForm currentEmployee={this.props.currentEmployee} isEdit={this.props.isEdit} onCreate={this.create} onUpdate={this.update}/>
        </Dialog>
      </div>
    )
  }


}
