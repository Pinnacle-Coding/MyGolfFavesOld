import React, { Component } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text, KeyboardAvoidingView, Linking } from 'react-native';
import { Font } from 'expo';
import focusTextInput from '../utils/TextInputManager.js'

import { Link } from 'react-router-native'

export default class LoginForm extends Component {
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
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <View flexDirection="row">
          {this.state.fontsLoaded ? <Text style={styles.noAccountTxt}>Dont have an account? </Text> : undefined }
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

        <TouchableOpacity onPress={() => {Linking.openURL("http://www.mygolffaves.com").catch(err => console.error('An error occured', err))} }>
           {this.state.fontsLoaded ? <Text style={styles.forgot}>Forgot Username/Password</Text> : undefined }
        </TouchableOpacity>

        <TouchableOpacity style={styles.loginContainer}>
          { this.state.fontsLoaded ? <Text style={styles.loginText}>LOG IN</Text> : undefined }
        </TouchableOpacity>

      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {

  },
  noAccountTxt: {
    fontSize: 17,
    marginBottom: 20,
    fontFamily: 'OpenSans-Regular'
  },
  createAccntLink: {
    color: '#509E2f',
    fontSize: 17,
    marginBottom: 20,
    fontFamily: 'OpenSans-Regular'
  },
  input: {
    height: 50,
    backgroundColor: '#FFF',
    marginBottom: 20,
    paddingHorizontal: 10,
    opacity: 0.9,
    fontSize: 20
  },
  loginContainer: {
    paddingVertical: 14,
    backgroundColor: '#509E2f'
  },
  forgot: {
    color: '#509E2f',
    fontSize: 17,
    marginBottom: 20,
    fontFamily: 'OpenSans-Regular'
  },
  loginText: {
    fontSize: 20,
    fontFamily: 'OpenSans-Regular',
    textAlign: 'center',
    color:'#FFF'
  }
});
