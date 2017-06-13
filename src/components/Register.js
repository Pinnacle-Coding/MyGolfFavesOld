import React, { Component } from 'react';
import { AppRegistry, ScrollView, Image, Text, StyleSheet, View, Platform } from 'react-native';
import { Font } from 'expo';

export default class Register extends Component {
  constructor() {
    super();
    this.state = {
      fontsLoaded: false
    };
  }
  async componentDidMount() {
    await Font.loadAsync({
      'OpenSans-Regular': require('../../public/fonts/OpenSans-Regular.ttf'),
      'OpenSans-Light': require('../../public/fonts/OpenSans-Light.ttf'),
    });
    this.setState({
      fontsLoaded: true
    })
  }
  render() {
      return (
        <View style={containerStyles.loginRegisterBackground}>
          <View style={containerStyles.loginRegisterHeader}>
          {
            this.state.fontsLoaded ? <Text style={textStyles.titleText}>Create an Account</Text> : undefined
          }
          </View>
          <ScrollView>
            <Text style={{fontSize:96}}>Scroll me plz</Text>
            <Text style={{fontSize:96}}>If you like</Text>
            <Text style={{fontSize:96}}>Scrolling down</Text>
            <Text style={{fontSize:96}}>Framework around?</Text>
            <Text style={{fontSize:80}}>React Native</Text>
          </ScrollView>
        </View>
    );
  }
}

import textStyles from '../styles/text.js';
import containerStyles from '../styles/containers.js';
const localStyles = StyleSheet.create({});
