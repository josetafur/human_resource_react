import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import axios from 'axios';

import Container from '../components/helpers/Container';
import domain from '../consts/domain';

export default class Login extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      email: "",
      password: "",
      errorsClient: [],
      errorsServer: []
    }
  }

  login = ()=>{
    if(this.invalidField([{name: 'email', value: 'this.state.email'},{name: 'password', value: 'this.state.password'}])) return false;

    axios.post(domain.local+"/api/v1/auth/sign_in",
    {email: this.state.email,password: this.state.password})
    .then((res)=>{
      this.props.history.push("/")
    })
    .catch((err)=>{
      this.setState({errors: err.response.data.error})
    })
  }

  invalidField = (fields) => {
    let count = 0
    let errorsClient = [];
    fields.forEach(function(field){
      if(field.value.length === 0){
        count ++
        // errorsClient.push({field: ['es obligatorio']})
      }
    })
    return count > 0 ? true : false
  }

  signUp = () => {
    this.props.history.push("/signUp")
  }

  handleInput = (e)=>{
    this.setState({[e.target.name]: e.target.value})
  }

  render(){
    return(
      <div className="row middle-xs">
        <div className="col-xs-12 col-sm-6">
          <Container>
            <h2>ENTRAR AL SISTEMA</h2>
            <TextField floatingLabelText="Correo electrónico" type="email" className="textfield" name="email" value={this.state.email} onChange={this.handleInput}/>
            <TextField floatingLabelText="Contraseña" type="password" className="textfield" name="password" value={this.state.password} onChange={this.handleInput}/>
            <div className="Login-actions">
              <RaisedButton label="Ingresar" secondary={true} onClick={this.login}/>
            </div>
            <div className="Login-actions">
              <RaisedButton label="Registrarse" secondary={true} onClick={this.signUp}/>
            </div>
          </Container>
        </div>
        <div className="col-xs-12 col-sm-6">
          <div className="Login-background" style={{'backgroundImage': "url("+process.env.PUBLIC_URL+'/images/login-background.jpg'+")"}}></div>
        </div>
      </div>
    )
  }

}
