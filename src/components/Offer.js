import React, { Component } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Linking, Image, Platform } from 'react-native';
import { Font, AppLoading } from 'expo';

import Header from './Header.js'

var offer = {
  key: 2062,
  name: "Ojai Valley Inn",
  startDate: new Date(2017, 5, 5, 12, 0, 0, 0),
  endDate:new Date(2017, 7, 15, 12, 0, 0, 0),
  distance: 32.43,
  image: "http://business.mygolffaves.com/img/143/offer-images/Rio%20Secco.jpg",
  location: {
    lat: -33.8356372,
    long: 18.6947617
  },
  locationName: "905 Country Club Road Ojai, CA 93023",
  offer: "Play 18 Hole Round of Golf any day - Receive day of week and time of day Free Replay",
  website: "http://www.ojairesort.com/golf",
  moreDetails: "Limited to 4 per person. Reservation required on our website www.GibbsCC.com or by calling the pro shop at (818) 878-9544. Green fee rate determined by available rate at time of reservation. Replay rounds are based on availability for the same day of the week at a similar tee time.",
  terms: "Some restrictions may apply. Not valid in combination with any other offers or discounts. Proper golf attire required - collared shirts required and no blue jeans are allowed."
}

export default class Offer extends Component {
  constructor() {
    super();
    this.state = {
      loaded: false
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

  getGPSLink(latArg, longArg) {
    if (Platform.OS === 'ios') {
      return 'http://maps.apple.com/?ll='+latArg+','+longArg
    }
    else {
      return 'geo:'+latArgs+','+longArg
    }
  }

  render() {
    if (!this.state.loaded) {
      return <AppLoading/>;
    }
    return (
      <View>
        <Header title="Offer"/>
        <View style={{borderBottomColor:'gray', borderBottomWidth:1, borderStyle: 'solid', padding:0}}/>
        <ScrollView style={{padding: 10}}>
          <View>
            <Text style={styles.title}>{offer.name}</Text>
          </View>
          <View style={{paddingTop: 10, paddingBottom: 10}}>
            <Text style={styles.description}>{offer.offer}</Text>
          </View>
          <Image source={{uri: offer.image}} style={{width: 400, height: 250}} />
          <View style={{borderBottomColor:'lightgray', borderBottomWidth:1, borderStyle: 'solid', padding:10}}/>
          <View style={{paddingTop: 10}}>
            <Text style={styles.title}>Offer Details</Text>
          </View>
          <View style={styles.subsection}>
            <View>
              <Text style={styles.subtitle}>Redemption Location</Text>
            </View>
            <TouchableOpacity onPress={() => {Linking.openURL(this.getGPSLink(offer.location.lat, offer.location.long)).catch(err => console.error('An error occured', err))} }>
              <Text style={styles.subcontent}>{offer.locationName}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.subsection}>
            <View>
              <Text style={styles.subtitle}>Website</Text>
            </View>
            <TouchableOpacity onPress={() => {Linking.openURL(offer.website).catch(err => console.error('An error occured', err))} }>
              <Text style={styles.subcontent}>{offer.website}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.subsection}>
            <View>
              <Text style={styles.subtitle}>Expires on</Text>
            </View>
            <View>
              <Text style={styles.subcontent}>{offer.endDate.toDateString()}</Text>
            </View>
          </View>
          <View style={styles.subsection}>
            <View>
              <Text style={styles.subtitle}>More details</Text>
            </View>
            <View>
              <Text style={styles.subcontent}>{offer.moreDetails}</Text>
            </View>
          </View>
          <View style={styles.subsection}>
            <View>
              <Text style={styles.subtitle}>Terms</Text>
            </View>
            <View>
              <Text style={styles.subcontent}>{offer.terms}</Text>
            </View>
          </View>
          <TouchableOpacity style={buttonStyles.solidGreenButton}>
            <Text style={buttonStyles.solidGreenButtonText}>ADD TO WALLET</Text>
          </TouchableOpacity>
          <View style={{padding:80}}/>
        </ScrollView>
      </View>
    );
  }
}

import buttonStyles from '../styles/buttons.js';
const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    fontFamily: 'OpenSans-Regular',
    textAlign: 'center'
  },
  description: {
    fontSize: 22,
    fontFamily: 'OpenSans-Light',
    textAlign: 'center'
  },
  subsection: {
    paddingTop: 10
  },
  subtitle: {
    fontFamily: 'OpenSans-Regular',
  },
  subcontent: {
    fontFamily: 'OpenSans-Light',
  }
});
