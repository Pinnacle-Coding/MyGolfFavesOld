import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { AppLoading } from 'expo';

import Header from './Header.js'
import SetupComponent from './SetupComponent.js'

export default class Boilerplate extends SetupComponent {
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
        <Header title="Placeholder"/>
        <View style={{borderBottomColor:'gray', borderBottomWidth:1, borderStyle: 'solid', padding:0}}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {

  }
});
