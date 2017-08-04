import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Font } from 'expo';

export default class SetupComponent extends Component {
  state = {
    loaded: false
  };

  async componentDidMount() {
    await Font.loadAsync({
      'OpenSans-Regular': require('../../assets/fonts/OpenSans-Regular.ttf'),
      'OpenSans-Light': require('../../assets/fonts/OpenSans-Light.ttf'),
    });
    this.setState({
      loaded: true
    })
  }
}
