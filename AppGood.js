import React, { Component } from 'react';
import { StyleSheet, View, AppRegistry } from 'react-native';
import Register from './src/components/Register.js';
import Login from './src/components/Login.js';
import Home from './src/components/Home.js';

import { NativeRouter, Route, Switch } from 'react-router-native'

export default class App extends Component {
  render() {
    return (
      <NativeRouter>
        <Switch>
          <Route exact path="/" component={Login}/>
          <Route path="/register" component={Register}/>
          <Route exact path="/home" component={Home}/>
        </Switch>
      </NativeRouter>
    );
  }
}
