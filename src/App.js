import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"

// pages
import LandingPage from "./pages/landing/landing";
import PageNotFound from "./pages/page-not-found/page-not-found";

function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={LandingPage} />
                <PageNotFound />
            </Switch>
        </Router>
    );
}

export default App;
