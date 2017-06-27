import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Font } from 'expo';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import Header from './Header.js'

var t = require('tcomb-form-native');
var Form = t.form.Form;
var RedeemModel = t.struct({
  redemptionCode: t.String,
  enterAmount: t.Number
});
var options = {
  fields: {
    redemptionCode: {
      secureTextEntry: true
    }
  }
};

var offer = {
  key: 2058,
  name: 'Moorpark Country Club',
  offer: 'Complimentary Guest'
}

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
        <Header title="Redeem Offer"/>
        <View style={{borderBottomColor:'gray', borderBottomWidth:1, borderStyle: 'solid', padding:0}}/>
        <KeyboardAwareScrollView
        style={styles.scrollContainer}
        resetScrollToCoords={{ x: 0, y: 0 }}
        extraHeight={175}
        keyboardOpeningTime={0}
        scrollEnabled={true}>
          <View style={{paddingTop: 10}}>
            {
              this.state.fontsLoaded ? <Text style={styles.title}>{offer.offer}</Text> : undefined
            }
          </View>
          <View style={{paddingBottom: 10}}>
            {
              this.state.fontsLoaded ? <Text style={styles.title}>@ {offer.name}</Text> : undefined
            }
          </View>
          <Form
            ref="form"
            type={RedeemModel}
            options={options}
          />
          <TouchableOpacity style={styles.button} onPress={this.onPress}>
            <Text style={styles.buttonText}>Redeem</Text>
          </TouchableOpacity>
          <View style={{padding:100}}/>
      </KeyboardAwareScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {

  },
  scrollContainer: {
    padding: 20
  },
  title: {
    fontSize: 22,
    fontFamily: 'OpenSans-Light',
    textAlign: 'center'
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    backgroundColor: '#509E2f',
    borderColor: '#509E2f',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  }
});
