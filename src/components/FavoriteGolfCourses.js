import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
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
        <Header title="My Favorite Golf Courses"/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {

  }
});
