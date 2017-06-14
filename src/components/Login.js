import React, { Component } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text, KeyboardAvoidingView, Linking } from 'react-native';
import { Font } from 'expo';
import { Link } from 'react-router-native'

import focusTextInput from '../utils/TextInputManager.js';
import renderIf from '../utils/renderif.js';

import Header from './Header.js'

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      fontsLoaded: false
    };
  }

  toggleStatus() {
    this.setState({
      showForgotLogin:!this.state.showForgotLogin
    });
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
        <View style={{flex: 1, flexDirection: 'column', justifyContent: 'space-between'}}>
          <Header title="Login"/>
          <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <View flexDirection="row" style={styles.topText}>
              {this.state.fontsLoaded ? <Text style={styles.noAccountTxt}>Don't have an account? </Text> : undefined }
              <Link to="/register">
                {this.state.fontsLoaded ? <Text style={styles.createAccntLink}>Create an Account</Text> : <Text>Create an Account</Text> }
              </Link>
            </View>

            <TextInput
              placeholder="Username"
              returnKeyType="next"
              onSubmitEditing={() => focusTextInput(this.refs.passwordInput)}
              style={styles.input}
            />

            <TextInput
              placeholder="Password"
              secureTextEntry
              returnKeyType="go"
              style={styles.input}
              ref='passwordInput'
            />

            <TouchableOpacity onPress={() => this.toggleStatus() }>
               {this.state.fontsLoaded ? <Text style={styles.forgot}>Forgot Username/Password</Text> : undefined }
            </TouchableOpacity>

            <TouchableOpacity style={styles.loginContainer}>
              { this.state.fontsLoaded ? <Text style={styles.loginText}>LOG IN</Text> : undefined }
            </TouchableOpacity>

            {renderIf(this.state.showForgotLogin)(
              <View>
                <TextInput
                  placeholder="Email Address"
                  returnKeyType="go"
                  style={styles.input}
                />

                <TouchableOpacity style={styles.loginContainer}>
                  { this.state.fontsLoaded ? <Text style={styles.loginText}>SEND LOGIN CREDENTIALS</Text> : undefined }
                </TouchableOpacity>
              </View>
            )}

          </KeyboardAvoidingView>
      </View>
    );
  }
}

import textStyles from '../styles/text.js';
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#efefef',
    padding: 30,
    flex: 1
  },
  noAccountTxt: {
    fontSize: 17,
    fontFamily: 'OpenSans-Regular'
  },
  createAccntLink: {
    color: '#509E2f',
    fontSize: 17,
    fontFamily: 'OpenSans-Regular'
  },
  input: {
    height: 50,
    backgroundColor: '#FFF',
    marginTop: 20,
    paddingHorizontal: 10,
    opacity: 0.9,
    fontSize: 20
  },
  loginContainer: {
    marginTop: 20,
    paddingVertical: 14,
    backgroundColor: '#509E2f'
  },
  forgot: {
    color: '#509E2f',
    fontSize: 17,
    marginTop: 20,
    fontFamily: 'OpenSans-Regular'
  },
  loginText: {
    fontSize: 20,
    fontFamily: 'OpenSans-Regular',
    textAlign: 'center',
    color:'#FFF'
  }
});
