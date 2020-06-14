import React, { useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import styles from "./EmployerSignup.module.css";
import FormLabel from "../../../common/form-label/FormLabel";
import { Input, Button, Upload, AutoComplete, Tooltip } from "antd";
import { UploadOutlined, InfoCircleOutlined } from "@ant-design/icons";
import Editor from "../../../common/editor/Editor";
import { Link, useHistory } from "react-router-dom";

import { Container } from "../../../common/container/Container";
import { companyNamesAutoComplete } from "../../../../api/AutoCompleteApi";
import { isValidEmail, isValidContactNumber, validatePassword } from "../../../../util/Util";
import { loadingStarted, loadingFinished } from "../../../../actions/CommonActions";
import { registerEmployer } from "../../../../api/UserApi";
import FormErrorMsg from "../../../common/form-error-msg/FormErrorMsg";
import Banner from "../../../common/banners/Banner";
import { EMPLOYER_SIGNUP_SUCCESS_HEADER, EMPLOYER_SIGNUP_SUCCESS_MSG } from "../../../../constants/MessageConstants";

const inputStyle = { marginTop: "5px", width: "100%" };
const inputFullWidthStyle = { ...inputStyle, display: "inline-block" };
const errorInput = { ...inputFullWidthStyle, border: "1px solid red" };
const labelStyles = { marginTop: "5px", display: "inline-block", fontSize: "16px" };
const AutoCompleteOption = AutoComplete.Option;

const EmployerSignup = props => {
    const userObj = {
        firstName: "",
        lastName: "",
        email: "",
        phonenumber: "",
        password: "",
        confirmPassword: "",
        companyName: undefined
    };

    const companyObj = {
        name: undefined,
        logo: "",
        email: "",
        phonenumber: "",
        description: ""
    };

    const userDetailsErrorObj = {
        firstName: false,
        lastName: false,
        email: false,
        phonenumber: false,
        password: false,
        confirmPassword: false,
        companyName: false
    };

    const companyDetailsErrorObj = {
        name: false,
        logo: false,
        email: false,
        phonenumber: false,
        description: false
    };

    const [userDetails, setUserDetails] = useState(userObj);

    const [userErrorMsg, setUserErrMsg] = useState(userObj);

    const [signUpSuccess, setSignUpSuccess] = useState(false);

    const [userDetailsErrors, setUserDetailsErrors] = useState(userDetailsErrorObj);

    const [companyDetails, setCompanyDetails] = useState(companyObj);

    const [companyErrMsg, setCompanyErrMsg] = useState(companyObj);

    const [companyDetailsErrors, setCompanyDetailsErrors] = useState(companyDetailsErrorObj);

    const [passwordValidationMessages, setPasswordValidationMessage] = useState([]);

    const [addCompanyForm, toggleAddCompany] = useState(false);
    const [companyNames, setCompanyNames] = useState([]);

    const setUserDetailsObject = (field, value) => {
        if (value) {
            setUserDetailsErrors({ ...userDetailsErrors, [field]: false });
            setCompanyDetailsErrors(companyDetailsErrorObj);
        } else {
            setUserDetailsErrors({ ...userDetailsErrors, [field]: true });
        }

        setUserDetails({ ...userDetails, [field]: value });
    };

    const setCompanyDetailsObject = (field, value) => {
        if (value) {
            setCompanyDetailsErrors({ ...companyDetailsErrors, [field]: false });
        } else {
            setCompanyDetailsErrors({ ...companyDetailsErrors, [field]: true });
        }

        setCompanyDetails({ ...companyDetails, [field]: value });
    };

    const addCompany = () => {
        toggleAddCompany(true);
        setUserDetails({ ...userDetails, companyName: undefined });
    };

    const createEmployer = async () => {
        props.actions.loadingStarted();

        let haveErrorInUserDetails = false;
        let haveErrorInCompanyDetails = false;
        const userDetailsObj = { ...userDetails };
        const companyDetailsObj = { ...companyDetails };
        let reqData = { ...userDetails };

        let userDetailsErrorObj = getErrorObject(userDetailsObj);
        haveErrorInUserDetails = checkForErrors(userDetailsErrorObj);

        setUserDetailsErrors({ ...userDetailsErrorObj });

        // check for password and confirm password . TODO: might have to validate it against an regular expression
        if (userDetailsObj.password !== userDetailsObj.confirmPassword) {
            return false;
        }

        // For now set an sample string to company logo.
        // TODO: remove the sample logo string and introduce file upload to and set the URL
        companyDetailsObj.logo = "https://gorilla/assets/sampleimage";

        let companyDetailsErrorObj = { ...companyDetailsErrors };

        if (addCompanyForm && !userDetailsObj.companyName) {
            userDetailsObj.companyName = companyDetails.name;
            let userDetailsErrorObj = getErrorObject(userDetailsObj);
            haveErrorInUserDetails = checkForErrors(userDetailsErrorObj);

            setUserDetailsErrors({ ...userDetailsErrorObj });

            companyDetailsErrorObj = getErrorObject(companyDetailsObj);
            haveErrorInCompanyDetails = checkForErrors(haveErrorInCompanyDetails);

            setCompanyDetailsErrors(companyDetailsErrorObj);

            reqData.company = { ...companyDetailsObj };
        } else if (userDetailsObj.companyName) {
            reqData.company = { id: userDetailsObj.companyName };
            delete reqData.companyName;
        }

        if (!haveErrorInCompanyDetails && !haveErrorInUserDetails) {
            setUserErrMsg(userObj);
            setCompanyErrMsg(companyObj);

            const errors = await registerEmployer(reqData);
            if (errors.length > 0) {
                for (const err of errors) {
                    if (err.field.includes("company.")) {
                        setCompanyErrMsg({ ...companyErrMsg, ...{ [err.field.replace("company.", "")]: err.message } });
                    } else {
                        setUserErrMsg({ ...userErrorMsg, ...{ [err.field]: err.message } });
                    }
                }
            } else {
                setSignUpSuccess(true);
            }
            props.actions.loadingFinished();
        } else {
            props.actions.loadingFinished();
        }
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

    let history = useHistory();

    return (
        <div className={styles.signupCover}>
            <Container>
                <div
                    className={`${styles.signupWrapper} ${signUpSuccess ? styles.hiddenForm : ""} ${
                        addCompanyForm ? styles.addCompanyForm : ""
                    }`}
                >
                    <div
                        className={styles.signUpContainer}
                        style={
                            addCompanyForm
                                ? { justifyContent: "flex-start", flexDirection: "row" }
                                : { flexDirection: "column" }
                        }
                    >
                        <div
                            className={`${styles.userDetails} ${signUpSuccess ? styles.hiddenForm : ""} ${
                                addCompanyForm ? styles.addCompanyForm : ""
                            }`}
                        >
                            <div className={styles.formHeader}>Get started with your profile</div>
                            <div>
                                <FormLabel
                                    name="First Name"
                                    required
                                    styles={labelStyles}
                                    error={userDetailsErrors.firstName}
                                />
                                <Input
                                    size="large"
                                    style={userDetailsErrors.firstName ? errorInput : inputFullWidthStyle}
                                    value={userDetails.firstName}
                                    onChange={event => {
                                        setUserDetailsObject("firstName", event.target.value);
                                    }}
                                />
                                {/* <FormErrorMsg msg={userErrorMsg.firstName}></FormErrorMsg> */}
                            </div>
                            <div>
                                <FormLabel name="Last Name" styles={labelStyles} error={userDetailsErrors.lastName} />
                                <Input
                                    size="large"
                                    style={userDetailsErrors.lastName ? errorInput : inputFullWidthStyle}
                                    value={userDetails.lastName}
                                    onChange={event => {
                                        setUserDetailsObject("lastName", event.target.value);
                                    }}
                                />
                                {/* <FormErrorMsg msg={userErrorMsg.lastName}></FormErrorMsg> */}
                            </div>
                            <div>
                                <FormLabel
                                    name="Email Address"
                                    required
                                    styles={labelStyles}
                                    error={userDetailsErrors.email}
                                />
                                <Input
                                    size="large"
                                    style={userDetailsErrors.email ? errorInput : inputFullWidthStyle}
                                    value={userDetails.email}
                                    onChange={event => {
                                        const value = event.target.value;
                                        if (isValidEmail(value)) {
                                            setUserDetailsErrors({ ...userDetailsErrors, email: false });
                                        } else {
                                            setUserDetailsErrors({ ...userDetailsErrors, email: true });
                                        }

                                        setUserDetails({ ...userDetails, email: value });
                                    }}
                                />
                                {/* <FormErrorMsg msg={userErrorMsg.email}></FormErrorMsg> */}
                            </div>
                            <div>
                                <FormLabel
                                    name="Phone Number"
                                    required
                                    styles={labelStyles}
                                    error={userDetailsErrors.phonenumber}
                                />
                                <Input
                                    size="large"
                                    style={userDetailsErrors.phonenumber ? errorInput : inputFullWidthStyle}
                                    value={userDetails.phonenumber}
                                    onChange={event => {
                                        const value = event.target.value;
                                        if (isValidContactNumber(value)) {
                                            setUserDetailsErrors({ ...userDetailsErrors, phonenumber: false });
                                        } else {
                                            setUserDetailsErrors({ ...userDetailsErrors, phonenumber: true });
                                        }

                                        setUserDetails({ ...userDetails, phonenumber: value });
                                    }}
                                />
                                {/* <FormErrorMsg msg={userErrorMsg.phonenumber}></FormErrorMsg> */}
                            </div>
                            <div>
                                <FormLabel
                                    name="Password"
                                    required
                                    styles={labelStyles}
                                    error={userDetailsErrors.password}
                                >
                                    <Tooltip title="Password must contain atleast one captial letter, simple letter, number, symbol and minimum character length should be 6">
                                        <InfoCircleOutlined twoToneColor="#eb2f96" />
                                    </Tooltip>
                                </FormLabel>
                                <Input
                                    size="large"
                                    style={userDetailsErrors.password ? errorInput : inputFullWidthStyle}
                                    value={userDetails.password}
                                    type="password"
                                    onChange={event => {
                                        setUserDetailsObject("password", event.target.value);
                                    }}
                                    onBlur={() => {
                                        setPasswordValidationMessage(validatePassword(userDetails.password));
                                    }}
                                />
                                {/* {!passwordValidationMessages.length && (
                             <FormErrorMsg msg={userErrorMsg.password}></FormErrorMsg>
                        )}
                        {passwordValidationMessages.map((message, index) => {
                             return <FormErrorMsg msg={message} key={index}></FormErrorMsg>;
                        })} */}
                            </div>
                            <div>
                                <FormLabel
                                    name="Confirm Password"
                                    required
                                    styles={labelStyles}
                                    error={userDetailsErrors.confirmPassword}
                                />
                                <Input
                                    size="large"
                                    style={userDetailsErrors.confirmPassword ? errorInput : inputFullWidthStyle}
                                    value={userDetails.confirmPassword}
                                    type="password"
                                    onChange={event => {
                                        setUserDetailsObject("confirmPassword", event.target.value);
                                    }}
                                    onBlur={() => {
                                        if (userDetails.password !== userDetails.confirmPassword) {
                                            setUserDetailsErrors({ ...userDetailsErrors, confirmPassword: true });
                                        }
                                    }}
                                />
                                {/* <FormErrorMsg
                            msg={userDetailsErrors.confirmPassword ? "Password doesn't match" : ""}
                        ></FormErrorMsg> */}
                            </div>
                            <div>
                                <FormLabel
                                    name="Company Name"
                                    required
                                    styles={labelStyles}
                                    error={userDetailsErrors.companyName}
                                />
                                <span className={styles.addCompanyBtn}>
                                    <Button
                                        type="link"
                                        style={{ padding: 0 }}
                                        onClick={() => {
                                            addCompany();
                                        }}
                                    >
                                        + Add Company
                                    </Button>
                                </span>
                                <AutoComplete
                                    size="large"
                                    style={inputFullWidthStyle}
                                    value={userDetails.companyName}
                                    onSearch={value => {
                                        setUserDetailsObject("companyName", value);

                                        companyNamesAutoComplete(value).then(res => {
                                            setCompanyNames(res.data.payload);
                                        });
                                    }}
                                    onSelect={value => {
                                        setUserDetailsObject("companyName", value);
                                    }}
                                    defaultActiveFirstOption={false}
                                    dataSource={companyNames.map(e => {
                                        return (
                                            <AutoCompleteOption style={{ fontWeight: 600 }} value={e.id} key={e.id}>
                                                {/* <HighLightedText text={e.name} highlightText={tempData.category}></HighLightedText> */}
                                                {e.name}
                                            </AutoCompleteOption>
                                        );
                                    })}
                                    allowClear={true}
                                >
                                    <Input placeholder="--select here--" size="large" />
                                </AutoComplete>
                                {/* <FormErrorMsg msg={userErrorMsg.companyName}></FormErrorMsg> */}
                            </div>
                        </div>
                        <div
                            className={`${styles.companyDetails} ${
                                addCompanyForm ? styles.twinColumns : styles.singleColumn
                            } ${signUpSuccess ? styles.hiddenForm : ""} `}
                        >
                            <div
                                className={styles.addCompanyForm}
                                style={addCompanyForm ? { display: "block" } : { display: "none" }}
                            >
                                <div>
                                    <FormLabel
                                        name="Company Name"
                                        styles={labelStyles}
                                        error={companyDetailsErrors.name}
                                    />
                                    <Input
                                        size="large"
                                        style={companyDetailsErrors.name ? errorInput : inputFullWidthStyle}
                                        value={companyDetails.name}
                                        disabled={userDetails.companyName ? true : false}
                                        onChange={event => {
                                            setCompanyDetailsObject("name", event.target.value);
                                        }}
                                    />
                                    {/* <FormErrorMsg msg={companyErrMsg.name}></FormErrorMsg> */}
                                </div>
                                <div>
                                    <FormLabel
                                        name="Industry"
                                        styles={labelStyles}
                                        error={companyDetailsErrors.industry}
                                    />
                                    <Input
                                        size="large"
                                        style={companyDetailsErrors.name ? errorInput : inputFullWidthStyle}
                                        value={companyDetails.industry}
                                        disabled={userDetails.industry ? true : false}
                                        onChange={event => {
                                            setCompanyDetailsObject("industry", event.target.value);
                                        }}
                                    />
                                    {/* <FormErrorMsg msg={companyErrMsg.name}></FormErrorMsg> */}
                                </div>

                                <div className={styles.uploadBtn}>
                                    <FormLabel
                                        name="Company Logo"
                                        styles={labelStyles}
                                        error={companyDetailsErrors.logo}
                                    />
                                    <Upload {...props} style={{ width: "100%", display: "block" }}>
                                        <Button
                                            block
                                            disabled={userDetails.companyName ? true : false}
                                            size="large"
                                            style={{ marginTop: "5px" }}
                                        >
                                            <UploadOutlined /> Click to Upload
                                        </Button>
                                    </Upload>
                                    {/* <FormErrorMsg msg={companyErrMsg.logo}></FormErrorMsg> */}
                                </div>
                                <div>
                                    <FormLabel
                                        name="Company Email"
                                        required
                                        styles={labelStyles}
                                        error={companyDetailsErrors.email}
                                    />
                                    <Input
                                        size="large"
                                        style={companyDetailsErrors.email ? errorInput : inputFullWidthStyle}
                                        value={companyDetails.email}
                                        disabled={userDetails.companyName ? true : false}
                                        onChange={event => {
                                            const value = event.target.value;
                                            if (isValidEmail(value)) {
                                                setCompanyDetailsErrors({ ...companyDetailsErrors, email: false });
                                            } else {
                                                setCompanyDetailsErrors({ ...companyDetailsErrors, email: true });
                                            }

                                            setCompanyDetails({ ...companyDetails, email: value });
                                        }}
                                    />
                                    {/* <FormErrorMsg msg={companyErrMsg.email}></FormErrorMsg> */}
                                </div>
                                <div>
                                    <FormLabel
                                        name="Comapany Phone Number"
                                        required
                                        styles={labelStyles}
                                        error={companyDetailsErrors.phonenumber}
                                    />
                                    <Input
                                        size="large"
                                        style={companyDetailsErrors.phonenumber ? errorInput : inputFullWidthStyle}
                                        value={companyDetails.phonenumber}
                                        disabled={userDetails.companyName ? true : false}
                                        onChange={event => {
                                            const value = event.target.value;
                                            if (isValidContactNumber(value)) {
                                                setCompanyDetailsErrors({
                                                    ...companyDetailsErrors,
                                                    phonenumber: false
                                                });
                                            } else {
                                                setCompanyDetailsErrors({ ...companyDetailsErrors, phonenumber: true });
                                            }

                                            setCompanyDetails({ ...companyDetails, phonenumber: value });
                                        }}
                                    />
                                    {/* <FormErrorMsg msg={companyErrMsg.phonenumber}></FormErrorMsg> */}
                                </div>
                                <div>
                                    <FormLabel
                                        name="Description"
                                        required
                                        styles={labelStyles}
                                        error={companyDetailsErrors.description}
                                    />
                                    <Editor
                                        style={inputFullWidthStyle}
                                        placeholder="Company Description"
                                        value={companyDetails.description}
                                        disabled={userDetails.companyName ? true : false}
                                        onChange={html => {
                                            setCompanyDetailsObject("description", html);
                                        }}
                                    />
                                </div>
                            </div>
                            <div className={styles.agreement}>
                                By clicking Agree & Join, you agree to the Gorilla User Agreement, Privacy Policy, and
                                Cookie Policy.
                            </div>
                            <div className={styles.submitContainer}>
                                <Button type="primary" onClick={createEmployer}>
                                    Agree & Join
                                </Button>
                            </div>
                            <div className={styles.signin}>
                                Already on Gorilla ? <Link to="/signin">Sign in</Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`${signUpSuccess ? styles.showBanner : styles.hidden}`}>
                    <div className={styles.banner}>
                        <Banner
                            type="success"
                            header={EMPLOYER_SIGNUP_SUCCESS_HEADER}
                            msg={EMPLOYER_SIGNUP_SUCCESS_MSG}
                            btnText="OK"
                            btnAction={() => {
                                history.push("/");
                            }}
                        ></Banner>
                    </div>
                </div>
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

export default connect(undefined, mapDispatchToProps)(EmployerSignup);
