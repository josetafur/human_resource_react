import React from 'react';
import { BrowserRouter as ReactRouter, Route } from 'react-router-dom';

import Employees from './pages/Employees';
import Skills from './pages/Skills';
import App from './App';

export default class Router extends React.Component{

  render(){
    return(
      <ReactRouter>
         <App>
             <Route exact path="/" component={Employees}></Route>
             <Route path="/skills" component={Skills}></Route>
         </App>
       </ReactRouter>
    )
  }
}
