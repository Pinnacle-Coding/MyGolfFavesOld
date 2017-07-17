import React, { Component } from 'react';
import { StyleSheet, View, ListView, Text, TouchableOpacity  } from 'react-native';
import { Font } from 'expo';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { CheckBox } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Header from './Header.js'

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

export default class Boilerplate extends Component {
  constructor() {
    super();
    const ds = new ListView.DataSource({rowHasChanged: (r1,r2) => ri != r2})

    this.state = {
      fontsLoaded: false,
      dataSource: ds.cloneWithRows(testData),
      checkedSrc: 'check-box'
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

  changeChecked() {
    if (this.state.checkedSrc == 'check-box'){
      this.setState({checkedSrc: 'check-box-outline-blank'})
    } else {
      this.setState({checkedSrc: 'check-box'})
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Header title="Favorite Golf Courses"/>
        <View style={{borderBottomColor:'gray', borderBottomWidth:1, borderStyle: 'solid', padding:0}}/>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) =>
            <View style = {{flexDirection: 'row'}}>
              <TouchableOpacity onPress={() => {
                rowData.checked = !rowData.checked;
              }}>
                <Icon
                  name={rowData.checked ? 'check-box' : 'check-box-outline-blank'}
                  size={30}
                  style={{padding: 10}}
                />
              </TouchableOpacity>
              <Text style={{fontSize: 20, alignSelf:'center'}}>{rowData.name}</Text>
              <Text style={{fontSize: 15, alignSelf:'center'}}>{rowData.distance} mi.</Text>
            </View>}
          />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {

  },
  scrollContainer: {
    o
  },
  paramContainer: {

  },

});
