import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import styles from "./App.module.css";
import Header from "./components/common/header/Header";
import LandingPage from "./components/pages/landing-page/LandingPage";
import JobDetails from "./components/pages/job-details-page/JobDetails";
import JobPost from "./components/pages/job-post-page/JobPost";
import Footer from "./components/common/footer/Footer";
import Loader from "./components/common/overlays/Loader";
import EmployerSignup from "./components/pages/signup/employer/EmployerSignup";
import SignIn from "./components/pages/signin/SignIn";
import { Layout } from "antd";
import { getSessionStorage } from "./api/SessionStorage";
import { getLocalStorage } from "./api/LocalStorage";
import Overlay from "./components/common/overlays/Overlay";
import EmployeeSignup from "./components/pages/signup/employee/EmployeeSignup";
import Signup from "./components/pages/signup/Signup";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setAccessToken, setUserProfile } from "./actions/UserAction";
import SuccessLogin from "./components/pages/signin/SuccessLogin";
import ProfilePage from "./components/pages/profile-page/ProfilePage";

const overlayStyles = {
    minHeight: "calc(100vh - 260px) !important;",
    position: "fixed",
    minWidth: "100%",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    marginTop: "40px"
};
const App = props => {
    const { userProfile } = props;
    const [mobileMenuOpen, toggleMobileMenu] = useState(false);
    const [userLoggeIn, setUserLoggedIn] = useState(false);

    useEffect(() => {
        let userProfile = getSessionStorage("userprofile");
        let token = getSessionStorage("token");

        if (!userProfile) {
            userProfile = getLocalStorage("userprofile");
            token = getLocalStorage("token");
        }

        if (userProfile && token) {
            props.actions.setUserProfile(JSON.parse(userProfile));
            props.actions.setAccessToken(token);
            setUserLoggedIn(true);
        }
    }, [props.actions]);

    useEffect(() => {
        if (!props.token) {
            setUserLoggedIn(false);
        }
    }, [props.token]);

    return (
        <Layout className={styles.app}>
            <Router>
                <div>
                    <Header
                        mobileMenuOpen={mobileMenuOpen}
                        toggleMenu={value => {
                            toggleMobileMenu(value);
                        }}
                        userLoggeIn={userProfile.id || userLoggeIn}
                        setUserLoggedIn={setUserLoggedIn}
                        userProfile={userProfile}
                    />
                </div>

                <div className={`${styles.contentWrapper}`}>
                    <Switch>
                        <Route exact path="/job-details" render={() => <JobDetails />} />

                        <Route exact path="/job-post" render={() => <JobPost />} />

                        <Route exact path="/job-post/preview" render={() => <JobPost />} />

                        <Route path="/signin" render={() => <SignIn />} />

                        <Route exact path="/signup" render={() => <Signup />} />

                        <Route exact path="/signinoauth2" render={() => <SuccessLogin />} />

                        <Route exact path="/profile" render={() => <ProfilePage />} />

                        <Route path="/" render={() => <LandingPage />} />
                    </Switch>
                    <div className={styles.overlayContainer}>
                        <Overlay show={mobileMenuOpen} styles={overlayStyles} />
                    </div>
                </div>

                <div>
                    <Footer />
                </div>
            </Router>
            <Loader />
        </Layout>
    );
};

const mapStateToProps = state => {
    return {
        userProfile: state.authData.profile,
        token: state.authData.token
    };
};

const mapDispatchToProps = dispatch => {
    return {
        actions: {
            setUserProfile: bindActionCreators(setUserProfile, dispatch),
            setAccessToken: bindActionCreators(setAccessToken, dispatch)
        }
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
