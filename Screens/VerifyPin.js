import React from 'react';
import Style from '../Style/Style';
import {View, Text, StatusBar, Linking, BackHandler} from 'react-native';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import axios from 'axios';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class VerifyPin extends React.Component {
  constructor() {
    super();
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.state = {
      pin: '',
      pack: null,
    };
  }

  componentDidMount() {
    BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
    let val = this.props.route.params.pack;
    //console.log(val);
    this.setState(
      {
        pack: val,
        pin: val.pin,
        id: val.id,
        coords: this.props.route.params.location,
        destinationCoords: val.pu_coords,
        driverObject: this.props.route.params.driverObject,
      },
      () => {
        this.checkFormSelection();
        this.checkVerification();
        this.openMap();
      },
    );
  }

  UNSAFE_componentWillMount() {
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }

  handleBackButtonClick() {
    BackHandler.exitApp();
  }

  openMap() {
    Linking.openURL(`google.navigation:q=${this.state.destinationCoords.lat},${ this.state.destinationCoords.lng}`);
  }

  checkVerification() {
    database()
      .ref('apiReq/' + this.state.pack.parentKey)
      .on('value', data => {
        if (data.val()) {
          let details = data.val();
          if (details.verified) {
            this.props.navigation.navigate('addPacks', {
              driverObject: this.state.driverObject,
              packs: this.state.pack,
            });
          }
        }
      });
  }

  checkFormSelection() {
    database()
      .ref('apiReq/' + this.state.pack.parentKey)
      .once('value', data => {
        let details = data.val();
        if (!details.selected) {
          database()
            .ref('apiReq/' + this.state.pack.parentKey)
            .update({
              selected: true,
              driverId: auth().currentUser.uid,
              selectedPacks: false,
            })
            .then(() => {
              this.getTripDetails(details.reqKeys);
            });
        }
      });
  }

  getTripDetails(key) {
    console.log();
    database()
      .ref('newReq/' + key[0])
      .once('value', data => {
        this.sendReleaseFrom(data.val().booking_email);
        this.sendSMS(data.val().cellphone);
      });
    //this.sendReleaseFrom();
  }

  sendReleaseFrom(email) {
    let xhr = new XMLHttpRequest();
    var today = new Date();
    var date =
      today.getFullYear() +
      '-' +
      (today.getMonth() + 1) +
      '-' +
      today.getDate();
    var time =
      today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
    var plate = this.state.driverObject.plateNum;
    var deliveryId = this.state.pack.id;
    var parentKey = this.state.pack.parentKey;
    let name =
      this.state.driverObject.firstName + ' ' + this.state.driverObject.surname;
    let car =
      this.state.driverObject.make + ' ' + this.state.driverObject.model;
    let url = 'https://developer.zipi.co.za/p54_release.php?';
    let p54email = 'derik@landsea-shipping.co.za';
    let params = `address=${email}&time=${time}&date=${date}&driver_name=${name}&driver_car=${car}&plate=${plate}&deliveryId=${deliveryId}&parentKey=${parentKey}`;
    xhr.open('GET', `${url}${params}`, true);
    xhr.responseType = 'json';
    xhr.onreadystatechange = () => {
      if ((xhr.status == '200') & (xhr.readyState == '4')) {
        const response = xhr.response;
        console.log('sent');
      }
    };
    xhr.send();
  }

  sendSMS(cellphone) {
    var body =
      'Zipi: A delivery agent is on their way to pick up your cargo: Track: https://developer.zipi.co.za/map/zipiliteMap.php To verify your driver, click ' +
      'https://developer.zipi.co.za/verifyPin.php?key=' +
      this.state.pack.parentKey;
    var sms = `https://us-central1-zipi-app.cloudfunctions.net/sendSms?cellphone=${cellphone.replace(
      '0',
      '27',
    )}&message=${body}`;
    axios.get(sms).then(data => {
      console.log('sent 2');
    });
  }

  render() {
    return (
      <View style={Style.outerContainer}>
        <StatusBar backgroundColor="#f2f2f2" barStyle="dark-content" />
        
        <View style={Style.inTransitContent}>
            <View style={Style.information}>
              <Text style={{fontWeight: "bold", fontSize: 20, textAlign: "center", marginBottom: 20}}>PACK ID: {this.state.id}</Text>
            
             <Text style={{fontWeight: "bold", textAlign: "center", marginBottom: 20}}>
               Keep a safe social distance and don't forget to provide service with a smile even if your clients can't see it.
             </Text>
            </View>
            <View style={Style.absoluteCard}>
          <View style={Style.cancelBtn}>
            <TouchableOpacity style={Style.theBtn}>
              <Text style={{color: "red"}}>Cancel trip</Text>
            </TouchableOpacity>
          </View>
              <Text style={{fontWeight: "bold", textAlign: "center", marginBottom: 20}}>Release PIN</Text>
              <Text style={{fontStyle: "italic", textAlign: "center", marginBottom: 20}}>
                  You need to provide this PIN to the pick-up person to receive the package.
              </Text>
              <Text style={{textAlign: "center", marginBottom: 20, fontSize: 20, fontWeight: "bold", letterSpacing: 5}}>
              {this.state.pin}
              </Text>
            </View>
        </View>
      </View>
    );
  }
}
