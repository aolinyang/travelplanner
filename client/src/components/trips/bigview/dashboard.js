import React from 'react';
import {inject, observer} from "mobx-react";
import TripList from "./triplist";
import "./dashboard.scss";
import fetchTrips from "./../misc/fetchtrips";
import SearchBar from "./../misc/searchTripBar";
import inputField from "./../../login/inputField";
import { withRouter } from "react-router-dom";
import { when } from "mobx";

import { Button,
         Container,
         Modal,
         ModalHeader,
         ModalBody,
         ModalFooter,
         Form } from 'reactstrap';
import InputField from './../../login/inputField';

@inject("userStore")
@observer
class Dashboard extends React.Component {

    constructor(props){
        super(props);
        this.handleSearchType = this.handleSearchType.bind(this);
        this.handleAddTrip = this.handleAddTrip.bind(this);
        this.handleClosePopup = this.handleClosePopup.bind(this);
        this.state = {
            searchText: "",
            popupOpen: false
        }
    }

    handleSearchType(e) {
        this.setState({
            searchText: e.target.value
        });
    }

    handleAddTrip() {
        this.setState({
            popupOpen: true
        });
    }

    handleClosePopup() {
        this.setState({
            popupOpen: false
        });
    }

    render() {
        const RouterPopup = withRouter(AddPopup);
        return(
            <div>
                <Container className="triplist">
                    <SearchBar handleType={this.handleSearchType} searchText={this.state.searchText} />
                    <TripList toDisplay={this.state.searchText} />
                </Container>
                <Button className="addButton d-flex align-items-center justify-content-center" onClick={this.handleAddTrip}>+</Button>
                <RouterPopup isOpen={this.state.popupOpen} toClose={this.handleClosePopup} />
            </div>
        );
    }

}

@inject("userStore")
@observer
class AddPopup extends React.Component {

    dateFormat = `${new Date().getFullYear()}-${`${new Date().getMonth() +
        1}`.padStart(2, 0)}-${`${new Date().getDate()}`.padStart(
        2,
        0
      )}T${`${new Date().getHours()}`.padStart(
        2,
        0
      )}:${`${new Date().getMinutes()}`.padStart(2, 0)}`;

    initialState = {
        trip_name: "",
        trip_type: "Other",
        start_date: this.dateFormat,
        end_date: this.dateFormat
    }

    constructor(props) {
        super(props);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleTripTypeChange = this.handleTripTypeChange.bind(this);
        this.handleStartDateChange = this.handleStartDateChange.bind(this);
        this.handleEndDateChange = this.handleEndDateChange.bind(this);
        this.onClose = this.onClose.bind(this);
        this.onCreate = this.onCreate.bind(this);
        this.state = this.initialState;
    }

    handleNameChange(e) {
        this.setState({
            trip_name: e.target.value
        });
    }

    handleTripTypeChange(e) {
        this.setState({
            trip_type: e.target.value
        });
    }

    handleStartDateChange(e) {
        this.setState({
            start_date: e.target.value
        });
    }

    handleEndDateChange(e) {
        this.setState({
            end_date: e.target.value
        });
    }

    onClose() {
        const keys = Object.keys(this.state);
        const stateReset = keys.reduce((acc, v) => ({ ...acc, [v]: "" }), {});
        this.setState({ ...stateReset, ...this.initialState });
        this.props.toClose();
    }

    async onCreate() {
        let result = await this.props.userStore.add_trip(this.state);
        if (result.code === 500) {
            alert("STATUS: 500 - Internal Server Error");
            this.onClose();
        } else if (result.code === 403) {
            alert("STATUS: 403 (FORBIDDEN) - This is not your trip!");
            this.onClose();
        } else {
            this.props.history.push(`/trips/${result.trip_id}/edit/main`);
        }
    }

    render() {
        return(
            <Modal isOpen={this.props.isOpen} returnFocusAfterClose={false}>
                <ModalHeader toggle={this.onClose}>
                    Create New Trip
                </ModalHeader>
                <ModalBody>
                    <Form>
                        <InputField fieldId="addTripNameInput" inputType="text" name="Trip Name" value={this.state.trip_name} 
                                    handleChange={this.handleNameChange} placeHolder="" />
                        <InputField fieldId="addTripTypeInput" inputType="select" name="Trip Type" value={this.state.trip_type} 
                                    handleChange={this.handleTripTypeChange} placeHolder="">
                            <option value="Vacation">Vacation</option>
                            <option value="Work">Work</option>
                            <option value="Visiting Family">Visiting Family</option>
                            <option value="Hiking">Hiking</option>
                            <option value="Other">Other</option>
                        </InputField>
                        <InputField fieldId="addStartDateInput" inputType="datetime-local" name="Trip Start Date" value={this.state.start_date} 
                                    handleChange={this.handleStartDateChange} placeHolder="" />
                        <InputField fieldId="addEndDateInput" inputType="datetime-local" name="Trip End Date" value={this.state.end_date} 
                                    handleChange={this.handleEndDateChange} placeHolder="" />
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="success" onClick={this.onCreate}>Create</Button>
                    <Button color="danger" onClick={this.onClose}>Cancel</Button>
                </ModalFooter>
            </Modal>
        );
    }

}

export default fetchTrips(Dashboard);