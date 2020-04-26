import React, { useState } from "react";
import styles from "./SignIn.module.css";
import {
    INITIAL_SIGN_IN_HEADER,
    SIGN_IN_HEADER,
    INITIAL_SIGN_IN_MSG,
    SIGN_IN_PREMIUM
} from "../../../constants/MessageConstants";
import FormLabel from "../../common/form-label/FormLabel";
import { Input, Checkbox, Button } from "antd";
import FormErrorMsg from "../../common/form-error-msg/FormErrorMsg";
import { isValidEmail } from "../../../util/Util";
import { Link } from "react-router-dom";
import Banner from "../../common/banners/Banner";

const labelStyles = { margin: "5px", display: "inline-block", fontSize: "16px", color: "#999999" };
const inputStyle = { margin: "15px", width: "90%" };
const inputFullWidthStyle = { ...inputStyle, width: "100%", margin: "5px", display: "inline-block" };
const errorInput = { ...inputFullWidthStyle, border: "1px solid red" };

const SignIn = props => {
    const [email, setEmail] = useState({
        value: "",
        error: ""
    });

    const [password, setPassword] = useState("");

    const [rememberMe, setRememberMe] = useState(false);

    return (
        <div className={styles.signInContainer}>
            {!props.initialSignIn && (
                <Banner
                    type="success"
                    header="Your account is active now !"
                    msg="Please sign in to find the best employees for Dialog Axiata PLC"
                ></Banner>
            )}

            <div className={styles.signInDetails}>
                {!props.premiumSignin && <h3 className={styles.header}>{SIGN_IN_PREMIUM}</h3>}
                {!!props.premiumSignin && (
                    <h3 className={styles.header}>{!props.initialSignIn ? INITIAL_SIGN_IN_HEADER : SIGN_IN_HEADER}</h3>
                )}

                <p className={styles.message}>{INITIAL_SIGN_IN_MSG}</p>
                <div>
                    <div>
                        <FormLabel name="Email Address" styles={labelStyles} error={email.error} />
                        <Input
                            size="large"
                            style={email.error ? errorInput : inputFullWidthStyle}
                            value={email.value}
                            onChange={event => {
                                const value = event.target.value;
                                if (isValidEmail(value)) {
                                    setEmail({ error: "", value: value });
                                } else {
                                    setEmail({ error: "Invalid Email", value: value });
                                }
                            }}
                        />
                        <FormErrorMsg msg={email.error}></FormErrorMsg>
                    </div>
                    <div>
                        <FormLabel name="Password" styles={labelStyles} />
                        <Input
                            size="large"
                            style={inputFullWidthStyle}
                            value={password}
                            type="password"
                            onChange={event => {
                                setPassword(event.target.value);
                            }}
                        />
                    </div>
                    <div className={styles.rememberMeSection}>
                        <Checkbox value={rememberMe} onChange={e => setRememberMe(e.target.checked)}>
                            Remember me
                        </Checkbox>
                        <Link to="/forgot-password">Forgot Password ?</Link>
                    </div>
                    <div className={styles.loginBtn}>
                        <Button type="primary" block>
                            Sign In
                        </Button>
                    </div>
                    <p className={styles.footerMessage}>
                        New to Gorilla? <Link to="/signup">Join now!</Link>
                    </p>
                    <p className={styles.footerMessage}>
                        Are you looking for jobs? <Link to="/job-details">Start finding now!</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
