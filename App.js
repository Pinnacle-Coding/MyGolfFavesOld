import React, { Component } from 'react';
import { StyleSheet, View} from 'react-native';
import { Router, Route, Switch } from 'react-router-native'

import Register from './src/components/Register.js';
import Login from './src/components/Login.js';
import Home from './src/components/Home.js';
import Profile from './src/components/Profile.js';

import history from './src/utils/history.js';

export default class App extends Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route path="/login" component={Login}/>
          <Route path="/register" component={Register}/>
          <Route path="/home" component={Home}/>
          <Route path="/profile" component={Profile}/>
        </Switch>
      </Router>
    );
  }
}
