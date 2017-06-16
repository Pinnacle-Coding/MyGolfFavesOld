import React, { Component } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { Font } from 'expo';

import Header from './Header.js'

export default class Boilerplate extends Component {
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
      <View style={styles.container}>
        <Header title="Rewards"/>
        <View style={{borderBottomColor:'gray', borderBottomWidth:1, borderStyle: 'solid', padding:0}}/>
        <View style={{
        justifyContent: 'center',
        alignItems: 'center'}}>
          { this.state.fontsLoaded ? <Text style={{
            fontFamily:'OpenSans-Regular', fontSize: 20, paddingTop: 40}}>
            My Rewards Feature Coming Soon!</Text> : undefined }
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {

  }
});
