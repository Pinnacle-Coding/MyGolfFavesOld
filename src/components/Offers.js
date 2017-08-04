import React, { Component } from 'react';
import { StyleSheet, View, FlatList, Text, ScrollView } from 'react-native';
import { Font, AppLoading } from 'expo';
import { Link } from 'react-router-native';

import Header from './Header.js'

var offers = [
  {
    key: 2057,
    name: "Moorpark Country Club",
    startDate: new Date(2017, 5, 5, 12, 0, 0, 0),
    endDate: new Date(2017, 6, 31, 12, 0, 0, 0),
    distance: 10.50,
    offer: "Play 18 Hole Round of Golf any day - Receive day of week and time of day Free Replay"
  },
  {
    key: 2060,
    name: "Moorpark Country Club",
    startDate: new Date(2017, 5, 5, 12, 0, 0, 0),
    endDate: new Date(2017, 7, 5, 12, 0, 0, 0),
    distance: 10.50,
    offer: "Complimentary Guest"
  },
  {
    key: 2062,
    name: "Ojai Valley Inn",
    startDate: new Date(2017, 5, 5, 12, 0, 0, 0),
    endDate:new Date(2017, 7, 15, 12, 0, 0, 0),
    distance: 32.43,
    offer: "Play 18 Hole Round of Golf any day - Receive day of week and time of day Free Replay"
  }
]

export default class Offers extends Component {
  state = {
    loaded: false
  };

  async componentDidMount() {
    await Font.loadAsync({
      'OpenSans-Regular': require('../../assets/fonts/OpenSans-Regular.ttf'),
      'OpenSans-Light': require('../../assets/fonts/OpenSans-Light.ttf'),
    });
    this.setState({
      loaded: true
    })
  }

  render() {
    if (!this.state.loaded) {
      return <AppLoading/>;
    }
    return (
      <View style={styles.container}>
        <Header title="Offers"/>
        <View style={{borderBottomColor:'gray', borderBottomWidth:1, borderStyle: 'solid', padding:0}}/>
        <ScrollView>
          <FlatList
            data={offers}
            renderItem={
              ({item}) =>
              <View style={{padding: 10}}>
                <Link to='/offer'>
                  <View>
                    <Text style={styles.itemTitle}>{item.name}</Text>
                    <Text style={styles.itemText}><Text style={{fontWeight: 'bold'}}>Start Date:</Text> {item.startDate.toDateString()}</Text>
                    <Text style={styles.itemText}><Text style={{fontWeight: 'bold'}}>End Date:</Text> {item.endDate.toDateString()}</Text>
                    <Text style={styles.itemText}><Text style={{fontWeight: 'bold'}}>Distance:</Text> {item.distance} miles</Text>
                    <Text style={styles.itemText}><Text style={{fontWeight: 'bold'}}>Offer:</Text> {item.offer}</Text>
                    <View style={{borderBottomColor:'lightgray', borderBottomWidth:1, borderStyle: 'solid', padding:10}}/>
                  </View>
                </Link>
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
    fontSize: 28,
    fontFamily: 'OpenSans-Regular',
    paddingBottom: 5
  },
  itemText: {
    padding: 5
  }
});
