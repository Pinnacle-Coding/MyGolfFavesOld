import React, { Component } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text, Linking } from 'react-native';
import { Font, AppLoading } from 'expo';
import { Link } from 'react-router-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Modal from 'react-native-modal'

import focusTextInput from '../utils/TextInputManager.js';
import renderIf from '../utils/renderif.js';
import history from '../utils/history.js';

import Header from './Header.js'

var auth = require('../services/AuthControl.js');

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      loaded: false,
      showForgotLogin: false,
      showModal: false,
      modalText: '',
      username: '',
      password: ''
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      'OpenSans-Regular': require('../../assets/fonts/OpenSans-Regular.ttf'),
      'OpenSans-Light': require('../../assets/fonts/OpenSans-Light.ttf'),
    });
    this.setState({
      loaded: true
    })
  }

  toggleStatus() {
    this.setState({
      showForgotLogin: !this.state.showForgotLogin
    });
  }

  login() {
    auth.login(this.state.username, this.state.password, function(err, message) {
      if (err) {
        this.setState({password: ''});
        this.setState({modalText: err});
        this.setState({showModal: true});
      }
      else if (message) {
        this.setState({password: ''});
        this.setState({modalText: message});
        this.setState({showModal: true});
      }
      else {
        this.setState({username: ''});
        this.setState({password: ''});
        history.replace('/home');
      }
    }.bind(this));
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

          <Modal isVisible={this.state.showModal}>
            <View style={styles.modalContainer}>
              <Text style={{fontSize: 20}}>{this.state.modalText}</Text>
              <TouchableOpacity onPress={() => this.setState({showModal: false})}>
                <View style={styles.modalCloseButton}>
                  <Text style={{color:'#FFF'}}>Close</Text>
                </View>
              </TouchableOpacity>
            </View>
          </Modal>

          <KeyboardAwareScrollView
          style={styles.container}
          resetScrollToCoords={{ x: 0, y: 0 }}
          extraHeight={175}
          keyboardOpeningTime={0}
          scrollEnabled={true}>
            <View flexDirection="row" style={styles.topText}>
              <Text style={styles.noAccountTxt}>Don't have an account? </Text>
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
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  modalCloseButton: {
    backgroundColor: '#509E2f',
    padding: 12,
    margin: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  }
});
