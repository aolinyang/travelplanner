import React from "react";
import { Link } from "react-router-dom";
import "./frontPage.scss";
import { APP_NAME, APP_DESC } from "./../../constants";
import { Jumbotron, 
         Container,
         Row,
         Col } from "reactstrap";

class FrontPage extends React.Component {

    constructor(props){
        super(props);
    }

    render() {
        return(
            <div id="mainpage">
                <Jumbotron id="mainTitle">
                    <Container>
                        <h1>{APP_NAME}</h1>
                        <h3>{APP_DESC}</h3>
                        <Row className="buttonRowFront">
                            <Col>
                                <Link to="/register"><button className="btn btn-lg btn-success float-right frontButton" id="leftButton">Get Started</button></Link>
                            </Col>
                            <Col>
                                <Link to="/login"><button className="btn btn-lg btn-danger float-left frontButton" id="rightButton">Log In</button></Link>
                            </Col>
                        </Row>
                    </Container>
                </Jumbotron>
            </div>
        );
    }

}

export default FrontPage;