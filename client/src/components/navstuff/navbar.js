import React from 'react';
import "./navbar.scss";
import { Link } from "react-router-dom";
import { APP_NAME } from './../../constants';
import {inject, observer} from "mobx-react";

import { Navbar, 
         NavbarBrand, 
         Nav, 
         NavItem, 
         NavLink, 
         UncontrolledDropdown, 
         DropdownToggle, 
         DropdownMenu, 
         DropdownItem,
         Button,
         Row,
         Col,
         Container } from "reactstrap";

const TopNavbar = inject("userStore")(observer(function(props) {
    let drop = typeof props.userStore.user_info.id === 'undefined' ? (
        <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret className="dropIcon">
                <i className="fas fa-user-circle"></i><span> {props.userStore.user_info.first_name}</span>
            </DropdownToggle>
            <DropdownMenu right>
                <Container className="dropMenu">
                    <p>You are not logged in.</p>
                    <Row>
                        <Col>
                            <Link to="/register"><Button color="success">Get Started</Button></Link>
                        </Col>
                        <Col>
                            <Link to="/login"><Button color="danger">Log In</Button></Link>
                        </Col>
                    </Row>
                </Container>
            </DropdownMenu>
        </UncontrolledDropdown>
    ) : (
        <NavDropdown contents={{
            head: <React.Fragment><i className="fas fa-user-circle"></i><span> {props.userStore.user_info.first_name}</span></React.Fragment>,
            options: [
                {name: "Account", link: "/account"},
                {name: "Help", link: "/contact"},
                {name: <div><i class="fas fa-power-off"></i> Log Off</div>, link: "/logout"}
            ]
        }} />
    );

    return(
        <Navbar className="topnav" expand="md">
            <Link to="/dashboard" className="branding"><NavbarBrand className="innerbrand">{APP_NAME}</NavbarBrand></Link>

            <Nav className="ml-auto" navbar>
                {drop}
            </Nav>
        </Navbar>
    );
}));

function AfterNavbar(props) {
        return(
            <Navbar className="mainnav" expand="md">
                <Nav className="mainnavbar" navbar>
                    <NavOptions contents={[
                        {name: "My Plans", link: "/dashboard", special: true},
                        {name: "Places to Visit", link: "/sug"}
                    ]} />
                </Nav>
            </Navbar>
        );
}

//all the links up front
function NavOptions(props) {
    return(
        props.contents.map((val) => {
            let linkClass = typeof val.special === 'undefined' ? "navOptionLink" : "navOptionLink specialNavlink"
            return (
                <NavItem className="navOption d-flex align-items-center">
                    <NavLink tag={Link} to={val.link} className={linkClass}>{val.name}</NavLink>
                </NavItem>
            );
        })
    );
}

//the dropdown
function NavDropdown(props) {
    return (
        <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret className="dropIcon">
                {props.contents.head}
            </DropdownToggle>
            <DropdownMenu right>
                {props.contents.options.map(val => <DropItem content={val}/>)}
            </DropdownMenu>
        </UncontrolledDropdown>
    );
}

//a single dropdown link
function DropItem(props) {
    if (props.content.name === 'DIVIDER') {
        return (
            <DropdownItem divider />
        )
    }
    return(
        <DropdownItem>
            <NavLink tag={Link} to={props.content.link} className="dropOption">{props.content.name}</NavLink>
        </DropdownItem>
    );
}

export { TopNavbar, AfterNavbar };