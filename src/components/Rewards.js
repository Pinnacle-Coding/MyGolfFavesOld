import React, { Component } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { AppLoading } from 'expo';

import Header from './Header.js'
import SetupComponent from './SetupComponent.js'

export default class Rewards extends SetupComponent {
  constructor() {
    super();
    this.state = {
      loaded: false
    };
  }
  render() {
    if (!this.state.loaded) {
      return <AppLoading/>;
    }
    return (
      <View style={styles.container}>
        <Header title="Rewards"/>
        <View style={{borderBottomColor:'gray', borderBottomWidth:1, borderStyle: 'solid', padding:0}}/>
        <View style={{
        justifyContent: 'center',
        alignItems: 'center'}}>
          <Text style={{
            fontFamily:'OpenSans-Regular', fontSize: 20, paddingTop: 40}}>
            My Rewards Feature Coming Soon!</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {

  }
});
