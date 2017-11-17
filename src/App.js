import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Navbar from './components/Navbar';
import ListEmployees from './components/ListEmployees';

import './App.css';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <Navbar></Navbar>
        <ListEmployees></ListEmployees>
      </MuiThemeProvider>
    );
  }
}

export default App;
