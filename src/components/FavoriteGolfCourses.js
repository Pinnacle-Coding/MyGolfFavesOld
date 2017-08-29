import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Text, TouchableOpacity  } from 'react-native';
import { Font, AppLoading } from 'expo';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Header from './Header.js';

var testData = [
  {
    name: 'Agoura Hills Country Club',
    distance: '7.67',
    checked: true,
    link: 'http://www.google.com'
  },
  {
    name: 'Moorpark Country Club',
    distance: '10.19',
    checked: false,
    link: 'http://www.yahoo.com'
  }
]

export default class FavoriteGolfCourses extends Component {
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
      <View style={{flex: 1, flexDirection: 'column', justifyContent: 'space-between'}}>
        <Header title="Favorites"/>
        <View style={{borderBottomColor:'gray', borderBottomWidth:1, borderStyle: 'solid', padding:0}}/>

        <ScrollView style={styles.container}>
          <View style={styles.locationContainer}>
            <View style={{justifyContent: 'center'}}>
              <Text style={{fontFamily:'OpenSans-Regular', fontSize: 24}}>Location Options</Text>
            </View>
          </View>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 30,
    flex: 1
  },
  locationContainer: {
    backgroundColor: '#efefef',
    paddingTop: 40,
    borderStyle: 'solid',
    borderColor: 'black',
    borderWidth: 1
  }
});
