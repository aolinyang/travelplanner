import React from "react";
import "./searchTripBar.scss";

import { InputGroup,
         InputGroupAddon,
         Input } from "reactstrap";

class SearchTripBar extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <InputGroup className="searchGroup">
                <Input type="text" 
                       name="tripsearch" 
                       id="tsearch"
                       onChange={this.props.handleType}
                       value={this.props.searchText}
                       placeHolder="Search for a trip...">
                </Input>   
            </InputGroup>
        );
    }

}

export default SearchTripBar;