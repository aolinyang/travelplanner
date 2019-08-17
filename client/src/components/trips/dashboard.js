import React from 'react';
import {inject, observer} from "mobx-react";
import TripList from "./triplist";
import "./dashboard.scss";
import fetchTrips from "./fetchtrips";

import { Button,
         Container } from 'reactstrap';

@inject("userStore")
@observer
class Dashboard extends React.Component {

    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        
    }

    render() {
        return(
            <div>
                <Container className="triplist">
                    <TripList />
                </Container>
                <Button className="addButton d-flex align-items-center justify-content-center" color="primary" onClick={this.handleClick}>+</Button>
            </div>
        );
    }

}

export default fetchTrips(Dashboard);