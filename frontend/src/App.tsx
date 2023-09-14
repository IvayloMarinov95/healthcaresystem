import './App.scss';
import { Route, Switch, useLocation } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';

import { useAppDispatch, useAppSelector } from './app/hooks';
import About from './components/About/About';
import Departments from './components/Departments/Departments';
import Doctors from './components/Doctors/Doctors';
import Footer from './components/Footer/Footer';
import HealthFund from './components/HealthFund/HealthFund';
import HomePage from './components/HomePage/components/HomePage';
import Navigation from './components/Navigation/Navigation';
import React, { useEffect } from 'react';
import Patients from './components/Patients/Patients';
import axios from 'axios';
import { setRoles } from './features/roles/roles-slice';
import { setUser } from './features/user/user-slice';
import { RootState } from './app/store';

const App = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((state: RootState) => state.isLoading.value);
  const user = useAppSelector((state: RootState) => state.user.value);
  const roles = useAppSelector((state: RootState) => state.roles.value);
  // @ts-ignore
  const userRole = roles.filter((item) => item._id === user.role)[0]?.role;

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, [location.pathname]);

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/roles')
      .then((response) => {
        if (response?.data?.roles) {
          dispatch(setRoles(response.data.roles));
        }
      })
      .catch((error) => console.log('error: ', error));
  }, []);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData')!);
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      dispatch(setUser(storedData));
    }
  });

  useEffect(() => {
    let expirationTimeout;
    const storedData = JSON.parse(localStorage.getItem('userData')!);
    if (storedData?.expiration) {
      const remainingTime =
        new Date(storedData.expiration).getTime() - new Date().getTime();
      expirationTimeout = setTimeout(() => {
        localStorage.removeItem('userData');
        dispatch(setUser({}));
      }, remainingTime);
    } else {
      clearTimeout(expirationTimeout);
    }
  });

  return (
    <>
      {isLoading && (
        <div id="overlay">
          <Spinner className="spinner" animation="border" variant="primary" />
        </div>
      )}
      <div className={location.pathname === '/healthfund' ? 'body' : ''}>
        {location.pathname !== '/healthfund' && <Navigation />}
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/about" component={About} />
          <Route path="/departments" component={Departments} />
          <Route path="/doctors" component={Doctors} />
          {/* @ts-ignore */}
          {user && userRole === 'doctor' && (
            <Route path="/patients" component={Patients} />
          )}
          <Route path="/healthfund" component={HealthFund} />
        </Switch>
        {location.pathname !== '/healthfund' && <Footer />}
      </div>
    </>
  );
};

export default App;
