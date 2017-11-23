import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';


export default class SkillForm extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      name: this.props.currentSkill.name || '',
    }
  }

  handleInput = (e)=>{
    this.setState({[e.target.name]: e.target.value})
  }

  save = () => {
    const skill = {
      name: this.state.name
    }

    if(this.props.isEdit === false){
      this.props.onCreate(skill)
    }else{
      this.props.onUpdate(skill)
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
