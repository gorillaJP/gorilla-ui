import React from "react";

const ErrorStyles = { color: "red", display: "inline-block" };

const FormErrorMsg = props => {
    return props.msg ? <span style={ErrorStyles}>{props.msg}</span> : null;
};
export default FormErrorMsg;
