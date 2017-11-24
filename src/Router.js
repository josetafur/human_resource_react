import React from 'react';
import { BrowserRouter as ReactRouter, Route } from 'react-router-dom';

import Employees from './pages/Employees';
import Skills from './pages/Skills';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Users from './pages/Users';
import App from './App';

export default class Router extends React.Component{

  render(){
    return(
      <ReactRouter>
         <App>
             <Route exact path="/" component={Employees}></Route>
             <Route exact path="/employees" component={Employees}></Route>
             <Route path="/skills" component={Skills}></Route>
             <Route path="/login" component={Login}></Route>
             <Route path="/signUp" component={SignUp}></Route>
             <Route path="/users" component={Users}></Route>
         </App>
       </ReactRouter>
    )
  }
}
