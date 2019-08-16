import React from "react";
import { Link } from "react-router-dom";
import "./frontPage.scss";
import { APP_NAME, APP_DESC } from "./../../constants";
import { Jumbotron, 
         Container,
         Row,
         Col,
         Button } from "reactstrap";

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
                                <Link to="/register"><Button color="success" size="lg" className="frontButton float-right" id="leftButton">Get Started</Button></Link>
                            </Col>
                            <Col>
                                <Link to="/login"><Button color="danger" size="lg" className="frontButton float-left" id="rightButton">Log In</Button></Link>
                            </Col>
                        </Row>
                    </Container>
                </Jumbotron>
            </div>
        );
    }

}

export default FrontPage;