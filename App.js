import React, { Component } from 'react';
import { AppRegistry, ScrollView, Image, Text, StyleSheet, View } from 'react-native'

export default class Login extends Component {
  render() {
      return (
        <View style={{flex: 1}}>
          <View style={styles.header}>
            <Text style={{fontFamily:'OpenSans-Light', fontSize:36}}>Create an Account</Text>
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
