import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, ScrollView } from 'react-native';
import { AppLoading } from 'expo';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import Header from './Header.js';
import SetupComponent from './SetupComponent.js'

import renderIf from '../utils/renderif.js';

var t = require('tcomb-form-native');
var Form = t.form.Form;
var ProfileModel = t.struct({
  firstName: t.String,
  lastName: t.String,
  zipCode: t.Number,
  city: t.String,
  state: t.String,
  emailAddress: t.String,
  birthYear: t.Number,
  gender: t.enums({
    M: 'Male',
    F: 'Female'
  }),
  "howOftenDoYouPlayGolf?": t.enums({
    F: 'Frequently',
    L: 'Less Than 10 Times a Year',
    N: 'New Golfer'
  }),
  "withWhomDoYouMostOftenPlayGolf?": t.struct({
    businessAssociates: t.Boolean,
    friends: t.Boolean,
    spouse: t.Boolean,
    "jr.Golfers": t.Boolean,
  }),
  username: t.String,
});
var ProfilePasswordModel = t.struct({
  firstName: t.String,
  lastName: t.String,
  zipCode: t.Number,
  city: t.String,
  state: t.String,
  emailAddress: t.String,
  birthYear: t.Number,
  gender: t.enums({
    M: 'Male',
    F: 'Female'
  }),
  "howOftenDoYouPlayGolf?": t.enums({
    F: 'Frequently',
    L: 'Less Than 10 Times a Year',
    N: 'New Golfer'
  }),
  username: t.String,
  "withWhomDoYouMostOftenPlayGolf?": t.struct({
    businessAssociates: t.Boolean,
    friends: t.Boolean,
    spouse: t.Boolean,
    "juniorGolfers": t.Boolean,
  }),
  currentPassword: t.String,
  newPassword: t.String,
  verifyPassword: t.String
});

export default class Profile extends SetupComponent {
  constructor() {
    super();
    this.state = {
      loaded: false,
      showChangePassword: false,
      formType: ProfileModel
    };

    this.onTogglePassword = this.onTogglePassword.bind(this);
  }

  onTogglePassword() {
    if (this.state.showChangePassword) {
      this.setState({
        formType: ProfileModel,
        showChangePassword: false
      });
    }
    else {
      this.setState({
        formType: ProfilePasswordModel,
        showChangePassword: true
      });
    }
  }

  render() {
    if (!this.state.loaded) {
      return <AppLoading/>;
    }
    return (
      <View style={styles.container}>
        <Header title="Profile"/>
        <View style={{borderBottomColor:'gray', borderBottomWidth:1, borderStyle: 'solid', padding:0}}/>
        <KeyboardAwareScrollView
        style={styles.scrollContainer}
        resetScrollToCoords={{ x: 0, y: 0 }}
        extraHeight={175}
        keyboardOpeningTime={0}
        scrollEnabled={true}>
          <Form
            ref="form"
            type={this.state.formType}
          />
          <TouchableOpacity style={styles.button} onPress={this.onTogglePassword}>
            <Text style={styles.buttonText}>Change Password</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={this.onPress}>
            <Text style={styles.buttonText}>Save</Text>
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
