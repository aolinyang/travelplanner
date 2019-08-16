import React from "react";
import { TopNavbar } from "./navbar";
import Footer from "./footer";
import "./addComponents.scss";

function withUtils(PageComponent) {
    return function(props) {
        return(
            <React.Fragment>
                <TopNavbar />
                <PageComponent {...props} />
                <Footer className="footer" />
            </React.Fragment>
        );
    }
}

export default withUtils;