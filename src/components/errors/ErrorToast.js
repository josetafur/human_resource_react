import React from 'react';
import Snackbar from 'material-ui/Snackbar';

export default class ErrorToast extends React.Component{

  render(){
    return(
      <div>
        {this.props.errors.map((error,index)=>{
          return(<Snackbar key={index} open={this.props.open} message={error} autoHideDuration={4000} />)
        })}
      </div>
    )
  }

}
