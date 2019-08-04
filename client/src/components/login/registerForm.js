import React from "react";
import "./registerForm.css";

import InputField from "./inputField";
import handleRegister from "./../../utils/login/handleRegister";

class RegisterForm extends React.Component {

    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFnChange = this.handleFnChange.bind(this);
        this.handleLnChange = this.handleLnChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleCPasswordChange = this.handleCPasswordChange.bind(this);
        this.validatePassword = this.validatePassword.bind(this);
        this.state = {
            first_name: "",
            last_name: "",
            email: "",
            password: "",
            confirmPassword: ""
        }
    }

    handleFnChange(event) {
        this.setState({
            first_name: event.target.value
        });
    }

    handleLnChange(event) {
        this.setState({
            last_name: event.target.value
        });
    }

    handleEmailChange(event) {
        this.setState({
            email: event.target.value
        }, document.getElementById('registerEmailInput').setCustomValidity(""));
    }

    handlePasswordChange(event) {
        this.setState({
            password: event.target.value
        }, this.validatePassword);
    }

    handleCPasswordChange(event) {
        this.setState({
            confirmPassword: event.target.value
        }, this.validatePassword);
    }

    async handleSubmit(e) {
        e.preventDefault();
        let result = await handleRegister(this.state);
        alert(result);
        if (result === -1) {
            document.getElementById('registerEmailInput').setCustomValidity("Email already taken.");
        } else if (result === 0) {
            this.props.history.push("/test");
        }
    }

    validatePassword() {
    
        let validity = this.state.password !== this.state.confirmPassword ? "Passwords don't match" : "";
        document.getElementById('registerCPasswordInput').setCustomValidity(validity);

    }

    render() {
        return(
            <form onSubmit={this.handleSubmit}>
                <h2>Register</h2>
                <div className="container">
                    <div className="row">
                        <div className="col-6">
                            <InputField fieldId="registerFirstNameInput" inputType="text" name="First Name" value={this.state.first_name} 
                                        handleChange={this.handleFnChange} placeHolder="e.g. John" />
                        </div>
                        <div className="col-6">
                            <InputField fieldId="registerLastNameInput" inputType="text" name="Last Name" value={this.state.last_name} 
                                        handleChange={this.handleLnChange} placeHolder="e.g. Doe" />
                        </div>
                    </div>
                    <InputField fieldId="registerEmailInput" inputType="email" name="Email" value={this.state.email} 
                                handleChange={this.handleEmailChange} placeHolder="e.g. username123@example.com" />
                    <InputField fieldId="registerPasswordInput" inputType="password" name="Password" value={this.state.password} 
                                handleChange={this.handlePasswordChange} placeHolder="" />
                    <InputField fieldId="registerCPasswordInput" inputType="password" name="Confirm Password" value={this.state.confirmPassword} 
                                handleChange={this.handleCPasswordChange} placeHolder="" />
                    <button type="submit" className="btn btn-primary btn-lg btn-block" id="submitButton">Submit</button>
                </div>
            </form>
        );
    }

}

export default RegisterForm;