import React from "react";
import "./tripcard.scss";
import { months, days } from "./../../../constants";
import { Link } from "react-router-dom";

import { Card,
         CardHeader,
         CardTitle,
         CardSubtitle,
         CardBody,
         CardText,
         CardFooter,
         Button,
         Row,
         Col,
         Modal,
         ModalHeader,
         ModalBody,
         ModalFooter } from "reactstrap";
import { inject, observer } from "mobx-react";

class TripCard extends React.Component {

    constructor(props) {
        super(props);
        this.mouseOver = this.mouseOver.bind(this);
        this.mouseLeave = this.mouseLeave.bind(this);
        this.state = {
            start_date: new Date(this.props.trip_info.start_date),
            end_date: new Date(this.props.trip_info.end_date),
            toDisplayButtons: "hidden"
        }
    }

    componentDidMount() {
        if (this.props.trip_info.status === 'Complete') {
            this.setState({completeColor: "#28a745"})
        }
        else if (this.props.trip_info.status === 'Ongoing') {
            this.setState({completeColor: "#ffc107"})
        }
        else {
            this.setState({completeColor: "#dc3545"})
        }
    }

    mouseOver() {
        this.setState({
                toDisplayButtons: "visible"
            }
        );
    }

    mouseLeave() {
        this.setState({
                toDisplayButtons: "hidden"
            }
        );
    }

    render() {
        return(
            <Card className="tripcard" onMouseOver={this.mouseOver} onMouseLeave={this.mouseLeave}>
                <CardHeader tag="h3">{this.props.trip_info.trip_name}</CardHeader>
                <CardBody>
                    <Row>
                        <Col md={11}>
                            <CardText>{"Type: " + this.props.trip_info.trip_type}</CardText>
                            <CardText>{"Start date: " + days[this.state.start_date.getDay()] + ", " + months[this.state.start_date.getMonth()] + " " + this.state.start_date.getDate() + ", " + this.state.start_date.getFullYear()}</CardText>
                            <CardText>{"End date: " + days[this.state.end_date.getDay()] + ", " + months[this.state.end_date.getMonth()] + " " + this.state.end_date.getDate() + ", " + this.state.end_date.getFullYear()}</CardText>
                            <CardText style={{color: this.state.completeColor}}>{this.props.trip_info.status}</CardText>
                        </Col>
                        <Col md={1}>
                            <SmallButtonRow toDisplay={this.state.toDisplayButtons} trip_id={this.props.trip_info.trip_id} />
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        );
    }

}

@inject("userStore")
@observer
class SmallButtonRow extends React.Component {
    constructor(props) {
        super(props);
        this.tryDelete = this.tryDelete.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.deleteTrip = this.deleteTrip.bind(this);
        this.state = {
            deleteModalOpen: false
        }
    }

    tryDelete() {
        this.setState({
            deleteModalOpen: true
        });
    }

    closeModal() {
        this.setState({
            deleteModalOpen: false
        });
    }

    async deleteTrip() {
        let result = await this.props.userStore.delete_trip(this.props.trip_id);
        if (result === 403) {
            alert("FORBIDDEN: this is not your trip!");
        } else if (result === 500) {
            alert("INTERNAL SERVER ERROR: something went wrong.");
        }
        window.location.reload();
    }

    render() {
        return (
            <React.Fragment>
                <div className="smallButtonRow" style={{visibility: this.props.toDisplay}}>
                    <Link to={`/trips/${this.props.trip_id}/view/main`}><Button color="primary" className="smallButton"><i class="fas fa-eye"></i></Button></Link>
                    <Link to={`/trips/${this.props.trip_id}/edit/main`}><Button color="success" className="smallButton"><i class="fas fa-pen"></i></Button></Link>
                    <Button color="danger" className="smallButton" onClick={this.tryDelete}><i class="fas fa-trash"></i></Button>
                </div>
                <Modal isOpen={this.state.deleteModalOpen} returnFocusAfterClose={false}>
                    <ModalHeader toggle={this.closeModal}>
                        Confirm trip deletion
                    </ModalHeader>
                    <ModalBody toggle={this.closeModal}>
                        Are you sure you want to delete this trip?
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" onClick={this.deleteTrip}>Delete</Button>
                        <Button color="success" onClick={this.closeModal}>Keep</Button>
                    </ModalFooter>
                </Modal>
            </React.Fragment>
        );
    }
}

export default TripCard;