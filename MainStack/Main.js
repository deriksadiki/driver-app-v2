import React from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';


//screens
import Home from '../Screens/Home';
import History from '../Screens/History';


const Stack = createStackNavigator();

const MainStack = () =>{
    return(
    <Stack.Navigator initialRouteName="Home" headerMode="modal"  mode="card"
    screenOptions={{
        ...TransitionPresets.SlideFromRightIOS }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="History" component={History} />
        
    </Stack.Navigator>
    )
}

export default MainStack;