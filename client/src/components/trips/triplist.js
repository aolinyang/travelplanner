import React from "react";
import "./triplist.scss";
import TripCard from "./tripcard";
import { inject, observer } from "mobx-react";

@inject('userStore')
@observer
class TripList extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        
        return(
            <React.Fragment>
                {this.props.userStore.all_trips.map((trip) => <TripCard trip_info={trip} />)}
            </React.Fragment>
        );
    }

}

export default TripList;