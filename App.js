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

export default class App extends React.Component{

  render(){
    return(
      <NavigationContainer>
        <MainStack />
      </NavigationContainer>
    )
  }
}