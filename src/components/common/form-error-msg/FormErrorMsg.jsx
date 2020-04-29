import React from "react";

const ErrorStyles = { color: "red", display: "block", margin: "auto 5px", fontSize: "14px", height: "20px" };

const FormErrorMsg = props => {
    return <span style={ErrorStyles}>{props.msg ? props.msg : ""}</span>;
};
export default FormErrorMsg;
