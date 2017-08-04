import React, { Component } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text, Linking } from 'react-native';
import { Font, AppLoading } from 'expo';
import { Link } from 'react-router-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import focusTextInput from '../utils/TextInputManager.js';
import renderIf from '../utils/renderif.js';
import history from './src/utils/history.js';

import Header from './Header.js'

var auth = require('../services/AuthControl.js');

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      loaded: false,
      showForgotLogin: false,
      username: '',
      password: ''
    };
  }

  toggleStatus() {
    this.setState({
      showForgotLogin: !this.state.showForgotLogin
    });
  }

  login() {
    auth.login(this.state.username, this.state.password, function(err, message) {
      if (err) {
        console.error(err);
        this.setState({password: ''});
      }
      else if (message) {
        this.setState({password: ''});
      }
      else {
        console.log(auth.getUser());
        this.setState({username: ''});
        this.setState({password: ''});
        history.push('/home');
      }
    });
  }

  logout() {
    auth.logout();
    this.forceUpdate();
  }

  render() {
      if (!this.state.loaded) {
        return <AppLoading/>;
      }
      if (!auth.isAuthenticated) {
        return (
          <View style={{flex: 1, flexDirection: 'column', justifyContent: 'space-between'}}>
            <Header title="Login"/>
            <View style={{borderBottomColor:'gray', borderBottomWidth:1, borderStyle: 'solid', padding:0}}/>
            <View style={{
            justifyContent: 'center',
            alignItems: 'center'}}>
              <TouchableOpacity style={styles.loginContainer}>
                  <Link to="/home">
                    <Text style={styles.loginText}>RETURN TO HOME</Text>
                  </Link>
              </TouchableOpacity>
              <TouchableOpacity style={styles.logoutContainer} onPress={() => this.logout()}>
                  <Text style={styles.loginText}>LOG OUT</Text>
              </TouchableOpacity>
            </View>
          </View>
        )
      }
      return (
        <View style={{flex: 1, flexDirection: 'column', justifyContent: 'space-between'}}>
          <Header title="Login"/>
          <KeyboardAwareScrollView
          style={styles.container}
          resetScrollToCoords={{ x: 0, y: 0 }}
          extraHeight={175}
          keyboardOpeningTime={0}
          scrollEnabled={true}>
            <View flexDirection="row" style={styles.topText}>
              <Text style={styles.noAccountTxt}>Don.t have an account? </Text>
              <Link to="/register">
                <Text style={styles.createAccntLink}>Create an Account</Text>
              </Link>
            </View>

            <TextInput
              placeholder="Username"
              returnKeyType="next"
              onChangeText={(text) => this.setState({username: text})}
              onSubmitEditing={() => focusTextInput(this.refs.passwordInput)}
              style={styles.input}
            />

            <TextInput
              placeholder="Password"
              secureTextEntry
              returnKeyType="go"
              style={styles.input}
              ref='passwordInput'
              onChangeText={(text) => this.setState({password: text})}
            />

            <TouchableOpacity onPress={() => this.toggleStatus()}>
              <Text style={styles.forgot}>Forgot Username/Password</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.loginContainer} onPress={() => this.login()}>
                <Text style={styles.loginText}>LOG IN</Text>
            </TouchableOpacity>

            {
              renderIf(this.state.showForgotLogin)(
                <View>
                  <TextInput
                    placeholder="Email Address"
                    returnKeyType="go"
                    style={styles.input}
                  />

                  <TouchableOpacity style={styles.loginContainer}>
                    <Text style={styles.loginText}>SEND LOGIN CREDENTIALS</Text>
                  </TouchableOpacity>
                </View>
              )
            }

          </KeyboardAwareScrollView>
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
  logoutContainer: {
    marginTop: 20,
    paddingVertical: 14,
    backgroundColor: '#B22222'
  }
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
