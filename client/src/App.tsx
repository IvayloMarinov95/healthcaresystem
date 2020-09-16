import "./App.scss";

import { Route, Switch } from "react-router-dom";

import Footer from "./components/Footer/Footer";
import HomePage from "./components/HomePage/components/HomePage";
import Navigation from "./components/Navigation/Navigation";
import React from "react";

const App = () => (
  <div>
    <Navigation />
    <Switch>
      <Route exact path="/" component={HomePage} />
    </Switch>
    <Footer />
  </div>
);

export default App;
