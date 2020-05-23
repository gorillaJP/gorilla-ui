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
function App() {
    const [mobileMenuOpen, toggleMobileMenu] = useState(false);
    const [userLoggeIn, setUserLoggedIn] = useState(false);
    const [userProfile, setUserProfile] = useState({});

    useEffect(() => {
        let userProfile = getSessionStorage("userprofile");

        if (!userProfile) {
            userProfile = getLocalStorage("userprofile");
        }

        if (userProfile) {
            setUserProfile(JSON.parse(userProfile));
            setUserLoggedIn(true);
        }
    }, []);

    return (
        <Layout className={styles.app}>
            <Router>
                <div>
                    <Header
                        mobileMenuOpen={mobileMenuOpen}
                        toggleMenu={value => {
                            toggleMobileMenu(value);
                        }}
                        userLoggeIn={userLoggeIn}
                        setUserLoggedIn={setUserLoggedIn}
                        userProfile={userProfile}
                    />
                </div>

                <div className={`${styles.contentWrapper}`}>
                    <Switch>
                        <Route exact path="/" render={() => <LandingPage />} />
                    </Switch>
                    <Switch>
                        <Route exact path="/job-details" render={() => <JobDetails />} />
                    </Switch>
                    <Switch>
                        <Route exact path="/job-post" render={() => <JobPost />} />
                    </Switch>
                    <Switch>
                        <Route exact path="/job-post/preview" render={() => <JobPost />} />
                    </Switch>
                    <Switch>
                        <div className={styles.content}>
                            <Route exact path="/signup" render={() => <EmployerSignup />} />
                        </div>
                    </Switch>
                    <Switch>
                        <div className={styles.content}>
                            <Route exact path="/signin" render={() => <SignIn />} />
                        </div>
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
}

export default App;
