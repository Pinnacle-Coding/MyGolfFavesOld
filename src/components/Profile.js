import React, { Component } from 'react';
import { StyleSheet, View, TouchableHighlight, Text, ScrollView } from 'react-native';
import { Font } from 'expo';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import Header from './Header.js'

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
});

export default class Profile extends Component {
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
  onPress() {
    // call getValue() to get the values of the form
    var value = this.refs.form.getValue();
    if (value) { // if validation fails, value will be null
      console.log(value); // value here is an instance of Person
    }
  }
  render() {
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
            type={ProfileModel}
          />
          <TouchableHighlight style={styles.button} onPress={this.onPress} underlayColor='#99d9f4'>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableHighlight>
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
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  }
});
