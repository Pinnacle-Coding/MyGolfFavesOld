import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Text, TouchableOpacity, TextInput, FlatList, Button } from 'react-native';
import { Font, AppLoading } from 'expo';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ModalSelector from 'react-native-modal-selector';
import Modal from 'react-native-modal';

import renderIf from '../utils/renderif.js';

import Header from './Header.js';

var authCtrl = require('../services/AuthControl.js');
var affiliateCtrl = require('../services/AffiliateControl.js');

var citiesData = [
  {
    name: 'Las Vegas',
    lat: 36.171,
    long: -115.1258
  }
]

export default class FavoriteGolfCourses extends Component {
  state = {
    loaded: false,
    showModal: false,
    modalText: '',
    locationLat: 36.171,
    locationLong: -115.1258,
    locationRadius: "50",
    nearbyAffiliates: [],
    showSelectAll: true
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

  getNearbyAffiliates() {
    affiliateCtrl.getNearbyAffiliates(authCtrl.getUser().memberID, this.state.locationLat, this.state.locationLong, this.state.locationRadius, function (err, message, affiliates) {
      if (err) {
        this.setState({
          modalText: err,
          showModal: true
        });
      }
      else if (message) {
        this.setState({
          modalText: message,
          showModal: true
        });
      }
      else {
        affiliates.forEach(function (affiliate) {
          affiliate.key = affiliate.companyID;
        });
        this.setState({
          nearbyAffiliates: affiliates,
          showSelectAll: true
        });
      }
    }.bind(this));
  }

  selectAllAffiliates() {
    if (this.state.showSelectAll) {
      this.state.nearbyAffiliates.forEach(function (affiliate) {
        affiliate.memberFavorite = "true";
      });
    }
    else {
      this.state.nearbyAffiliates.forEach(function (affiliate) {
        affiliate.memberFavorite = "false";
      });
    }
    this.setState({
      showSelectAll: !this.state.showSelectAll
    });
  }

  selectAffiliate(item) {
    if (item.memberFavorite === 'true') {
      item.memberFavorite = 'false';
    }
    else {
      item.memberFavorite = 'true';
    }
    // Re-render by accessing state but not changing it
    this.setState({
      showSelectAll: this.state.showSelectAll
    });
  }

  saveNearbyAffliates() {

  }

  render() {

    var milesMenu = [
      {
        key: 0,
        section: true,
        label: 'Miles'
      },
      {
        key: 1,
        label: '50'
      },
      {
        key: 2,
        label: '100'
      },
      {
        key: 3,
        label: '150'
      },
    ];

    var citiesMenu = [
      {
        key: 0,
        section: true,
        label: 'Cities'
      },
    ];
    for (var i = 0; i < citiesData.length; i++) {
      citiesMenu.push({
        key: i + 1,
        label: citiesData[i].name
      });
    }

    if (!this.state.loaded) {
      return <AppLoading/>;
    }
    return (
      <View style={{flex: 1, flexDirection: 'column'}}>
        <Header title="Favorites"/>
        <View style={{borderBottomColor:'gray', borderBottomWidth:1, borderStyle: 'solid', padding:0}}/>

        <Modal isVisible={this.state.showModal}>
          <View style={modalStyles.modalContainer}>
            <Text style={{fontSize: 20}}>{this.state.modalText}</Text>
            <TouchableOpacity onPress={() => this.setState({showModal: false})}>
              <View style={modalStyles.modalCloseButton}>
                <Text style={{color:'#FFF'}}>Close</Text>
              </View>
            </TouchableOpacity>
          </View>
        </Modal>

        <ScrollView style={styles.container}>

          <View style={styles.locationContainer}>
            <Text style={{paddingBottom: 5, textAlign: 'center', fontFamily:'OpenSans-Regular', fontSize: 24}}>Location Options</Text>

            <View style={{flexDirection: 'row'}}>
              <Text style={{padding: 5, paddingLeft: 20, fontFamily:'OpenSans-Regular', fontSize: 16}}>{'\u2022'} Location (click zip to change) </Text>
              <TextInput
                style={{borderWidth:1, borderColor:'#ccc', padding:10, height:30, width: 75}}
                placeholder="00000"
                keyboardType = 'numeric'
                value={this.state.textInputValue3} />
            </View>

            <Text style={{padding: 5, paddingLeft: 20, fontFamily:'OpenSans-Regular', fontSize: 16}}>{'\u2022'} <Text style={{textDecorationLine: 'underline'}}>Use My Current Location</Text></Text>

            <View style={{flexDirection: 'row'}}>
              <Text style={{padding: 5, paddingLeft: 20, fontFamily:'OpenSans-Regular', fontSize: 16}}>{'\u2022'} </Text>
              <ModalSelector
              style={{paddingTop: 2, width: 200}}
              data={citiesMenu}
              initValue="- Select a location -"
              onChange={(option)=>{ this.setState({textInputValue2: option.label})}}>
                <TextInput
                style={{borderWidth:1, borderColor:'#ccc', padding:10, height:30}}
                editable={false}
                placeholder="- Select a location -"
                value={this.state.textInputValue2} />
              </ModalSelector>
            </View>

            <Text style={{padding: 5, paddingLeft: 20, paddingBottom: 20, fontFamily:'OpenSans-Regular', fontSize: 16}}>{'\u2022'} <Text style={{textDecorationLine: 'underline'}}>Show All</Text></Text>

            <View style={{borderBottomColor: 'black', borderBottomWidth: 1, borderStyle: 'solid', padding: 0, marginLeft: 20, marginRight: 20}}/>

            <View style={{flexDirection: 'row'}}>
              <Text style={{padding: 5, paddingLeft: 20, paddingTop: 15, fontFamily:'OpenSans-Regular', fontSize: 16}}>{'\u2022'} Search within </Text>
              <ModalSelector
              style={{paddingTop: 12, width: 50}}
              data={milesMenu}
              initValue="50"
              onChange={(option) => {this.setState({locationRadius: option.label})}}>
                <TextInput
                style={{borderWidth:1, borderColor:'#ccc', padding:10, height:30}}
                editable={false}
                placeholder="50"
                value={this.state.locationRadius}/>
              </ModalSelector>
              <Text style={{padding: 5, paddingTop: 15, fontFamily:'OpenSans-Regular', fontSize: 16}}> miles</Text>
            </View>

            <TouchableOpacity
            style={{marginTop: 15, marginLeft: 15, marginRight: 15, padding: 5, borderWidth: 1, borderStyle: 'solid'}}
            onPress={() => this.getNearbyAffiliates()}>
              <Text style={{fontSize: 16, fontFamily: 'OpenSans-Regular', textAlign: 'center'}}>GO</Text>
            </TouchableOpacity>

          </View>

          {
            renderIf(this.state.showSelectAll)(
              <TouchableOpacity style={buttonStyles.fringedGreenButton} onPress={() => this.selectAllAffiliates()}>
                <Text style={buttonStyles.fringedGreenButtonText}>SELECT ALL</Text>
              </TouchableOpacity>
            )
          }

          {
            renderIf(!this.state.showSelectAll)(
              <TouchableOpacity style={buttonStyles.fringedRedButton} onPress={() => this.selectAllAffiliates()}>
                <Text style={buttonStyles.fringedRedButtonText}>CLEAR ALL</Text>
              </TouchableOpacity>
            )
          }

          <FlatList
            style={{paddingTop: 10}}
            data={this.state.nearbyAffiliates}
            renderItem={
              ({item}) =>
              <TouchableOpacity style={{padding: 10, flexDirection: 'row'}} onPress={() => this.selectAffiliate(item)}>
                {
                  renderIf(item.memberFavorite === 'true')(
                    <Icon name="check" size={30} color="#509E2F"/>
                  )
                }
                {
                  renderIf(item.memberFavorite !== 'true')(
                    <Icon name="add" size={30} color="#D12020"/>
                  )
                }
                <Text style={{fontFamily:'OpenSans-Regular', fontSize: 18, paddingLeft: 5, paddingTop: 5}}>{item.companyName} <Text style={{fontFamily:'OpenSans-Regular', fontSize: 14}}>{item.distance}</Text></Text>
              </TouchableOpacity>
            }
          />

          <TouchableOpacity style={buttonStyles.solidGreenButton} onPress={() => this.saveNearbyAffliates()}>
            <Text style={buttonStyles.solidGreenButtonText}>SAVE CHOICES</Text>
          </TouchableOpacity>

          <View style={{padding:100}}/>
        </ScrollView>
      </View>
    )
  }
}

import modalStyles from '../styles/modal.js';
import buttonStyles from '../styles/buttons.js';
const styles = StyleSheet.create({
  container: {
    padding: 30,
    flex: 1
  },
  locationContainer: {
    backgroundColor: '#efefef',
    borderStyle: 'solid',
    borderColor: 'black',
    borderWidth: 1,
    paddingTop: 15,
    paddingBottom: 15
  }
});
