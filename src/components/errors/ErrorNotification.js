import React from 'react';
import {redA400} from 'material-ui/styles/colors';

export default class ErrorNotification extends React.Component{

  constructor(props){
    super(props)
  }

  render(){
    return(
      <div>
        <p style={{'color': redA400}}>Errores</p>
        <ul style={{'color': redA400}}>
          {this.props.errors.map((error,index) =>{
            return (<li key={'error_' + index}>{error}</li>)
          })}
        </ul>
      </div>
    )
  }
}
