import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Font } from 'expo';

import Header from './Header.js'

var offer = {
  key: 2058,
  name: 'Moorpark Country Club',
  offer: 'Complimentary Guest'
}

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
        <Header title="Redeem Offer"/>
        <View style={{borderBottomColor:'gray', borderBottomWidth:1, borderStyle: 'solid', padding:0}}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {

  }
});
