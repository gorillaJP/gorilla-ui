import React from "react";

import styles from "./EmployeeSignup.module.css";
import { Container } from "../../../common/container/Container";
import FormLabel from "../../../common/form-label/FormLabel";
import { Input, Button, Divider } from "antd";
import { Link } from "react-router-dom";

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
    return (
        <div className={styles.employeeSignupContainer}>
            <Container>
                <div className={styles.signUpDetails}>
                    <h2 className={styles.title}>Get started with your profile</h2>

                    <div className={styles.signUpForm}>
                        <div className={styles.btnContainer}>
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
                                <FormLabel name="First Name" required />
                                <Input size="large" style={inputFullWidthStyle} />
                            </div>
                            <div>
                                <FormLabel name="Last Name" required />
                                <Input size="large" style={inputFullWidthStyle} />
                            </div>
                            <div>
                                <FormLabel name="Email Address" required />
                                <Input size="large" style={inputFullWidthStyle} />
                            </div>
                            <div>
                                <FormLabel name="Password" required />
                                <Input size="large" style={inputFullWidthStyle} />
                            </div>
                            <div>
                                <FormLabel name="Confirm Password" required />
                                <Input size="large" style={inputFullWidthStyle} />
                            </div>
                        </div>
                    </div>
                    <div className={styles.agreementContainer}>
                        <div className={styles.agreement}>
                            By clicking Agree & Join, you agree to the Gorilla User Agreement, Privacy Policy, and
                            Cookie Policy.
                        </div>
                        <div className={styles.submitContainer}>
                            <Button type="primary">Agree & Join</Button>
                        </div>
                        <div className={styles.signin}>
                            Already on Gorilla ? <Link to="/signin">Sign in</Link>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default EmployeeSignup;
