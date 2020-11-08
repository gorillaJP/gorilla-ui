import React, { useState } from "react";
import styles from "./SignIn.module.css";
import {
    INITIAL_SIGN_IN_HEADER,
    SIGN_IN_HEADER,
    INITIAL_SIGN_IN_MSG,
    SIGN_IN_PREMIUM,
    INITIAL_SIGN_IN_MSG_EMPLOYEE,
    INITIAL_SIGN_IN_MSG_EMPLOYER
} from "../../../constants/MessageConstants";
import FormLabel from "../../common/form-label/FormLabel";
import { Input, Checkbox, Button, Divider } from "antd";
import { isValidEmail } from "../../../util/Util";
import { Link, useHistory } from "react-router-dom";
import Banner from "../../common/banners/Banner";
import { signIn } from "../../../api/UserApi";
import { setLocalStorage, getLocalStorage } from "../../../api/LocalStorage";
import { setSessionStorage, getSessionStorage } from "../../../api/SessionStorage";
import { useEffect } from "react";
import RedirectTo from "../../common/redirect-to/RedirectTo";
import { Container } from "../../common/container/Container";
import { EMPLOYER, EMPLOYEE, TOKEN, USERPROFILE, GOOGLE_AUTH_CANDIDATE } from "../../../constants/AppConstants";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setAccessToken, setUserProfile } from "../../../actions/UserAction";
import config from "../../../util/config";
import { useQuery } from "../../../custom-hooks/UseQuery";
import { setUserDomain } from "../../../actions/MetaActions";

const labelStyles = { marginTop: "5px", display: "inline-block", fontSize: "16px", color: "#999999" };
const inputStyle = { width: "90%" };
const inputFullWidthStyle = {
    ...inputStyle,
    width: "100%",
    display: "inline-block",
    marginBottom: "10px",
    marginTop: "3px"
};
const errorInput = { ...inputFullWidthStyle, border: "1px solid red" };

const SignIn = props => {
    const { domain } = props;
    const queryString = useQuery();

    const history = useHistory();
    const [email, setEmail] = useState({
        value: "",
        error: ""
    });

    const [password, setPassword] = useState({
        value: "",
        error: ""
    });

    const [initialSignIn, setInitialSignIn] = useState(false);

    const [token, setToken] = useState("");

    useEffect(() => {
        let token = getSessionStorage("token");

        if (!token) {
            token = getLocalStorage("token");
        }

        if (token) {
            setToken(token);
        }

        if (queryString.get("login") === "initial") {
            setInitialSignIn(true);
        }

        let domain = queryString.get("domain");
        if (domain) {
            domain = domain === "employer" ? EMPLOYER : EMPLOYEE;
            if (domain) {
                props.actions.setUserDomain(domain);
            }
        }
    }, [props.actions, queryString]);

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
                    setLocalStorage(TOKEN, innerData.token);
                    setLocalStorage(USERPROFILE, innerData.user);
                } else {
                    setSessionStorage(TOKEN, innerData.token);
                    setSessionStorage(USERPROFILE, innerData.user);
                }

                props.actions.setAccessToken(innerData.token);
                props.actions.setUserProfile(innerData.user);
                history.push("/");
            }
        }
    };

    return (
        <div className={styles.signInContainer}>
            {token && <RedirectTo />}

            <div className={`${domain === EMPLOYER ? styles.employer : styles.employee} ${styles.signInCover}`}>
                {initialSignIn && (
                    <Banner
                        type="success"
                        header="Your account is active now !"
                        msg={domain === EMPLOYEE ? INITIAL_SIGN_IN_MSG_EMPLOYEE : INITIAL_SIGN_IN_MSG_EMPLOYER}
                    ></Banner>
                )}
                <Container>
                    <div className={styles.signInDetails}>
                        {props.premiumSignin && <h3 className={styles.header}>{SIGN_IN_PREMIUM}</h3>}
                        {!props.premiumSignin && (
                            <h3 className={styles.header}>{initialSignIn ? INITIAL_SIGN_IN_HEADER : SIGN_IN_HEADER}</h3>
                        )}

                        <p className={styles.message}>
                            {domain === EMPLOYEE ? INITIAL_SIGN_IN_MSG_EMPLOYEE : INITIAL_SIGN_IN_MSG}
                        </p>
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
                            {domain === EMPLOYEE && (
                                <>
                                    <Divider>
                                        <span className={styles.divider}>Or</span>
                                    </Divider>
                                    <div className={styles.faceBookBtn}>
                                        <Button type="primary" block size="large">
                                            Continue With Facebook
                                        </Button>
                                    </div>
                                    <div className={styles.googleBtn}>
                                        <a href={`${config.remote}${GOOGLE_AUTH_CANDIDATE}`}>
                                            <Button type="primary" block size="large">
                                                Continue With Google
                                            </Button>
                                        </a>
                                    </div>
                                    <p className={styles.footerMessage}>
                                        New to Gorilla? <Link to="/signup">Join now!</Link>
                                    </p>
                                    <p className={styles.footerMessage}>
                                        Are you looking for jobs ?
                                        <Link to="/job-details/search">Start finding now!</Link>
                                    </p>
                                </>
                            )}
                            {domain === EMPLOYER && (
                                <>
                                    <p className={styles.footerMessage}>
                                        New to Gorilla? <Link to="/signup">Join now!</Link>
                                    </p>
                                </>
                            )}
                        </div>
                    </div>
                </Container>
            </div>
        </div>
    );
};
const mapStateToProps = state => {
    return {
        domain: state.metaData.domain
    };
};

const mapDispatchToProps = dispatch => {
    return {
        actions: {
            setAccessToken: bindActionCreators(setAccessToken, dispatch),
            setUserProfile: bindActionCreators(setUserProfile, dispatch),
            setUserDomain: bindActionCreators(setUserDomain, dispatch)
        }
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
