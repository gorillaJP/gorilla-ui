import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";
import Header from "./components/common/header/Header";
import LandingPage from "./components/pages/landing-page/LandingPage";

function App() {
    return (
        <div className="App">
            <Router>
                <Header />
                <Switch>
                    <Route exact path="/" render={() => <LandingPage />} />
                </Switch>
            </Router>
        </div>
    );
}

export default App;
