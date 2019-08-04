import React, { Component } from 'react';
import {Route, Link} from 'react-router-dom';
import RegisterForm from './components/login/registerForm';

class App extends Component {
  render() {
    return(
      <div>
        

`       <Route path = "/register" exact component={RegisterForm} />
      </div>
    );
  }
}

export default App;
