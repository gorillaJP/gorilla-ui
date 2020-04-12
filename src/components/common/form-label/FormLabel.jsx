import React from "react";

const ErrorStyles = { color: "red", display: "inline-block" };

const FormLabel = props => {
    return (
        <label style={props.styles}>
            <span style={props.error ? ErrorStyles : {}}>{props.name} </span>
            {props.required && <span style={ErrorStyles}>*</span>}
            <span style={{ marginLeft: "10px" }}>{props.children}</span>
        </label>
    );
};
export default FormLabel;
