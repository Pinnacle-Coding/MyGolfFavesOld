import React, { Component } from 'react';
import { TextInput, ScrollView, Image, Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Font } from 'expo';

export default class Register extends Component {
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
        <View style={{flex: 1, flexDirection: 'column', justifyContent: 'space-between'}}>
          <View style={containerStyles.loginRegisterHeader}>
          {
            this.state.fontsLoaded ? <Text style={textStyles.titleText}>Create an Account</Text> : undefined
          }
          </View>
          <KeyboardAwareScrollView
          style={containerStyles.loginRegisterBackground}
          resetScrollToCoords={{ x: 0, y: 0 }}
          extraHeight={150}
          scrollEnabled={true}>
            <View style={containerStyles.loginRegisterTextbox}>
                <TextInput
                  style={textStyles.formText}
                  placeholder="First Name"
                  onChangeText={(text) => this.setState({text})}
                />
            </View>
            <View style={containerStyles.loginRegisterTextbox}>
                <TextInput
                  style={textStyles.formText}
                  placeholder="Last Name"
                  onChangeText={(text) => this.setState({text})}
                />
            </View>
            <View style={containerStyles.loginRegisterTextbox}>
                <TextInput
                  style={textStyles.formText}
                  placeholder="Email Address"
                  onChangeText={(text) => this.setState({text})}
                />
            </View>
            <View style={containerStyles.loginRegisterTextbox}>
                <TextInput
                  style={textStyles.formText}
                  placeholder="Confirm Email"
                  onChangeText={(text) => this.setState({text})}
                />
            </View>
            <View style={{borderBottomColor:'gray', borderBottomWidth:3, borderStyle: 'solid', padding:15}}/>
            <View style={{padding:15}}/>
            <View style={containerStyles.loginRegisterTextbox}>
                <TextInput
                  style={textStyles.formText}
                  placeholder="Username"
                  onChangeText={(text) => this.setState({text})}
                />
            </View>
            <View style={containerStyles.loginRegisterTextbox}>
                <TextInput
                  style={textStyles.formText}
                  placeholder="Password"
                  secureTextEntry
                  onChangeText={(text) => this.setState({text})}
                />
            </View>
            <View style={containerStyles.loginRegisterTextbox}>
                <TextInput
                  style={textStyles.formText}
                  placeholder="Confirm Password"
                  secureTextEntry
                  onChangeText={(text) => this.setState({text})}
                />
            </View>
            <View style={{padding:10}}/>
            <TouchableOpacity style={localStyles.registerContainer}>
            {
              this.state.fontsLoaded ? <Text style={localStyles.registerText}>CREATE ACCOUNT</Text> : undefined
            }
            </TouchableOpacity>
            <View style={{padding:10}}/>
            <View>
              <Text>By creating an account, you agree to our</Text>
              <Text>Terms and Conditions</Text>
            </View>
            <View style={{padding:30}}/>
          </KeyboardAwareScrollView>
        </View>
    );
  }
}

import textStyles from '../styles/text.js';
import containerStyles from '../styles/containers.js';
const localStyles = StyleSheet.create({
  registerContainer: {
    paddingVertical: 15,
    backgroundColor: '#509E2f'
  },
  registerText: {
    fontSize: 20,
    fontFamily: 'OpenSans-Regular',
    textAlign: 'center',
    color:'#FFF'
  }
});
