import React from 'react';
import AppBar from 'material-ui/AppBar';

export default class Navbar extends React.Component{

  render(){
    return(
      <AppBar title="Logo" iconClassNameRight="muidocs-icon-navigation-expand-more" />
    )
  }
}
