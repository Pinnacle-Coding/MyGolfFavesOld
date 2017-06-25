import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Text, FlatList, TouchableOpacity } from 'react-native';
import { Font } from 'expo';

import Header from './Header.js'

var offers = [
  {
    name: 'Moorpark Country Club - Complimentary Guest',
    key: 0
  },
  {
    name: 'Moorpark Country Club - Play 18 Hole Round of Golf any day - Receive day of week and time of day Free Replay',
    key: 1
  }
]

export default class Boilerplate extends Component {
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
      <View style={styles.container}>
        <Header title="Wallet"/>
        <View style={{borderBottomColor:'gray', borderBottomWidth:1, borderStyle: 'solid', padding:0}}/>
        <ScrollView>
          <FlatList
            data={offers}
            renderItem={
              ({item}) =>
              <View style={{padding: 10}}>
                  <Text style={styles.itemTitle}>{item.name}</Text>
                  <TouchableOpacity style={styles.redeemContainer}>
                    {
                      <Text style={styles.redeemText}>REDEEM</Text>
                    }
                  </TouchableOpacity>
                  <View style={{borderBottomColor:'lightgray', borderBottomWidth:1, borderStyle: 'solid', padding:10}}/>
              </View>
            }
          />
          <View style={{padding:100}}/>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {

  },
  itemTitle: {
    paddingTop: 10,
    fontSize: 28,
    fontFamily: 'OpenSans-Regular',
    paddingBottom: 5
  },
  redeemContainer: {
    marginTop: 20,
    paddingVertical: 14,
    backgroundColor: '#509E2f'
  },
  redeemText: {
    fontSize: 20,
    textAlign: 'center',
    color:'#FFF'
  }
});
