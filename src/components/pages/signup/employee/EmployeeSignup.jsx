import React, { useState } from "react";

import styles from "./EmployeeSignup.module.css";
import { Container } from "../../../common/container/Container";
import FormLabel from "../../../common/form-label/FormLabel";
import { Input, Button, Divider, Tooltip } from "antd";
import { Link, useHistory } from "react-router-dom";
import { isValidEmail, validatePassword } from "../../../../util/Util";
import { InfoCircleOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { loadingStarted, loadingFinished } from "../../../../actions/CommonActions";
import { registerEmployee } from "../../../../api/UserApi";
import { EMPLOYEE_SIGNUP_SUCCESS_MSG, EMPLOYEE_SIGNUP_SUCCESS_HEADER } from "../../../../constants/MessageConstants";
import Banner from "../../../common/banners/Banner";

const labelStyles = { marginTop: "5px", display: "inline-block", fontSize: "16px", color: "#999999" };
const inputStyle = { width: "90%" };
const inputFullWidthStyle = {
    ...inputStyle,
    width: "100%",
    display: "inline-block",
    marginBottom: "10px",
    marginTop: "3px"
};

const EmployeeSignup = props => {
    const userDetailsObj = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: ""
    };
    const errorObj = {
        firstName: false,
        lastName: false,
        email: false,
        password: false,
        confirmPassword: false
    };
    const history = useHistory();

    const [userDetails, setUserDetails] = useState(userDetailsObj);
    const [userDetailsError, setUserDetailsError] = useState(errorObj);
    const [passwordValidationMessages, setPasswordValidationMessage] = useState([]);
    const [signUpSuccess, setSignUpSuccess] = useState(false);

    const createEmployee = async () => {
        props.actions.loadingStarted();

        let haveErrorInUserDetails = false;
        const userDetailsObj = { ...userDetails };
        let reqData = { ...userDetails };

        let userDetailsErrorObj = getErrorObject(userDetailsObj);
        haveErrorInUserDetails = checkForErrors(userDetailsErrorObj);

        setUserDetailsError({ ...userDetailsErrorObj });

        // check for password and confirm password . TODO: might have to validate it against an regular expression
        if (userDetailsObj.password !== userDetailsObj.confirmPassword) {
            return false;
        }

        const errors = await registerEmployee(reqData);
        if (errors.length > 0) {
            console.log("handle error");
        } else {
            setSignUpSuccess(true);
        }
        props.actions.loadingFinished();
    };

    const getErrorObject = valueObject => {
        const errorObj = {};

        const keys = Object.keys(valueObject);

        for (const key of keys) {
            if (valueObject[key]) {
                errorObj[key] = false;
            } else {
                errorObj[key] = true;
            }
        }

        return errorObj;
    };

    const checkForErrors = errorObject => {
        return Object.values(errorObject).includes(true) ? true : false;
    };

    return (
        <div className={styles.employeeSignupContainer}>
            <Container>
                <div className={`${styles.signUpDetails} ${signUpSuccess ? styles.hiddenForm : ""}`}>
                    <h2 className={styles.title}>Get started with your profile</h2>

                    <div className={styles.signUpForm}>
                        <div className={styles.btnContainer}>
                            <span className={styles.divider}>
                                <Divider>
                                    <span>Or</span>
                                </Divider>
                            </span>
                            <div className={styles.faceBookBtn}>
                                <Button type="primary" block size="large">
                                    Continue With Facebook
                                </Button>
                            </div>
                            <div className={styles.googleBtn}>
                                <Button type="primary" block size="large">
                                    Continue With Google
                                </Button>
                            </div>
                        </div>
                        <div className={styles.inputContainer}>
                            <div>
                                <FormLabel
                                    name="First Name"
                                    required
                                    error={userDetailsError.firstName}
                                    styles={labelStyles}
                                />
                                <Input
                                    size="large"
                                    style={inputFullWidthStyle}
                                    value={userDetails.firstName}
                                    onChange={event => {
                                        setUserDetails({ ...userDetails, firstName: event.target.value });
                                    }}
                                />
                            </div>
                            <div>
                                <FormLabel
                                    name="Last Name"
                                    required
                                    error={userDetailsError.lastName}
                                    styles={labelStyles}
                                />
                                <Input
                                    size="large"
                                    style={inputFullWidthStyle}
                                    value={userDetails.lastName}
                                    onChange={event => {
                                        setUserDetails({ ...userDetails, lastName: event.target.value });
                                    }}
                                />
                            </div>
                            <div>
                                <FormLabel
                                    name="Email Address"
                                    required
                                    error={userDetailsError.email}
                                    styles={labelStyles}
                                />
                                <Input
                                    size="large"
                                    style={inputFullWidthStyle}
                                    value={userDetails.email}
                                    onChange={event => {
                                        const value = event.target.value;
                                        if (isValidEmail(value)) {
                                            setUserDetailsError({ ...userDetailsError, email: false });
                                        } else {
                                            setUserDetailsError({ ...userDetailsError, email: true });
                                        }

                                        setUserDetails({ ...userDetails, email: value });
                                    }}
                                />
                            </div>
                            <div>
                                <FormLabel
                                    name="Password"
                                    required
                                    error={userDetailsError.password}
                                    styles={labelStyles}
                                >
                                    <Tooltip title="Password must contain atleast one captial letter, simple letter, number, symbol and minimum character length should be 6">
                                        <InfoCircleOutlined twoToneColor="#eb2f96" />
                                    </Tooltip>
                                </FormLabel>
                                <Input
                                    size="large"
                                    style={inputFullWidthStyle}
                                    value={userDetails.password}
                                    onChange={event => {
                                        setUserDetails({ ...userDetails, password: event.target.value });
                                    }}
                                    onBlur={() => {
                                        setPasswordValidationMessage(validatePassword(userDetails.password));
                                    }}
                                    type="password"
                                />
                            </div>
                            <div>
                                <FormLabel
                                    name="Confirm Password"
                                    required
                                    error={userDetailsError.confirmPassword}
                                    styles={labelStyles}
                                />
                                <Input
                                    size="large"
                                    style={inputFullWidthStyle}
                                    value={userDetails.confirmPassword}
                                    onChange={event => {
                                        setUserDetails({ ...userDetails, confirmPassword: event.target.value });
                                    }}
                                    onBlur={() => {
                                        if (userDetails.password !== userDetails.confirmPassword) {
                                            setUserDetailsError({ ...userDetailsError, confirmPassword: true });
                                        }
                                    }}
                                    type="password"
                                />
                            </div>
                        </div>
                    </div>
                    <div className={styles.agreementContainer}>
                        <div className={styles.agreement}>
                            By clicking Agree & Join, you agree to the Gorilla User Agreement, Privacy Policy, and
                            Cookie Policy.
                        </div>
                        <div className={styles.submitContainer}>
                            <Button type="primary" onClick={createEmployee}>
                                Agree & Join
                            </Button>
                        </div>
                        <div className={styles.signin}>
                            Already on Gorilla ? <Link to="/signin">Sign in</Link>
                        </div>
                    </div>
                </div>
                {signUpSuccess && (
                    <div className={`${signUpSuccess ? styles.showBanner : styles.hidden}`}>
                        <div className={styles.banner}>
                            <Banner
                                type="success"
                                header={EMPLOYEE_SIGNUP_SUCCESS_HEADER}
                                msg={EMPLOYEE_SIGNUP_SUCCESS_MSG}
                                btnText="OK"
                                btnAction={() => {
                                    history.push("/");
                                }}
                            ></Banner>
                        </div>
                    </div>
                )}
            </Container>
        </div>
    );
};

const mapDispatchToProps = dispatch => {
    return {
        actions: {
            loadingStarted: bindActionCreators(loadingStarted, dispatch),
            loadingFinished: bindActionCreators(loadingFinished, dispatch)
        }
    };
};

export default connect(undefined, mapDispatchToProps)(EmployeeSignup);
