import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";
import Header from "./components/common/header/Header";
import LandingPage from "./components/pages/landing-page/LandingPage";
import JobDetails from "./components/pages/job-details-page/JobDetails";
import JobPost from "./components/pages/job-post-page/JobPost";
import Footer from "./components/common/footer/Footer";

function App() {
    const [mobileMenuOpen, toggleMobileMenu] = useState(false);
    const [userLoggeIn, setUserLoggedIn] = useState(false);

    return (
        <div className="App">
            <Router>
                <div>
                    <Header
                        mobileMenuOpen={mobileMenuOpen}
                        toggleMenu={val => {
                            toggleMobileMenu(val);
                        }}
                        userLoggeIn={userLoggeIn}
                        setUserLoggedIn={setUserLoggedIn}
                    />
                </div>
                {!mobileMenuOpen && (
                    <>
                        <div className="content-wrapper">
                            <Switch>
                                <Route exact path="/" render={() => <LandingPage />} />
                            </Switch>
                            <Switch>
                                <Route exact path="/job-details" render={() => <JobDetails />} />
                            </Switch>
                            <Switch>
                                <Route exact path="/job-post" render={() => <JobPost />} />
                            </Switch>
                        </div>
                    </>
                )}
                <div>
                    <Footer />
                </div>
            </Router>
        </div>
    );
}

export default App;
