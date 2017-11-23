import React from 'react';
import AppBar from 'material-ui/AppBar';
import { Link } from 'react-router-dom'
import MenuItem from 'material-ui/MenuItem';

  const SkillButton = (props) => {
    return(
      <Link to="/skills" className="link-navigation">Habilidades</Link>
    )
  }

export default class Navbar extends React.Component{

  render(){
    return(
      <AppBar title="Human Resource" showMenuIconButton={false} iconElementRight={<SkillButton/>} />
    )
  }
}
