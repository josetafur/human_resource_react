import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import axios from 'axios';

import Container from '../components/helpers/Container';
import domain from '../consts/domain';

export default class SignUp extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      email: "",
      password: "",
      passwordConfirmation: "",
    }
  }

  handleInput = (e)=>{
    this.setState({[e.target.name]: e.target.value})
  }

  signUp = () =>{
    const registrationParams = {email: this.state.email,password: this.state.password,password_confirmation: this.state.passwordConfirmation};

    axios.post(domain.local+"/api/v1/auth", registrationParams)
    .then((response)=>{
      this.props.history.push("/")
    })
    .catch((err)=>{
      console.log(err);
    })
  }

  login = () =>{
    this.props.history.push("/login")
  }

  render(){
    return(
      <div className="row middle-xs">
        <div className="col-xs-12 col-sm-6">
          <Container>
            <h2>REGISTRATE</h2>
            <TextField floatingLabelText="Correo electrónico" type="email" className="textfield" name="email" value={this.state.email} onChange={this.handleInput}/>
            <TextField floatingLabelText="Contraseña" type="password" className="textfield" name="password" value={this.state.password} onChange={this.handleInput}/>
            <TextField floatingLabelText="Confirmación de contraseña" type="password" className="textfield" name="passwordConfirmation" value={this.state.passwordConfirmation} onChange={this.handleInput}/>
            <div className="Login-actions">
              <RaisedButton label="Registrarse" secondary={true} onClick={this.signUp}/>
            </div>
            <div className="Login-actions">
              <RaisedButton label="Ir a Login" secondary={true} onClick={this.login}/>
            </div>
          </Container>
        </div>

        <div className="col-xs-12 col-sm-6">
          <div className="Signup-background" style={{'backgroundImage': "url("+process.env.PUBLIC_URL+'/images/sign-up.jpeg'+")"}} ></div>
        </div>
      </div>
    )
  }
}
