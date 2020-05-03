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
import { signIn } from "../../../api/UserApi";
import { setLocalStorage, getLocalStorage } from "../../../api/LocalStorage";
import { setSessionStorage, getSessionStorage } from "../../../api/SessionStorage";
import { useEffect } from "react";
import RedirectTo from "../../common/redirect-to/RedirectTo";

const labelStyles = { margin: "5px", display: "inline-block", fontSize: "16px", color: "#999999" };
const inputStyle = { margin: "15px", width: "90%" };
const inputFullWidthStyle = { ...inputStyle, width: "100%", margin: "5px", display: "inline-block" };
const errorInput = { ...inputFullWidthStyle, border: "1px solid red" };

const domain = "employer";

const SignIn = props => {
    const [email, setEmail] = useState({
        value: "",
        error: ""
    });

    const [password, setPassword] = useState({
        value: "",
        error: ""
    });

    const [token, setToken] = useState("");

    useEffect(() => {
        let token = getSessionStorage("token");

        if (!token) {
            token = getLocalStorage("token");
        }

        if (token) {
            setToken(token);
        }
    }, []);

    const [rememberMe, setRememberMe] = useState(false);

    const signInUser = async () => {
        if (!email.value) {
            setEmail({ ...email, ...{ error: "Insert Email" } });
        } else {
            setEmail({ ...email, ...{ error: "" } });
        }

        if (!password.value) {
            setPassword({ ...password, ...{ error: "Insert Password" } });
        } else {
            setPassword({ ...password, ...{ error: "" } });
        }

        if (email.value && password.value) {
            const response = await signIn({
                email: email.value,
                password: password.value,
                domain: domain
            });

            const { data } = response;
            if (data.status === 200) {
                const innerData = data.data;

                if (rememberMe) {
                    setLocalStorage("token", innerData.token);
                    setLocalStorage("userprofile", innerData.user);
                } else {
                    setSessionStorage("token", innerData.token);
                    setSessionStorage("userprofile", innerData.user);
                }
            }
        }
    };

    return (
        <div className={styles.signInContainer}>
            {token && <RedirectTo />}
            {!props.initialSignIn && (
                <Banner
                    type="success"
                    header="Your account is active now !"
                    msg="Please sign in to find the best employees for Dialog Axiata PLC"
                ></Banner>
            )}

            <div className={styles.signInDetails}>
                {props.premiumSignin && <h3 className={styles.header}>{SIGN_IN_PREMIUM}</h3>}
                {!props.premiumSignin && (
                    <h3 className={styles.header}>{props.initialSignIn ? INITIAL_SIGN_IN_HEADER : SIGN_IN_HEADER}</h3>
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
                        <FormLabel name="Password" styles={labelStyles} error={password.error} />
                        <Input
                            size="large"
                            style={password.error ? errorInput : inputFullWidthStyle}
                            value={password.value}
                            type="password"
                            onChange={event => {
                                const value = event.target.value;
                                setPassword({ ...password, ...{ value: value } });
                            }}
                        />
                        <FormErrorMsg msg={password.error}></FormErrorMsg>
                    </div>
                    <div className={styles.rememberMeSection}>
                        <Checkbox checked={rememberMe} onChange={e => setRememberMe(e.target.checked)}>
                            Remember me
                        </Checkbox>
                        <Link to="/forgot-password">Forgot Password ?</Link>
                    </div>
                    <div className={styles.loginBtn}>
                        <Button
                            type="primary"
                            block
                            onClick={() => {
                                signInUser();
                            }}
                            size="large"
                        >
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
