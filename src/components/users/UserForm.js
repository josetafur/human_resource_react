import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';


export default class UserForm extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      email: ''
    }
  }

  handleInput = (e)=>{
    this.setState({[e.target.name]: e.target.value})
  }

  save = () => {
    const user = {
      email: this.state.email,
    }

    this.props.onCreate(user)

  }

  render(){
    return(
      <form>
        <div className="row">
          <div className="col-xs">
            <div className="box">
              <TextField floatingLabelText="Ingrese correo electrónico" value={this.state.email || ''} name="email" onChange={this.handleInput} type="email"/>
            </div>
          </div>
        </div>

        <div className="row top-space">
          <div className="col-xs-12">
            <RaisedButton label="Grabar" onClick={this.save} primary={true} ></RaisedButton>
          </div>
        </div>
      </form>
    )
  }
}
