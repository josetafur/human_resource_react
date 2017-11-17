import React from 'react';
import {redA400 } from 'material-ui/styles/colors';

export default class ErrorNotification extends React.Component{

  constructor(props){
    super(props)
  }

  render(){
    return(
      <div>
        <p style={{'color': redA400}}>Errores</p>
        <ul>
          {this.props.errors.map((error) =>{
            <li>
              {error}
            </li>
          })}
        </ul>
      </div>
    )
  }
}
