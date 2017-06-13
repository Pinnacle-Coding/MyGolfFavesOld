import React, { Component } from 'react';
import { TextInput, ScrollView, Image, Text, StyleSheet, View, TouchableOpacity, Linking } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Font } from 'expo';

import focusTextInput from '../utils/TextInputManager.js'

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
                  onSubmitEditing={() => focusTextInput(this.refs.lastName)}
                />
            </View>
            <View style={styles.registerTextbox}>
                <TextInput
                  ref="lastName"
                  style={textStyles.formText}
                  placeholder="Last Name"
                  returnKeyType = {"next"}
                  onSubmitEditing={() => focusTextInput(this.refs.email)}
                />
            </View>
            <View style={styles.registerTextbox}>
                <TextInput
                  ref="email"
                  style={textStyles.formText}
                  placeholder="Email Address"
                  returnKeyType = {"next"}
                  onSubmitEditing={() => focusTextInput(this.refs.confirmEmail)}
                />
            </View>
            <View style={styles.registerTextbox}>
                <TextInput
                  ref="confirmEmail"
                  style={textStyles.formText}
                  placeholder="Confirm Email"
                  returnKeyType = {"next"}
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
                  onSubmitEditing={() => focusTextInput(this.refs.confirmPassword)}
                />
            </View>
            <View style={styles.registerTextbox}>
                <TextInput
                  ref="confirmPassword"
                  style={textStyles.formText}
                  placeholder="Confirm Password"
                  secureTextEntry
                />
            </View>
            <View style={{padding:10}}/>
            <TouchableOpacity style={styles.registerContainer}>
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
import containerStyles from '../styles/containers.js';
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
