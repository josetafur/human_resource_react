import React from 'react';
import axios from 'axios';
import Dialog from 'material-ui/Dialog';

import UserForm from './UserForm';
import ErrorNotification from '../errors/ErrorNotification';
import domain from '../../consts/domain';

export default class UserModal extends React.Component{

  constructor(props){
    super(props);
    this.state = {errors: []};
  }

  componentDidUpdate(prevProps,prevState){
    if(prevProps !== this.props){
      this.setState({errors: []});
    }
  }

  create = (user) => {
    axios.post(domain.local+'/api/v1/users',{ user: user })
    .then(response=>{
      this.props.onAdd(response.data);
      this.props.onClose();
    })
    .catch(error =>{
      this.setState({errors: error.response.data.error});
    });
  }

  render(){
    return(
      <div>
        <Dialog title='Nuevo usuario' modal={false} open={this.props.open} onRequestClose={this.props.onClose}  autoScrollBodyContent={true}>
          {this.state.errors.length> 0 && <ErrorNotification errors={this.state.errors}/>}
          <UserForm onCreate={this.create}/>
        </Dialog>
      </div>
    )
  }


}
