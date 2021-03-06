import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';


export default class EmployeeForm extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      name: this.props.currentEmployee.name,
      last_name: this.props.currentEmployee.last_name,
      job_position: this.props.currentEmployee.job_position,
      team: this.props.currentEmployee.team,
      phone: this.props.currentEmployee.phone
    }
  }

  handleInput = (e)=>{
    this.setState({[e.target.name]: e.target.value})
  }

  save = () => {
    console.log(this.props.isEdit);
    const employee = {
      name: this.state.name,
      last_name: this.state.last_name,
      job_position: this.state.job_position,
      team: this.state.team,
      phone: this.state.phone
    }

    if(this.props.isEdit === false){
      this.props.onCreate(employee)
    }else{
      this.props.onUpdate(employee)
    }

  }

  render(){
    return(
      <form>
        <div className="row">
          <div className="col-xs">
            <div className="box">
              <TextField floatingLabelText="Ingrese nombre" value={this.state.name || ''} name="name" onChange={this.handleInput} />
            </div>
          </div>
          <div className="col-xs">
            <div className="box">
              <TextField floatingLabelText="Ingrese apellidos" value={this.state.last_name || ''} name="last_name" onChange={this.handleInput}/>
            </div>
          </div>
          <div className="col-xs">
            <div className="box">
              <TextField floatingLabelText="Ingrese ocupación" value={this.state.job_position || ''} name="job_position" onChange={this.handleInput}/>
            </div>
          </div>
          <div className="col-xs">
            <div className="box">
              <TextField floatingLabelText="Ingrese equipo" value={this.state.team || ''} name="team" onChange={this.handleInput} />
            </div>
          </div>
          <div className="col-xs">
            <div className="box">
              <TextField floatingLabelText="Ingrese teléfono" value={this.state.phone || ''} name="phone" onChange={this.handleInput} type="number"/>
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
