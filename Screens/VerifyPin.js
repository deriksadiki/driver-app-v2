import React from 'react'
import Style from '../Style/Style';
import { View, Text, StatusBar, Linking, BackHandler } from 'react-native';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
 
export default class VerifyPin extends React.Component{
  constructor(){
    super()
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.state = {
      pin : '',
      pack : null
    }
  }

    componentDidMount(){
      BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
        let val = this.props.route.params.pack;
        console.log(val.pu_coords)
        this.setState({
          pack : val,
          pin : val.pin,
          id : val.id,
          coords : this.props.route.params.location,
          destinationCoords: val.pu_coords,
          driverObject : this.props.route.params.driverObject
        }, ()=>{
          this.checkFormSelection();
          this.checkVerification();
          this.openMap();
        })
    }


    UNSAFE_componentWillMount() {
      BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  handleBackButtonClick() {
    BackHandler.exitApp();
 }

    openMap(){
     Linking.openURL(`google.navigation:q=${this.state.destinationCoords}`)
    } 

    checkVerification(){
      database().ref('apiReq/' + this.state.pack.parentKey).on('value', data =>{
        let details = data.val();
        if (details.verified){
          this.props.navigation.navigate('addPacks', {driverObject: this.state.driverObject, packs : this.state.pack});
        }
      })
    }

    checkFormSelection(){
      database().ref('apiReq/' + this.state.pack.parentKey).once('value', data =>{
        let details = data.val();
        if (!details.selected){
          database().ref('apiReq/' + this.state.pack.parentKey).update({selected: true, driverId : auth().currentUser.uid, selectedPacks : false}).then(() =>{
            this.sendReleaseFrom()
          })
        }
      })
    }


  sendReleaseFrom(){
    let xhr = new XMLHttpRequest();
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var plate = this.state.driverObject.plateNum;
    var deliveryId = this.state.pack.id;
    var parentKey = this.state.pack.parentKey;
    let name = this.state.driverObject.firstName + " " + this.state.driverObject.surname
    let car = this.state.driverObject.mode;
    let url = 'https://zipi.co.za/p54_release.php?';
    let p54email = "derik@landsea-shipping.co.za";
    let params  = `address=${p54email}&time=${time}&date=${date}&driver_name=${name}&driver_car=${car}&plate=${plate}&deliveryId=${deliveryId}&parentKey=${parentKey}`;
    xhr.open('GET', `${url}${params}`, true)
    xhr.responseType = 'json';
    xhr.onreadystatechange = () =>{
        if(xhr.status == '200' & xhr.readyState == '4'){
            const response = xhr.response;
            console.log('sent')
        }
    }
    xhr.send();
}

  render(){
    return(
      <View style={Style.body}>
          <StatusBar backgroundColor="black" />
          <View style={Style.pinMainBody}>
              <Text style={{fontSize:17, fontWeight:'900', marginBottom: 10, marginTop: 8}}>Pack ID: {this.state.id}</Text>
              <Text></Text>
              <Text>Please stay safe and wear your mask. <Text></Text>
              <Text >Keep a safe social distance and don't forget to provide service with a smile even if your clients can't see it.</Text>
              </Text>
              
          </View>
            <View style={Style.pinBody}>
                <Text style={{fontSize:16, fontWeight:'900', marginBottom: 7, marginTop: 8}}>Release PIN</Text>
                <Text>You need to provide this PIN to the pick-up person to receive the package.</Text>
                <Text style={{fontSize:16, fontWeight:'bold', marginTop: 10, letterSpacing: 6}}>{this.state.pin}</Text>
        </View>
      </View>
    )
  }
}