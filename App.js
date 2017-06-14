import React, { Component } from 'react';
import { StyleSheet, View, AppRegistry } from 'react-native';
import { StackNavigator } from 'react-navigation';
import Register from './src/components/Register.js';
import Login from './src/components/Login.js';

export default class App extends Component {
  static navigationOptions = {

  }
  render() {
    return (
      <Login/>
    );
  }
}

const Test = StackNavigator({
  Home: { screen: App },
  Login: { screen: Login },
  Register: { screen: Register}
});
