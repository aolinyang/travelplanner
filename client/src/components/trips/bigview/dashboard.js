import React from 'react';
import {inject, observer} from "mobx-react";
import TripList from "./triplist";
import "./dashboard.scss";
import fetchTrips from "./../misc/fetchtrips";
import SearchBar from "./../misc/searchTripBar";

import { Button,
         Container } from 'reactstrap';

@inject("userStore")
@observer
class Dashboard extends React.Component {

    constructor(props){
        super(props);
        this.handleSearchType = this.handleSearchType.bind(this);
        this.handleAddTrip = this.handleAddTrip.bind(this);
        this.state = {
            searchText: ""
        }
    }

    handleSearchType(e) {
        this.setState({
            searchText: e.target.value
        });
    }

    handleAddTrip() {
        
    }

    render() {
        return(
            <div>
                <Container className="triplist">
                    <SearchBar handleType={this.handleSearchType} searchText={this.state.searchText} />
                    <TripList toDisplay={this.state.searchText} />
                </Container>
                <Button className="addButton d-flex align-items-center justify-content-center" color="primary" onClick={this.handleAddTrip}>+</Button>
            </div>
        );
    }

}

export default fetchTrips(Dashboard);