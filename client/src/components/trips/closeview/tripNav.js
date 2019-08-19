import React from "react";
import "./tripNav.scss";
import { withRouter, NavLink as NLink } from "react-router-dom";

import { Nav,
         NavItem,
         NavLink } from "reactstrap";

@withRouter
class TripNav extends React.Component {
    constructor(props){
        super(props);
        this.clickMain = this.clickMain.bind(this);
        this.clickItems = this.clickItems.bind(this);
        this.clickPlaces = this.clickPlaces.bind(this);
        this.clickLodging = this.clickLodging.bind(this);
        this.clickLog = this.clickLog.bind(this);
        this.clickLink = this.clickLink.bind(this);
    }

    clickMain() {
        this.clickLink("/main");
    }

    clickItems() {
        this.clickLink("/items");
    }

    clickPlaces() {
        this.clickLink("/places");
    }

    clickLodging() {
        this.clickLink("/lodging");
    }

    clickLog() {
        this.clickLink("/log");
    }

    clickLink(link) {
        let curUrl = this.props.location.pathname;
        let front = curUrl.substring(0, curUrl.lastIndexOf("/"));
        this.props.history.push(front + link);
    }
    
    render() {
        return(
            <Nav tabs>
                <NavItem>
                    <NavLink tag={NLink} active={this.props.aspect === 'main'} onClick={this.clickMain}>Main</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink tag={NLink} active={this.props.aspect === 'items'} onClick={this.clickItems}>Items</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink tag={NLink} active={this.props.aspect === 'places'} onClick={this.clickPlaces}>Places</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink tag={NLink} active={this.props.aspect === 'lodging'} onClick={this.clickLodging}>Lodging</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink tag={NLink} active={this.props.aspect === 'log'} onClick={this.clickLog}>Travel Log</NavLink>
                </NavItem>
            </Nav>
        );
    }
}

export default TripNav;