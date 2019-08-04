import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.css';

import {BrowserRouter as Router} from "react-router-dom";

import {Provider} from "mobx-react";
import {userStore} from "./stores/userStore";
import { configure } from "mobx";

configure({ enforceActions: 'observed' });

const store = {
    userStore
}

ReactDOM.render(<Provider {...store}>
                  <Router>
                    <App />
                  </Router>
                </Provider>, document.getElementById('root'));
registerServiceWorker();
