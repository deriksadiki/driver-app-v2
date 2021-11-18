import React from 'react'

import { View, Text, TextInput, Alert, StatusBar, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import auth from '@react-native-firebase/auth';
import Style from '../Style/Style';
import main from '../Images/main.png'
import LoadingModal from './LoadingModal';
 
export default class Login extends React.Component{

  constructor(){
    super()
    this.state = {
      email : '',
      password : ''
    }
  }

  login(){
    if (this.state.password !== '' && this.state.email !== ''){
      this.LoadingModal.showModal();
      auth().signInWithEmailAndPassword(this.state.email,this.state.password).then(() => {
        console.log('welcom back');
      }).catch(error =>{
        Alert.alert('', error.message)
      }).then(() =>{
        this.LoadingModal.dismissModal();
      })
    }else{
      Alert.alert('', 'Please enter your Email and Password')
    }
    
  }

  resetPassword(){
    if (this.state.email !== ''){
      this.LoadingModal.showModal();
      auth().sendPasswordResetEmail(this.state.email).then(()=>{
          Alert.alert('','We have sent an email to ' + this.state.email + ', click the link in the email to reset your password')
      },Error=>{
          Alert.alert('', Error.message)
      }).then(() =>{
        this.LoadingModal.dismissModal();
      })
    }else{
        Alert.alert('','Please enter your email address to reset your password')
    }
  }

  render(){
    return(
      <View style={Style.body}>
        <LoadingModal ref={(ref)=>{this.LoadingModal = ref}} />
        <StatusBar backgroundColor="black" />
        <View style={Style.loginBody}>

        <View style={Style.alignLogin}>
          <View style={Style.loginImg}>
          <Image source={main} />
          </View>
          
          <Text>Login</Text>
            <TextInput placeholder=" email"  style={Style.loginInput} value={this.state.email} onChangeText={(txt)=>{this.setState({email: txt})}}/>
          <TextInput placeholder=" Password" style={Style.loginInput} secureTextEntry  value={this.state.password} onChangeText={(txt)=>{this.setState({password: txt})}}/>
        </View>
          <View>
            <View style={Style.loginAlignBtn}>
              <Text style={{marginTop: 10}}>Forgot password?</Text>
              <TouchableOpacity style={{marginLeft: 10, marginTop: 10}}  onPress={()=>{this.resetPassword()}}>
                <Text style={{color:'blue'}}>Reset</Text>
                </TouchableOpacity>
                <TouchableOpacity style={Style.loginBtn} onPress={()=>{this.login()}}>
                <Text>Sign in</Text>
                </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    )
  }
}