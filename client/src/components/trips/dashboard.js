import React from 'react';
import {inject, observer} from "mobx-react";

import { AfterNavbar } from './../navstuff/navbar';

@inject("userStore")
@observer
class Dashboard extends React.Component {

    constructor(props){
        super(props);
    }

    render() {
        return(
            <div>
                <AfterNavbar />
                
            </div>
        );
    }

}

export default Dashboard;