import React, { Component } from 'react';
import { AppRegistry, ScrollView, Image, Text, StyleSheet, View, Platform } from 'react-native'
import { Font } from 'expo'

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      fontsLoaded: false
    };
  }
  async componentDidMount() {
    await Font.loadAsync({
      'OpenSans-Regular': require('./assets/fonts/OpenSans-Regular.ttf'),
      'OpenSans-Light': require('./assets/fonts/OpenSans-Light.ttf'),
    });
    this.setState({
      fontsLoaded: true
    })
  }
  render() {
      return (
        <View style={{flex: 1}}>
          <View style={styles.headerView}>
          {
            this.state.fontsLoaded ? <Text style={{fontFamily:'OpenSans-Light',fontSize: 36}}>Create an Account</Text> : undefined
          }
          </View>
          <ScrollView style={styles.loginView}>
            <Text style={{fontSize:96}}>Scroll me plz</Text>
            <Text style={{fontSize:96}}>If you like</Text>
            <Text style={{fontSize:96}}>Scrolling down</Text>
            <Text style={{fontSize:96}}>Framework around?</Text>
            <Text style={{fontSize:80}}>React Native</Text>
          </ScrollView>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  headerView: {
      backgroundColor: '#ffffff',
      paddingTop: 35,
      paddingBottom: 30,
      flexDirection: 'column',
      alignItems: 'center'
  },
  loginView: {
      backgroundColor: '#efefef',
      padding: 30,
      flexDirection: 'column'
  }
});
