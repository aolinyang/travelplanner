import React from "react";
import "./tripcard.scss";
import { months, days } from "./../../../constants";

import { Card,
         CardHeader,
         CardTitle,
         CardSubtitle,
         CardBody,
         CardText,
         CardFooter,
         Button } from "reactstrap";

class TripCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            start_date: new Date(this.props.trip_info.start_date),
            end_date: new Date(this.props.trip_info.end_date)
        }
    }

    render() {
        return(
            <Card className="tripcard">
                <CardHeader tag="h3">{this.props.trip_info.trip_name}</CardHeader>
                <CardBody>
                    <CardText>{"ID: " + this.props.trip_info.trip_id}</CardText>
                    <CardText>{"Type: " + this.props.trip_info.trip_type}</CardText>
                    <CardText>{"Start date: " + days[this.state.start_date.getDay()] + ", " + months[this.state.start_date.getMonth()] + " " + this.state.start_date.getDate() + ", " + this.state.start_date.getFullYear()}</CardText>
                    <CardText>{"End date: " + days[this.state.end_date.getDay()] + ", " + months[this.state.end_date.getMonth()] + " " + this.state.end_date.getDate() + ", " + this.state.end_date.getFullYear()}</CardText>
                </CardBody>
            </Card>
        );
    }

}

export default TripCard;