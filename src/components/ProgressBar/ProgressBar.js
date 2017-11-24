import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';

export default class ProgressBar extends React.Component{

  constructor(props){
    super(props);
  }

  render(){
    return(
      <CircularProgress />
    )
  }
}
