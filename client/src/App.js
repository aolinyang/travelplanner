import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

//var getcookie = require('./studyguide/authtest');

class App extends React.Component {
  componentDidMount() {
   // document.cookie = 'token=; expires=Sat, 27 Jul 2019 00:00:01 GMT;';
    //document.cookie = 'token=wrong';
    getcookie();
  }
  render() {
    
    return(
      <div>
        <p>{document.cookie}</p>
        <p>test</p>
      </div>
    )
  };
}

export default App;