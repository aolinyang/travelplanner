import React from "react";
import { Link } from "react-router-dom";
import "./frontPage.css";
import { APP_NAME, APP_DESC } from "./../../constants";

class FrontPage extends React.Component {

    constructor(props){
        super(props);
    }

    render() {
        return(
            <div id="mainpage">
                <div className="jumbotron container" id="mainTitle">
                    <h1>{APP_NAME}</h1>
                    <h3>{APP_DESC}</h3>
                    <div className="row" id="buttonRow">
                        <div className="col">
                            <Link to="/register"><button className="btn btn-lg btn-success float-right" id="leftButton">Get Started</button></Link>
                        </div>
                        <div className="col">
                            <Link to="/login"><button className="btn btn-lg btn-danger float-left" id="rightButton">Log In</button></Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default FrontPage;