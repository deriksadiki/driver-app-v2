import React from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';


//screens
import Home from '../Screens/Home';
import History from '../Screens/History';
import VerifyPin from '../Screens/VerifyPin';
import AddPacks from '../Screens/AddPacks';


const Stack = createStackNavigator();

const MainStack = () =>{
    return(
    <Stack.Navigator initialRouteName="addPacks" headerMode="modal"  mode="card"
    screenOptions={{
        ...TransitionPresets.SlideFromRightIOS }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="History" component={History} />
        <Stack.Screen name="verify" component={VerifyPin} />
        <Stack.Screen name="addPacks" component={AddPacks} />
    </Stack.Navigator>
    )
}

export default MainStack;