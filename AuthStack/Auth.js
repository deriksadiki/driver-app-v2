import React from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'
//screens
import Login from '../Screens/Login';

const Stack = createStackNavigator();

const AuthStack = () =>{
    return(
    <Stack.Navigator initialRouteName="Login" headerMode="modal"  mode="card"
    screenOptions={{
        ...TransitionPresets.SlideFromRightIOS }}>
        <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
    )
}

export default AuthStack;