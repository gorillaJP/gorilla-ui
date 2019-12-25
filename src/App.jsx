import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";
import Header from "./components/common/header/Header";
import LandingPage from "./components/pages/landing-page/LandingPage";
import Footer from "./components/common/footer/Footer";

function App() {
    const [mobileMenuOpen, toggleMobileMenu] = useState(false);
    const [userLoggeIn, setUserLoggedIn] = useState(false);

    return (
        <div className="App">
            <Router>
                <Header
                    mobileMenuOpen={mobileMenuOpen}
                    toggleMenu={val => {
                        toggleMobileMenu(val);
                    }}
                    userLoggeIn={userLoggeIn}
                    setUserLoggedIn={setUserLoggedIn}
                />
                {!mobileMenuOpen && (
                    <>
                        <div className="content-wrapper">
                            <Switch>
                                <Route exact path="/" render={() => <LandingPage />} />
                            </Switch>
                        </div>

                        <Footer />
                    </>
                )}
            </Router>
        </div>
    );
}

export default App;
