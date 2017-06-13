import React, { Component } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text } from 'react-native';
import { Font } from 'expo';

export default class LoginForm extends Component {
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
        <TextInput
          placeholder="Username"
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          secureTextEntry
          style={styles.input}
        />
        <TouchableOpacity style={styles.loginContainer}>
        {
          this.state.fontsLoaded ? <Text style={styles.loginText}>LOG IN</Text> : undefined
        }
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {

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
  loginText: {
    fontSize: 20,
    fontFamily: 'OpenSans-Regular',
    textAlign: 'center',
    color:'#FFF'
  }
});
