import React from 'react';
import {inject, observer} from "mobx-react";

@inject("userStore")
@observer
class Dashboard extends React.Component {

    constructor(props){
        super(props);
    }

    render() {
        return(
            <div>
                {this.props.toDisplay}
                {JSON.stringify(this.props.userStore.user_info, null, 3)}
                {this.props.userStore.user_info.id}
            </div>
        );
    }

}

export default Dashboard;