import React from 'react';
import "./navbar.scss";
import { Link } from "react-router-dom";
import { APP_NAME } from './../../constants';

import { Navbar, 
         NavbarBrand, 
         Nav, 
         NavItem, 
         NavLink, 
         UncontrolledDropdown, 
         DropdownToggle, 
         DropdownMenu, 
         DropdownItem } from "reactstrap";

function AfterNavbar(props) {
        return(
            <Navbar className="mainnav" expand="md">
                <Link to="/dashboard" className="branding"><NavbarBrand>{APP_NAME}</NavbarBrand></Link>
                
                <Nav className="ml-auto" navbar>
                    <NavOptions contents={[
                        {name: "Test", link: "/test"},
                        {name: "Other", link: "/other"}
                    ]} />
                    <NavDropdown contents={{
                            head: <i className="fas fa-user-circle"></i>,
                            options: [
                                {name: "Option", link: "/option"},
                                {name: "DIVIDER"},
                                {name: "Another Option", link: "/anotheroption"},
                                {name: <div><i class="fas fa-power-off"></i> Log Off</div>, link: "/third"}
                            ]
                        }} />
                </Nav>
            </Navbar>
        );
}

//all the links up front
function NavOptions(props) {
    return(
        props.contents.map(val => <NavItem className="navOption">
                                    <NavLink tag={Link} to={val.link} className="navOptionLink">{val.name}</NavLink>
                                  </NavItem>)
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
        <DropdownItem className="dropItem">
            <NavLink tag={Link} to={props.content.link} className="dropOption">{props.content.name}</NavLink>
        </DropdownItem>
    );
}

export { AfterNavbar };