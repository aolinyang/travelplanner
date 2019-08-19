import React from "react";
import { inject, observer } from "mobx-react";
import getSpecTrip from "./../misc/getSpecTrip";
import fetchTrips from "./../misc/fetchtrips";
import InputField from "./../../login/inputField";
import "./editTrips.scss";
import TripNav from "./../closeview/tripNav";
import {when} from "mobx";

import { Container,
         Form,
         Row,
         Col } from "reactstrap";

@inject("userStore")
@observer
class Editor extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        when(
            () => typeof this.props.tripToRender !== 'undefined',
            () => {
                let trip = this.props.tripToRender;
                this.setState({
                    trip_name: trip.trip_name,
                    trip_type: trip.trip_type,
                    start_date: trip.start_date,
                    end_date: trip.end_date
                });
            }
        );
    }

    render() {
        if (typeof this.props.tripToRender === 'undefined') {
            return(
                <div>
                    No such trip found. Try again.
                </div>
            );
        } else {
            return(
                <React.Fragment>
                    <TripNav {...this.props.match.params} />
                    
                </React.Fragment>
            );
        }
    }

}

export default fetchTrips(getSpecTrip(Editor));