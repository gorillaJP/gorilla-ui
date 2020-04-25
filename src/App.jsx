import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import styles from "./App.module.css";
import Header from "./components/common/header/Header";
import LandingPage from "./components/pages/landing-page/LandingPage";
import JobDetails from "./components/pages/job-details-page/JobDetails";
import JobPost from "./components/pages/job-post-page/JobPost";
import Footer from "./components/common/footer/Footer";
import Loader from "./components/pages/loader/Loader";
import EmployerSignup from "./components/pages/signup/employer/EmployerSignup";

function App() {
    const [mobileMenuOpen, toggleMobileMenu] = useState(false);
    const [userLoggeIn, setUserLoggedIn] = useState(false);

    return (
        <div className={styles.app}>
            <Router>
                <div>
                    <Header
                        mobileMenuOpen={mobileMenuOpen}
                        toggleMenu={value => {
                            toggleMobileMenu(value);
                        }}
                        userLoggeIn={userLoggeIn}
                        setUserLoggedIn={setUserLoggedIn}
                    />
                </div>

                <div className={`${styles.contentWrapper} ${mobileMenuOpen ? styles.hidden : ""}`}>
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
                </div>
                <div className={`${mobileMenuOpen ? styles.hidden : ""}`}>
                    <Footer />
                </div>
            </Router>
            <Loader />
        </div>
    );
}

export default App;
