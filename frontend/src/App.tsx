import "./App.scss";

import { Route, Switch, useLocation } from "react-router-dom";

import About from "./components/About/About";
import Departments from "./components/Departments/Departments";
import Doctors from "./components/Doctors/Doctors";
import Footer from "./components/Footer/Footer";
import HealthFund from "./components/HealthFund/HealthFund";
import HomePage from "./components/HomePage/components/HomePage";
import Navigation from "./components/Navigation/Navigation";
import React, { useEffect } from "react";
import Patients from "./components/Patients/Patients";

const App = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [location.pathname]);

  return (
    <div className={location.pathname === "/healthfund" ? "body" : ""}>
      {location.pathname !== "/healthfund" && <Navigation />}
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route path='/about' component={About} />
        <Route path='/departments' component={Departments} />
        <Route path='/doctors' component={Doctors} />
        <Route path='/patients' component={Patients} />
        <Route path='/healthfund' component={HealthFund} />
      </Switch>
      {location.pathname !== "/healthfund" && <Footer />}
    </div>
  );
};

export default App;
