import "./App.scss";

import { Route, Switch } from "react-router-dom";

import About from "./components/About/About";
import Doctors from "./components/Doctors/Doctors";
import Footer from "./components/Footer/Footer";
import HomePage from "./components/HomePage/components/HomePage";
import Navigation from "./components/Navigation/Navigation";
import React from "react";

const App = () => (
  <div>
    <Navigation />
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/about" component={About} />
      <Route path="/doctors" component={Doctors} />
    </Switch>
    <Footer />
  </div>
);

export default App;
