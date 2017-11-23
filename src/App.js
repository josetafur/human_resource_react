import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Navbar from './components/Navbar';
import Employees from './pages/Employees';

import './App.css';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <div>
          <Navbar />
          {this.props.children}
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
