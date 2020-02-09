import React from "react";

const ErrorStyles = { color: "red", display: "block" };

const FormLabel = props => {
    return (
        <label style={props.styles}>
            <span style={props.error ? ErrorStyles : {}}>
                {props.name} {props.required ? "*" : ""}
            </span>
        </label>
    );
};
export default FormLabel;
