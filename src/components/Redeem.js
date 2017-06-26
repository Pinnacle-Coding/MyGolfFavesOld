import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Font } from 'expo';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import Header from './Header.js'

var t = require('tcomb-form-native');
var Form = t.form.Form;
var RedeemModel = t.struct({
  redemptionCode: t.String,
  enterAmount: t.Number
});
var options = {
  fields: {
    redemptionCode: {
      secureTextEntry: true
    }
  }
};

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
        <KeyboardAwareScrollView
        style={styles.scrollContainer}
        resetScrollToCoords={{ x: 0, y: 0 }}
        extraHeight={175}
        keyboardOpeningTime={0}
        scrollEnabled={true}>
          <Form
            ref="form"
            type={RedeemModel}
            options={options}
          />
          <View style={{padding:100}}/>
      </KeyboardAwareScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {

  },
  scrollContainer: {
    padding: 20
  }
});
