import React, { Component } from 'react';
import { AppRegistry, ScrollView, Image, Text, StyleSheet, View, Platform } from 'react-native';
import { Font } from 'expo';
import LoginForm from './LoginForm';

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      fontsLoaded: false
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      'OpenSans-Regular': require('../../assets/fonts/OpenSans-Regular.ttf'),
      'OpenSans-Light': require('../../assets/fonts/OpenSans-Light.ttf'),
    });
    this.setState({
      fontsLoaded: true
    })
  }
  render() {
      return (
        <View style={{flex: 1}}>
          <View style={containerStyles.loginRegisterHeader}>
          {
            this.state.fontsLoaded ? <Text style={textStyles.titleText}>Login</Text> : undefined
          }
          </View>
          <View style={localStyles.container}>
            <LoginForm />
          </View>
        </View>
    );
  }
}

import textStyles from '../styles/text.js';
import containerStyles from '../styles/containers.js';
const localStyles = StyleSheet.create({
  container: {
    backgroundColor: '#efefef',
    padding: 30,
    flex: 1
  }
});
