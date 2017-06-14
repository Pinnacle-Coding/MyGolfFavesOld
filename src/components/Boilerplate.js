import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Font } from 'expo';

export default class Boilerplate extends Component {
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
      <View style={styles.container}>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {

  }
});
