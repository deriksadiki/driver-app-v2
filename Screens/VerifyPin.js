import React from 'react'
import Style from '../Style/Style';

import { View, Text, StatusBar } from 'react-native';
 
export default class VerifyPin extends React.Component{

    componentDidMount(){
        setTimeout(() => {
            this.props.navigation.navigate('addPacks');
        }, 2000);
    }

  render(){
    return(
      <View style={Style.body}>
          <StatusBar backgroundColor="black" />
          <View style={Style.pinMainBody}>
              <Text style={{fontSize:17, fontWeight:'900', marginBottom: 10, marginTop: 8}}>Arrived</Text>
              <Text>Please stay safe and wear your mask. <Text></Text>
              <Text >Keep a safe social distance and don't forget to provide service with a smile even if your clients can't see it.</Text>
              </Text>
              
          </View>
            <View style={Style.pinBody}>
                <Text style={{fontSize:16, fontWeight:'900', marginBottom: 7, marginTop: 8}}>Release PIN</Text>
                <Text>You need to provide this PIN to the pick-up person to receive the package.</Text>
                <Text style={{fontSize:16, fontWeight:'bold', marginTop: 10, letterSpacing: 6}}>65867554</Text>
        </View>
      </View>
    )
  }
}