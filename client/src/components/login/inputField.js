import React from "react";

import { FormGroup, Label, Input } from "reactstrap";

const InputField = (props) => {
        return (
            <FormGroup>
                <Label for={props.fieldId} className="col-form-label">{props.name}</Label>
                <Input type={props.inputType}
                       id={props.fieldId}
                       value={props.value} 
                       onChange={props.handleChange} 
                       placeholder={props.placeHolder} 
                       required>
                    {props.children}
                </Input>
            </FormGroup>
        );
}

export default InputField;