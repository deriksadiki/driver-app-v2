/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './AuthStack/Auth';
import MainStack from './MainStack/Main'; 
import { StatusBar, PermissionsAndroid, Alert } from 'react-native';


export default class App extends React.Component{

  componentDidMount(){
    this.checkPermissionStatus()
}

  async checkPermissionStatus(){
    const permStatus = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
    if (!permStatus){
     Alert.alert('', 'This app collects location data to enable Zipi to send you accurate requests and let users track your deliveries in real-time, even when the app is closed or not in use.',
     [
         { text: 'Ok', onPress: () => { this.getLocationPermission() }}
       ],
       { cancelable: false }
     )
    }else{
      console.log('here')
    }
  }

  async getLocationPermission(){
    const backgroundgranted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Background Location Permission',
        message:
          'We need access to your location ' +
          'so you can get live quality updates.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
  
    if (backgroundgranted === PermissionsAndroid.RESULTS.GRANTED) {
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION,
        {
          title: 'Background Location Permission',
          message:
            'We need access to your location ' +
            'so you can get live quality updates.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
    }
  }

  render(){
    return(
      <NavigationContainer>
        <StatusBar backgroundColor="black" />
        <MainStack />
      </NavigationContainer>
    )
  }
}