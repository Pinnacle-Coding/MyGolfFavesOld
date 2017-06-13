import React, { Component } from 'react';
import { TextInput, ScrollView, Image, Text, StyleSheet, View, Platform } from 'react-native';
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
        <View style={{flex: 1, flexDirection: 'column', justifyContent: 'space-between'}}>
          <View style={containerStyles.loginRegisterHeader}>
          {
            this.state.fontsLoaded ? <Text style={textStyles.titleText}>Create an Account</Text> : undefined
          }
          </View>
          <ScrollView style={containerStyles.loginRegisterBackground}>
            <View style={{backgroundColor: '#ffffff'}}>
              <TextInput
                style={{height: 40}}
                placeholder="First Name"
                onChangeText={(text) => this.setState({text})}
              />
            </View>
            <View style={{backgroundColor: '#ffffff'}}>
              <TextInput
                style={{height: 40}}
                placeholder="First Name"
                onChangeText={(text) => this.setState({text})}
              />
            </View>
          </ScrollView>
        </View>
    );
  }
}

import textStyles from '../styles/text.js';
import containerStyles from '../styles/containers.js';
const localStyles = StyleSheet.create({});
