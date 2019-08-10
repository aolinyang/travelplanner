import React from "react";
import "./loginForm.css";
import { withRouter, Link } from 'react-router-dom';
import {inject, observer} from "mobx-react";

import InputField from "./inputField";
import handleLogin from "./../../utils/login/handleLogin";

@inject("userStore")
@observer
class LoginForm extends React.Component {

    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.state = {
            email: "",
            password: ""
        }
    }

    handleEmailChange(event) {
        this.setState({
            email: event.target.value
        }, document.getElementById('loginEmailInput').setCustomValidity(""));
    }

    handlePasswordChange(event) {
        this.setState({
            password: event.target.value
        }, document.getElementById('loginPasswordInput').setCustomValidity(""));
    }

    async handleSubmit(e) {
        e.preventDefault();
        let result = await handleLogin(this.state);
        if (result === 500)
            alert("Something went wrong. Try again in a few minutes.");
        else if (result.code === -1) {
            document.getElementById('loginEmailInput').setCustomValidity("Email does not exist.");
        } else if (result.code == 1) {
            document.getElementById('loginPasswordInput').setCustomValidity("Incorrect password. Try again.");
        } else if (result.code == 0) {
            this.props.userStore.supply_user(result.user_info);
            this.props.history.push('/dashboard');
        }
    }

    render() {
        return(
            <div>
                <form className="authForm" onSubmit={this.handleSubmit}>
                    <h2 className="authTitle">Login</h2>
                    <div className="container">
                        <InputField fieldId="loginEmailInput" inputType="email" name="Email" value={this.state.email} 
                                    handleChange={this.handleEmailChange} placeHolder="" />
                        <InputField fieldId="loginPasswordInput" inputType="password" name="Password" value={this.state.password} 
                                    handleChange={this.handlePasswordChange} placeHolder="" />
                        <button type="submit" className="btn btn-primary btn-lg btn-block submitButton">Login</button>
                    </div>
                </form>
                <p className="alternateOption">Don't have an account? <Link to="/register">Register here</Link></p>
            </div>
        );
    }

}

export default withRouter(LoginForm);