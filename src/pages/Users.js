import React from 'react';
import axios from 'axios';
import RaisedButton from 'material-ui/RaisedButton';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow } from 'material-ui/Table';


import User from '../components/users/User';
import UserModal from '../components/users/UserModal';
import ErrorToast from '../components/errors/ErrorToast';
import domain from '../consts/domain';

export default class Users extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      users: [],
      openModalUser: false
    }
  }

  componentDidMount(){
    this.loadUsers();
  }

  loadUsers = ()=>{
    axios.get(domain.local+"/api/v1/users")
    .then((response)=>{
      this.setState({users: response.data})
    })
  }

  // ADD USER IN USER LIST
  addUser = (user) => {
    this.setState(prevState => {
      return {
        users: [...prevState.users, user]
      }
    })
  }

  // OPEN MODAL TO NEW SKILL
  newUser = () => {
    this.setState({
        openModalUser: true
    });
  }

  // CLOSE MODAL OF SKILLS
  closeModalUser = () => {
    this.setState({openModalUser: false})
  }

  render(){
    return(
      <div className="row" style={{'padding': '24px'}}>
        <div className="col-xs-12">

        <RaisedButton label="Agregar" onClick={this.newUser} primary={true} className="button-add"/>
        <UserModal
          onAdd={this.addUser}
          open={this.state.openModalUser} onClose={this.closeModalUser} />

        <h2 >Lista de usuarios </h2>

        <Table>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
              <TableHeaderColumn>ID</TableHeaderColumn>
              <TableHeaderColumn>Correo electrónico</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {this.state.users.map((user) =>{
              return(<User user={user} key={user.id} />)
            })}
          </TableBody>
        </Table>

        </div>
      </div>
    )
  }






}
