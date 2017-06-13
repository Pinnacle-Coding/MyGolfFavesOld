import React, { Component } from 'react';
import { AppRegistry, ScrollView, Image, Text, StyleSheet, View } from 'react-native'
import { Font } from 'expo'

export default class Login extends Component {
  state = {
    fontsLoaded: false,
  };
  async componentDidMount() {
    await Font.loadAsync({
      'OpenSans-Regular': require('./assets/fonts/OpenSans-Regular.ttf'),
      'OpenSans-Light': require('./assets/fonts/OpenSans-Light.ttf'),
      'OpenSans-Bold': require('./assets/fonts/OpenSans-Bold.ttf'),
    });
    this.setState({ fontsLoaded: true });
  }
  render() {
      return (
        <View style={{flex: 1}}>
          <View style={styles.header}>
          {
            this.state.fontsLoaded ? <Text style={{fontFamily:'OpenSans-Regular', fontSize:36}}>Create an Account</Text> : null
          }
          </View>
          <ScrollView style={styles.login}>
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
  login: {
      backgroundColor: '#efefef',
      padding: 30,
      flexDirection: 'column'
  },
  header: {
      backgroundColor: '#ffffff',
      paddingTop: 35,
      paddingBottom: 30,
      flexDirection: 'column',
      alignItems: 'center'
  }
});
