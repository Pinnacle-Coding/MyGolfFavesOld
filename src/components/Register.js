import React, { Component } from 'react';
import { TextInput, ScrollView, Image, Text, StyleSheet, View, TouchableOpacity, Linking } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Font } from 'expo';
import { Link } from 'react-router-native'

import focusTextInput from '../utils/TextInputManager.js';
import Header from './Header.js'

export default class Register extends Component {
  constructor() {
    super();
    this.state = {
      fontsLoaded: false,
      firstName: '',
      lastName: '',
      email: '',
      confirmEmail: '',
      username: '',
      password: '',
      confirmPassword: ''
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
  createAccount() {
    if (!this.state.username || !this.state.password || !this.state.firstName || !this.state.lastName || !this.state.email) {
      return;
    }
    if (this.state.email !== this.state.confirmEmail || this.state.password !== this.state.confirmPassword) {
      return;
    }
    fetch('http://business.mygolffaves.com/ws/mobilePublicService.cfc?method=createMemberAccount', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        emailAddress: this.state.email,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        password: this.state.password,
        username: this.state.username,
        UID: 1,
        PWD: 'mob!leMGF'
      })
    }).then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
      })
      .catch((error) => {
        console.error(error);
      });
  }
  render() {
      return (
        <View style={{flex: 1, flexDirection: 'column', justifyContent: 'space-between'}}>
          <Header title="Create an Account"/>
          <KeyboardAwareScrollView
          style={styles.registerBackground}
          resetScrollToCoords={{ x: 0, y: 0 }}
          extraHeight={175}
          keyboardOpeningTime={0}
          scrollEnabled={true}>
            <View style={styles.registerTextbox}>
                <TextInput
                  ref="firstName"
                  style={textStyles.formText}
                  placeholder="First Name"
                  returnKeyType={"next"}
                  onChangeText={(text) => this.setState({firstName: text})}
                  onSubmitEditing={() => focusTextInput(this.refs.lastName)}
                />
            </View>
            <View style={styles.registerTextbox}>
                <TextInput
                  ref="lastName"
                  style={textStyles.formText}
                  placeholder="Last Name"
                  returnKeyType = {"next"}
                  onChangeText={(text) => this.setState({lastName: text})}
                  onSubmitEditing={() => focusTextInput(this.refs.email)}
                />
            </View>
            <View style={styles.registerTextbox}>
                <TextInput
                  ref="email"
                  style={textStyles.formText}
                  placeholder="Email Address"
                  returnKeyType = {"next"}
                  onChangeText={(text) => this.setState({email: text})}
                  onSubmitEditing={() => focusTextInput(this.refs.confirmEmail)}
                />
            </View>
            <View style={styles.registerTextbox}>
                <TextInput
                  ref="confirmEmail"
                  style={textStyles.formText}
                  placeholder="Confirm Email"
                  returnKeyType = {"next"}
                  onChangeText={(text) => this.setState({confirmPassword: text})}
                  onSubmitEditing={() => focusTextInput(this.refs.username)}
                />
            </View>
            <View style={{borderBottomColor:'gray', borderBottomWidth:3, borderStyle: 'solid', padding:15}}/>
            <View style={{padding:15}}/>
            <View style={styles.registerTextbox}>
                <TextInput
                  ref="username"
                  style={textStyles.formText}
                  placeholder="Username"
                  returnKeyType = {"next"}
                  onChangeText={(text) => this.setState({username: text})}
                  onSubmitEditing={() => focusTextInput(this.refs.password)}
                />
            </View>
            <View style={styles.registerTextbox}>
                <TextInput
                  ref="password"
                  style={textStyles.formText}
                  placeholder="Password"
                  returnKeyType = {"next"}
                  secureTextEntry
                  onChangeText={(text) => this.setState({password: text})}
                  onSubmitEditing={() => focusTextInput(this.refs.confirmPassword)}
                />
            </View>
            <View style={styles.registerTextbox}>
                <TextInput
                  ref="confirmPassword"
                  style={textStyles.formText}
                  placeholder="Confirm Password"
                  secureTextEntry
                  onChangeText={(text) => this.setState({confirmPassword: text})}
                />
            </View>
            <View style={{padding:10}}/>
            <TouchableOpacity style={styles.registerContainer} onPress={() => this.createAccount()}>
            {
              this.state.fontsLoaded ? <Text style={styles.registerText}>CREATE ACCOUNT</Text> : undefined
            }
            </TouchableOpacity>
            <View style={{padding:10}}/>
            <View>
              {this.state.fontsLoaded ? <Text style={styles.termsPre}>By creating an account, you agree to our</Text> : undefined}
              <TouchableOpacity onPress={() => {Linking.openURL("http://www.mygolffaves.com/index.cfm?event=public.terms").catch(err => console.error('An error occured', err))} }>
                 {this.state.fontsLoaded ? <Text style={styles.terms}>Terms and Conditions.</Text> : undefined }
              </TouchableOpacity>
            </View>
            <View style={{padding:30}}/>
          </KeyboardAwareScrollView>
        </View>
    );
  }
}

import textStyles from '../styles/text.js';
const styles = StyleSheet.create({
  registerContainer: {
    paddingVertical: 15,
    backgroundColor: '#509E2f'
  },
  registerText: {
    fontSize: 20,
    fontFamily: 'OpenSans-Regular',
    textAlign: 'center',
    color:'#FFF'
  },
  registerBackground: {
    backgroundColor: '#efefef',
    padding: 30
  },
  registerTextbox: {
    padding: 10
  },
  termsPre: {
    fontSize: 17,
    fontFamily: 'OpenSans-Regular'
  },
  terms: {
    color: '#509E2f',
    textDecorationLine: 'underline',
    fontSize: 17,
    fontFamily: 'OpenSans-Regular'
  }
});
