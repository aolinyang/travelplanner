import React from "react";

class InputField extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="form-group">
                <label htmlFor={this.props.fieldId} className="col-form-label">{this.props.name}</label>
                <div>
                    <input type={this.props.inputType}
                            className="form-control"
                            id={this.props.fieldId}
                            value={this.props.value} 
                            onChange={this.props.handleChange} 
                            placeholder={this.props.placeHolder} 
                            required 
                    />
                </div>
            </div>
        );
    }

}

export default InputField;