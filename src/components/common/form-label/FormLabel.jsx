import React from "react";

const ErrorStyles = { color: "red", display: "block" };

const FormLabel = props => {
    return (
        <label style={props.styles}>
            <span style={props.error ? ErrorStyles : {}}>{props.required ? `${props.name}*` : `${props.name}`}</span>
        </label>
    );
};
export default FormLabel;
