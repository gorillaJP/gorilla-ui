import React from "react";

const ErrorStyles = { color: "red", display: "inline-block", margin: "5px" };

const FormErrorMsg = props => {
    return <span style={ErrorStyles}>{props.msg ? props.msg : ""}</span>;
};
export default FormErrorMsg;
