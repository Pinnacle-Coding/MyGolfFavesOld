import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Text } from 'react-native';
import { Font } from 'expo';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class Home extends Component {
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
        <View style={containerStyles.loginRegisterHeader}>
        {
          this.state.fontsLoaded ? <Text style={textStyles.titleText}>Home</Text> : undefined
        }
        </View>
        <View style={{borderBottomColor:'gray', borderBottomWidth:1, borderStyle: 'solid', padding:0}}/>
        <ScrollView>
          <View style={styles.homeLinkAccented}>
            <Icon name="user" size={50} color="#509E2f"/>
            <View style={{paddingLeft: 10}}>
            {
              this.state.fontsLoaded ? <Text style={styles.homeTitleText}>My Profile</Text> : undefined
            }
            {
              this.state.fontsLoaded ? <Text style={styles.homeSubtitleText}>Update your personal profile</Text> : undefined
            }
            </View>
          </View>
          <View style={styles.homeLink}>
            <Icon name="clipboard" size={50} color="#509E2f"/>
            <View style={{paddingLeft: 10}}>
            {
              this.state.fontsLoaded ? <Text style={styles.homeTitleText}>Favorite Golf Courses</Text> : undefined
            }
            {
              this.state.fontsLoaded ? <Text style={styles.homeSubtitleText}>Update your favorite golf courses</Text> : undefined
            }
            </View>
          </View>
          <View style={styles.homeLinkAccented}>
            <Icon name="question-circle" size={50} color="#509E2f"/>
            <View style={{paddingLeft: 10}}>
            {
              this.state.fontsLoaded ? <Text style={styles.homeTitleText}>My Offers</Text> : undefined
            }
            {
              this.state.fontsLoaded ? <Text style={styles.homeSubtitleText}>View offers from your favorite courses</Text> : undefined
            }
            </View>
          </View>
          <View style={styles.homeLink}>
            <Icon name="check-circle" size={50} color="#509E2f"/>
            <View style={{paddingLeft: 10}}>
            {
              this.state.fontsLoaded ? <Text style={styles.homeTitleText}>My Wallet</Text> : undefined
            }
            {
              this.state.fontsLoaded ? <Text style={styles.homeSubtitleText}>View offers you have accepted</Text> : undefined
            }
            </View>
          </View>
          <View style={styles.homeLinkAccented}>
            <Icon name="feed" size={50} color="#509E2f"/>
            <View style={{paddingLeft: 10}}>
            {
              this.state.fontsLoaded ? <Text style={styles.homeTitleText}>My Notifications</Text> : undefined
            }
            {
              this.state.fontsLoaded ? <Text style={styles.homeSubtitleText}>View notifications</Text> : undefined
            }
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

import textStyles from '../styles/text.js';
import containerStyles from '../styles/containers.js';
const styles = StyleSheet.create({
  homeTitleText: {
    fontFamily:'OpenSans-Regular',
    fontSize: 28
  },
  homeSubtitleText: {
    fontFamily:'OpenSans-Light',
    fontSize: 20
  },
  homeLink: {
      backgroundColor: '#ffffff',
      paddingTop: 20,
      paddingBottom: 20,
      paddingLeft: 10,
      flexDirection: 'row',
      alignItems: 'center'
  },
  homeLinkAccented: {
      backgroundColor: '#eeeeee',
      paddingTop: 20,
      paddingBottom: 20,
      paddingLeft: 10,
      flexDirection: 'row',
      alignItems: 'center'
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between'
  }
});