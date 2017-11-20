import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Navbar from './components/Navbar';
import EmployeeContainer from './pages/EmployeeContainer';

import './App.css';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <EmployeeContainer />
      </MuiThemeProvider>
    );
  }
}

export default App;
