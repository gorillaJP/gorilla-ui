import React from "react";

const ErrorStyles = { color: "red", display: "inline-block" };

const FormErrorMsg = props => {
    return <span style={ErrorStyles}>{props.msg ? props.msg : ""}</span>;
};
export default FormErrorMsg;
