import "./App.scss";

import { Route, Switch, useLocation } from "react-router-dom";

import About from "./components/About/About";
import Departments from "./components/Departments/Departments";
import Doctors from "./components/Doctors/Doctors";
import Footer from "./components/Footer/Footer";
import HealthFund from "./components/HealthFund/HealthFund";
import HomePage from "./components/HomePage/components/HomePage";
import Navigation from "./components/Navigation/Navigation";
import React from "react";

const App = () => {
  const location = useLocation();
  return (
    <div className={location.pathname === "/healthFund" ? "body" : ""}>
      {location.pathname !== "/healthFund" && <Navigation />}
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/about" component={About} />
        <Route path="/departments" component={Departments} />
        <Route path="/doctors" component={Doctors} />
        <Route path="/healthFund" component={HealthFund} />
      </Switch>
      {location.pathname !== "/healthFund" && <Footer />}
    </div>
  );
};

export default App;
