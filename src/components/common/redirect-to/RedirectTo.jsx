import React from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";

const RedirectTo = props => {
    return <Redirect to={"/" + (props.to ? props.to : "") + (props.from ? "?" + props.from : "")} />;
};

RedirectTo.propTypes = {
    from: PropTypes.string
};

export default RedirectTo;
