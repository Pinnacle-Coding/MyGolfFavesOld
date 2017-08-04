import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { AppLoading } from 'expo';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import Header from './Header.js'
import SetupComponent from './SetupComponent.js'

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

export default class Redeem extends SetupComponent {
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
        <Header title="Redeem Offer"/>
        <View style={{borderBottomColor:'gray', borderBottomWidth:1, borderStyle: 'solid', padding:0}}/>
        <KeyboardAwareScrollView
        style={styles.scrollContainer}
        resetScrollToCoords={{ x: 0, y: 0 }}
        extraHeight={175}
        keyboardOpeningTime={0}
        scrollEnabled={true}>
          <View style={{paddingTop: 10}}>
            <Text style={styles.title}>{offer.offer}</Text>
          </View>
          <View style={{paddingBottom: 20}}>
            <Text style={styles.title}>@ {offer.name}</Text>
          </View>
          <Form
            ref="form"
            type={RedeemModel}
            options={options}
          />
          <TouchableOpacity style={styles.button} onPress={this.onPress}>
            <Text style={styles.buttonText}>Redeem</Text>
          </TouchableOpacity>
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
  },
  title: {
    fontSize: 22,
    fontFamily: 'OpenSans-Light',
    textAlign: 'center'
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    backgroundColor: '#509E2f',
    borderColor: '#509E2f',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  }
});
