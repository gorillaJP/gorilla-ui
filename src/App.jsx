import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import styles from "./App.module.css";
import Header from "./components/common/header/Header";
import LandingPage from "./components/pages/landing-page/LandingPage";
import JobDetails from "./components/pages/job-details-page/JobDetails";
import JobPost from "./components/pages/job-post-page/JobPost";
import Footer from "./components/common/footer/Footer";
import Loader from "./components/common/overlays/Loader";
import SignIn from "./components/pages/signin/SignIn";
import { Layout } from "antd";
import { getSessionStorage } from "./api/SessionStorage";
import { getLocalStorage } from "./api/LocalStorage";
import Overlay from "./components/common/overlays/Overlay";
import Signup from "./components/pages/signup/Signup";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setAccessToken, setUserProfile } from "./actions/UserAction";
import SuccessLogin from "./components/pages/signin/SuccessLogin";
import ProfilePage from "./components/pages/profile-page/ProfilePage";
import JobsByIndustry from "./components/pages/jobs-by-industry/JobsByIndustry";
import JobsByLocation from "./components/pages/jobs-by-location/JobsByLocation";
import CandidateApply from "./components/pages/candidate-apply/CandidateApply";
import Category from "./components/pages/category/Category";
import ContactedYou from "./components/pages/candidate-apply/contacted-you/ContactedYou";
import EmployerLandingPage from "./components/pages/landing-page/EmployerLandingPage";
import { EMPLOYEE } from "./constants/AppConstants";
import EmployerDashboard from "./components/pages/dashboard/EmployerDashboard";
import { EMPLOYER_HOME_ROUTE } from "./constants/RouteConstant";
import { getJobMatrix } from "./actions/MatrixActions";
import Companies from "./components/pages/companies/Companies";
import { setUserDomain } from "./actions/MetaActions";

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
            const profile = JSON.parse(userProfile);
            props.actions.setUserProfile(profile);
            props.actions.setUserDomain(profile.domain);
            props.actions.setAccessToken(token);
            setUserLoggedIn(true);
        }
    }, []);

    useEffect(() => {
        if (!props.token) {
            setUserLoggedIn(false);
        } else if (props.token && Object.keys(props.userProfile).length) {
            setUserLoggedIn(true);
            // Get job Matrix data
            props.actions.getJobMatrix(props.domain, props.token);
        }
    }, [props.token, props.userProfile]);

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
                        <Route path="/job-details/search" render={() => <JobDetails />} />

                        <Route exact path="/job-post" render={() => <JobPost />} />

                        <Route exact path="/job-post/preview" render={() => <JobPost />} />

                        <Route exact path="/jobs-by-industry" render={() => <JobsByIndustry />} />

                        <Route exact path="/jobs-by-location" render={() => <JobsByLocation />} />

                        <Route path="/candidate/apply/:jobId" render={() => <CandidateApply />} />

                        <Route path="/jobs/contacted-you/:jobId" render={() => <ContactedYou />} />

                        <Route path="/jobs/:jobCategory" render={() => <Category />} />

                        <Route path="/signin" render={() => <SignIn />} />

                        <Route exact path="/signup" render={() => <Signup />} />

                        <Route exact path="/signinoauth2" render={() => <SuccessLogin />} />

                        <Route exact path="/profile" render={() => <ProfilePage />} />

                        <Route exact path={EMPLOYER_HOME_ROUTE} render={() => <EmployerLandingPage />} />

                        <Route exact path="/employer/dashboard/:jobCategory" render={() => <EmployerDashboard />} />

                        <Route exact path="/companies" render={() => <Companies />} />

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
        token: state.authData.token,
        domain: state.metaData.domain
    };
};

const mapDispatchToProps = dispatch => {
    return {
        actions: {
            setUserProfile: bindActionCreators(setUserProfile, dispatch),
            setAccessToken: bindActionCreators(setAccessToken, dispatch),
            getJobMatrix: bindActionCreators(getJobMatrix, dispatch),
            setUserDomain: bindActionCreators(setUserDomain, dispatch)
        }
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
