import React from 'react';
import axios from 'axios';
import Dialog from 'material-ui/Dialog';

import SkillForm from './SkillForm';
import ErrorNotification from '../errors/ErrorNotification';
import domain from '../../consts/domain';

export default class SkillModal extends React.Component{

  constructor(props){
    super(props);
    this.state = {errors: []};
  }

  componentDidUpdate(prevProps,prevState){
    if(prevProps !== this.props){
      this.setState({errors: []});
    }
  }

  create = (skill) => {
    axios.post(domain.local+'/api/v1/skills',{ skill: skill })
    .then(response=>{
      this.props.onAdd(response.data);
      this.props.onClose();
    })
    .catch(error =>{
      this.setState({errors: error.response.data.error});
    });
  }

  update = (skill) => {
    axios.put(domain.local+"/api/v1/skills/"+this.props.currentSkill.id,{skill: skill})
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
        <Dialog title={!this.props.isEdit ? 'Nueva habilidad': 'Editar habilidad'} modal={false} open={this.props.open} onRequestClose={this.props.onClose}  autoScrollBodyContent={true}>
          {this.state.errors.length> 0 && <ErrorNotification errors={this.state.errors}/>}
          <SkillForm currentSkill={this.props.currentSkill} isEdit={this.props.isEdit} onCreate={this.create} onUpdate={this.update}/>
        </Dialog>
      </div>
    )
  }


}
