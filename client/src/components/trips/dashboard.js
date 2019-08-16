import React from 'react';
import {inject, observer} from "mobx-react";
import userStore from '../../stores/userStore';

@inject("userStore")
@observer
class Dashboard extends React.Component {

    constructor(props){
        super(props);
    }

    componentDidMount() {
        if (Array.isArray(userStore.all_trips)) {
            if (userStore.all_trips.length === 0) {
                userStore.fetch_trips();
            }
        }
    }

    render() {
        return(
            <div>
                
            </div>
        );
    }

}

export default Dashboard;