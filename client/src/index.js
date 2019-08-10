import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';

import Routes from "./Routes";

import {Provider} from "mobx-react";
import userStore from "./stores/userStore";
import { configure } from "mobx";

configure({ enforceActions: 'observed' });

const store = {
    userStore
}

ReactDOM.render(<Provider {...store}>
                  <Routes />
                </Provider>, document.getElementById('root'));

registerServiceWorker();
