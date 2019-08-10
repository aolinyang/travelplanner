import React from "react";
import "./authPage.css";
import RegisterForm from "./registerForm";
import LoginForm from "./loginForm";
import { withRouter } from 'react-router-dom';

class AuthPage extends React.Component {

    constructor(props) {
        super(props);
        if (this.props.type === 'login') {
            this.state = {
                toShow: <LoginForm />
            };
        } else if (this.props.type === 'register') {
            this.state = {
                toShow: <RegisterForm />
            };
        }
    }

    render() {
        return(
            <div>
                {this.state.toShow}
            </div>
        );
    }

}

export default withRouter(AuthPage);