import React from "react";
import "./triplist.scss";
import TripCard from "./../closeview/tripcard";
import { inject, observer } from "mobx-react";

import { Spinner } from "reactstrap";

@inject('userStore')
@observer
class TripList extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        
        if (typeof this.props.userStore.all_trips === 'undefined') {
            return(
                <div className="d-flex justify-content-center">
                    <Spinner color="primary" />
                </div>
            );
        }
        else if (this.props.userStore.all_trips === -1) {
            return(
                <p className="d-flex justify-content-center">You have no trips yet!</p>
            );
        }
        else if (this.props.userStore.all_trips === 500) {
            return(
                <p className="d-flex justify-content-center">Error loading trips.</p>
            );
        }
        else {
            return(
                <React.Fragment>
                    {this.props.userStore.all_trips.map((trip) => {
                        if (trip.trip_name.toUpperCase().indexOf(this.props.toDisplay.toUpperCase()) !== -1) {
                            return <TripCard trip_info={trip} />
                        }
                    })}
                </React.Fragment>
            );
        }

    }

}

export default TripList;