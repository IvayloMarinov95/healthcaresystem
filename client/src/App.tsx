import "./App.scss";

import { Route, Switch } from "react-router-dom";

import HomePage from "./components/HomePage/components/HomePage";
import Navigation from "./components/Navigation/Navigation";
import React from "react";

const App = () => (
  <div>
    <Navigation />
    <Switch>
      <Route exact path="/" component={HomePage} />
    </Switch>
  </div>
);

export default App;
