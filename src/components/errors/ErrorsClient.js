import React from 'react';

import ErrorClient from './ErrorClient';

export default class ErrorsClient extends React.Component{


  render(){
    return(
      <div>
        <ul>
          {this.props.errors.map((error)=>{
            <ErrorClient />
          })}
        </ul>
      </div>
    )
  }
}
