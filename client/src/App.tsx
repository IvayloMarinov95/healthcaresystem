import './App.css';

import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Navigation from './components/Navigation/Navigation';

const App = () => (
  <div>
    <Navigation />
    <Switch>
      <Route />
    </Switch>
  </div>
);

export default App;
