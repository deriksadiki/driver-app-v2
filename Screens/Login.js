import React from 'react'

import { View, Text, TextInput, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import auth from '@react-native-firebase/auth';
 
export default class Login extends React.Component{

  constructor(){
    super()
    this.state = {
      email : '',
      password : ''
    }
  }

  login(){
    auth().signInWithEmailAndPassword(this.state.email,this.state.password).then(() =>{
      alert('welcom back');
    }).catch(error =>{
      Alert.alert('', error.message)
    })
  }

  render(){
    return(
      <View>
       <TextInput placeholder="email" value={this.state.email} onChangeText={(txt)=>{this.setState({email: txt})}}/>
       <TextInput placeholder="Password" value={this.state.password} onChangeText={(txt)=>{this.setState({password: txt})}}/>
       <TouchableOpacity onPress={()=>{this.login()}}>
         <Text>Login</Text>
       </TouchableOpacity>
      </View>
    )
  }
}