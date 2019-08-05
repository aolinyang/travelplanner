import React from "react";
import {BrowserRouter as Router, Route} from 'react-router-dom';

import FrontPage from './components/frontpage/frontPage';
import RegisterForm from './components/login/registerForm';

export default function(props) {
    return(
        <Router>
            <Route path = "/" exact component={FrontPage} />
            <Route path = "/register" exact component={RegisterForm} />
        </Router>
    );
}