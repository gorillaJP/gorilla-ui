import React, { useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import Styles from "./EmployerSignup.module.css";
import FormLabel from "../../../common/form-label/FormLabel";
import { Input, Button, Upload, AutoComplete, Tooltip } from "antd";
import { UploadOutlined, InfoCircleOutlined } from "@ant-design/icons";
import Editor from "../../../common/editor/Editor";
import { Link } from "react-router-dom";

import { companyNamesAutoComplete } from "../../../../api/AutoCompleteApi";
import { isValidEmail, isValidContactNumber, validatePassword } from "../../../../util/Util";
import { loadingStarted, loadingFinished } from "../../../../actions/CommonActions";
import { registerEmployer } from "../../../../api/UserApi";

const inputStyle = { margin: "15px", width: "90%" };
const inputFullWidthStyle = { ...inputStyle, width: "100%", margin: "5px", display: "inline-block" };
const errorInput = { ...inputFullWidthStyle, border: "1px solid red" };
const labelStyles = { margin: "5px", display: "inline-block", fontSize: "16px" };
const AutoCompleteOption = AutoComplete.Option;

const EmployerSignup = props => {
    const [userDetails, setUserDetails] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phonenumber: "",
        password: "",
        confirmPassword: "",
        companyName: undefined
    });

    const [userDetailsErrors, setUserDetailsErrors] = useState({
        firstName: false,
        lastName: false,
        email: false,
        phonenumber: false,
        password: false,
        confirmPassword: false,
        companyName: false
    });

    const [companyDetails, setCompanyDetails] = useState({
        name: undefined,
        logo: "",
        email: "",
        phonenumber: "",
        description: ""
    });

    const [passwordValidationMessages, setPasswordValidationMessage] = useState([]);

    const [companyDetailsErrors, setCompanyDetailsErrors] = useState({
        name: false,
        logo: false,
        email: false,
        phonenumber: false,
        description: false
    });

    const [addCompanyForm, toggleAddCompany] = useState(false);
    const [companyNames, setCompanyNames] = useState([]);

    const setUserDetailsObject = (field, value) => {
        if (value) {
            setUserDetailsErrors({ ...userDetailsErrors, [field]: false });
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

    const createEmployer = () => {
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
            registerEmployer(reqData)
                .then(data => {
                    props.actions.loadingFinished();
                })
                .catch(err => {
                    props.actions.loadingFinished();
                });
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

    return (
        <div
            className={Styles.signUpContainer}
            style={addCompanyForm ? { flexDirection: "row", justifyContent: "space-around" } : {}}
        >
            <div className={Styles.userDetails} style={addCompanyForm ? { alignSelf: "flex-start" } : {}}>
                <div className={Styles.formHeader}>Get started with your profile</div>
                <div>
                    <FormLabel name="First Name" required styles={labelStyles} error={userDetailsErrors.firstName} />
                    <Input
                        size="large"
                        style={userDetailsErrors.firstName ? errorInput : inputFullWidthStyle}
                        value={userDetails.firstName}
                        onChange={event => {
                            setUserDetailsObject("firstName", event.target.value);
                        }}
                    />
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
                </div>
                <div>
                    <FormLabel name="Email Address" required styles={labelStyles} error={userDetailsErrors.email} />
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
                </div>
                <div>
                    <FormLabel name="Password" required styles={labelStyles} error={userDetailsErrors.password}>
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
                    {passwordValidationMessages.map((message, index) => {
                        return (
                            <span key={index} className={Styles.validationErrors}>
                                {message}
                            </span>
                        );
                    })}
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
                    {userDetailsErrors.confirmPassword && (
                        <span className={Styles.validationErrors}>Password doesn't match</span>
                    )}
                </div>
                <div>
                    <FormLabel
                        name="Company Name"
                        required
                        styles={labelStyles}
                        error={userDetailsErrors.companyName}
                    />
                    <span className={Styles.addCompanyBtn}>
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
                </div>
            </div>
            <div className={Styles.companyDetails} style={addCompanyForm ? { alignSelf: "flex-end" } : {}}>
                <div
                    className={Styles.addCompanyForm}
                    style={addCompanyForm ? { display: "block" } : { display: "none" }}
                >
                    <div>
                        <FormLabel name="Company Name" styles={labelStyles} error={companyDetailsErrors.name} />
                        <Input
                            size="large"
                            style={companyDetailsErrors.name ? errorInput : inputFullWidthStyle}
                            value={companyDetails.name}
                            disabled={userDetails.companyName ? true : false}
                            onChange={event => {
                                setCompanyDetailsObject("name", event.target.value);
                            }}
                        />
                    </div>
                    <div className={Styles.uploadBtn}>
                        <FormLabel name="Company Logo" styles={labelStyles} error={companyDetailsErrors.logo} />
                        <Upload {...props} style={{ width: "100%", display: "block" }}>
                            <Button
                                block
                                disabled={userDetails.companyName ? true : false}
                                size="large"
                                style={{ margin: "5px" }}
                            >
                                <UploadOutlined /> Click to Upload
                            </Button>
                        </Upload>
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
                                    setCompanyDetailsErrors({ ...companyDetailsErrors, phonenumber: false });
                                } else {
                                    setCompanyDetailsErrors({ ...companyDetailsErrors, phonenumber: true });
                                }

                                setCompanyDetails({ ...companyDetails, phonenumber: value });
                            }}
                        />
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
                <div className={Styles.agreement}>
                    By clicking Agree & Join, you agree to the Gorilla User Agreement, Privacy Policy, and Cookie
                    Policy.
                </div>
                <div className={Styles.submitContainer}>
                    <Button type="primary" onClick={createEmployer}>
                        Agree & Join
                    </Button>
                </div>
                <div className={Styles.signin}>
                    Already on Gorilla ? <Link to="/signin">Sign in</Link>
                </div>
            </div>
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
