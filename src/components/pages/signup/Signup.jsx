import React from "react";
import { connect } from "react-redux";
import { EMPLOYEE } from "../../../constants/AppConstants";
import EmployeeSignup from "./employee/EmployeeSignup";
import EmployerSignup from "./employer/EmployerSignup";

const Signup = props => {
    const { domain } = props;
    if (domain === EMPLOYEE) {
        return <EmployeeSignup />;
    } else {
        return <EmployerSignup />;
    }
};

const mapStateToProps = state => {
    return {
        domain: state.metaData.domain
    };
};

export default connect(mapStateToProps, undefined)(Signup);
