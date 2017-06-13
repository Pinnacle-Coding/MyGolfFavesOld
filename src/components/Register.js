import React, { Component } from 'react';
import { AppRegistry, ScrollView, Image, Text, StyleSheet, View, Platform } from 'react-native'
import { Font } from 'expo'

import textStyles from '../styles/text.js'
const localStyles = StyleSheet.create({
  headerView: {
      backgroundColor: '#ffffff',
      paddingTop: 35,
      paddingBottom: 30,
      flexDirection: 'column',
      alignItems: 'center'
  },
  loginView: {
      backgroundColor: '#efefef',
      padding: 30,
      flexDirection: 'column'
  }
});

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
        <View style={{flex: 1}}>
          <View style={localStyles.headerView}>
          {
            this.state.fontsLoaded ? <Text style={textStyles.titleText}>Create an Account</Text> : undefined
          }
          </View>
          <ScrollView style={localStyles.loginView}>
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
