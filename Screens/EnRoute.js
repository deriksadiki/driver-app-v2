import React from 'react'
import Style from '../Style/Style';
import VIForegroundService from '@voximplant/react-native-foreground-service';
import {View, Text, StatusBar, TouchableOpacity, Image , ScrollView, Modal, TextInput, Alert, Linking, BackHandler} from 'react-native';
import Box from '../Images/box.png';
import Call from '../Images/call.png';
import Loc from '../Images/loc.png'
import axios from 'axios';
 
export default class EnRoute extends React.Component{

    constructor(){
        super()
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
        this.state = {
          packages : null,
          selectedPacks : [],
          allPackages : [],
          packsArray : [],
          showModal : false,
          verifyPinModal : false,
          nextTrip : false,
          pin : ''
        }
      }

      UNSAFE_componentWillMount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    handleBackButtonClick() {
      BackHandler.exitApp();
   }

      verifyPin(){
        if (this.state.packages.pu_pin == this.state.pin){
          if (this.state.allPackages.length >= 1){
            this.setState({pin : '', verifyPinModal : false, nextTrip : true, packages : this.state.allPackages[0] }, () => this.changePack(this.state.packages.pu_pin))
          }else{
            this.setState({verifyPinModal : false}, () =>{
              Alert.alert('', 'you have completed all the deliveries');
              this.props.navigation.popToTop()
            } )
          }
        }else{
          Alert.alert('', 'The Pin you have entered is incorrect!');
        }
          
      }

      componentDidMount(){
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
        let packs = this.props.route.params.packages
        this.setState({
          packages : this.props.route.params.packages[0],
          allPackages : packs,
          totTrips :  packs.length
        }, () => {this.changePack(this.state.packages.pu_pin)
         this.openMap();
        })
      }

      arrived(){
        VIForegroundService.stopService();
        this.setState({verifyPinModal : true})
      }

      openMap(){
        Linking.openURL(`google.navigation:q=${this.state.packages.do_location}`)
        this.startForegroundService()
      }

      async startForegroundService() {
        const channelConfig = {
          id: 'channelId',
          name: 'Channel name',
          description: 'Channel description',
          enableVibration: false
      };
        VIForegroundService.createNotificationChannel(channelConfig);
        const notificationConfig = {
          channelId: 'channelId',
          id: 3456,
          title: 'Title',
          text: 'Some text',
          icon: 'ic_icon'
      };
      try {
          await VIForegroundService.startService(notificationConfig);
      } catch (e) {
          console.error(e);
      }    
    }

      changePack(pin){
        let tmpArr = new Array();
          for (var x = 0; x < this.state.allPackages.length; x++){
            if (this.state.allPackages[x].pu_pin !== pin){
              tmpArr.push(this.state.allPackages[x])
            }
          }
          if (this.state.allPackages.length > 0){
            this.setState({
              allPackages : tmpArr
            },  () =>{
              this.sendSMS(this.state.packages.cellphone, this.state.packages.pu_pin)
              this.sendPin(this.state.packages.pu_pin, this.state.packages.booking_email, this.state.packages.booking_name)
            })
          }  else{
            Alert.alert('', 'you have completed all the deliveries');
            this.props.navigation.popToTop()
          }  
      }

      sendSMS(cellphone, pin){
        var body = `Thank you for using Zipi Delivery. Zipi PIN: ${pin}. Please present it to your driver.`;
        var sms = `https://us-central1-zipi-app.cloudfunctions.net/sendSms?cellphone=${cellphone.replace("0","27")}&message=${body}`;
       axios.get(sms).then((data) =>{
          console.log('sent')
        })
      }

      sendPin(pin, email, name){
        var url = `https://zipi.co.za/ZLpin.php?name=${name}&email=${email}&pin=${pin}`;
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.send();
    }

      return(){
        Alert.alert(
            '',
            'Are you sure you want to return this package?',
            [
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel'
              },
              { text: 'OK', onPress: () => console.log('ok pressed')}
            ],
            { cancelable: false }
          );
      }

      startTrip (){
        this.setState({nextTrip : false }, () =>{
          this.openMap();
        })
      }

  render(){

    const packs = this.state.allPackages.map((val, indx) =>{
        return(
          <TouchableOpacity disabled={true} style={Style.card} key={indx}>
                    <View style={Style.cardContent}>
                      <Image style={Style.boxImg} source={Box} />
                    </View>
                    <View style={Style.cardContent2}>
                      <Text style={Style.nameTXT}>{val.order_id}</Text>
                      <Text style={Style.detailsTXT}>{val.distance} km</Text>
                    </View>
                </TouchableOpacity>
        )
      })

    return(
        <View style={Style.body}>
            <StatusBar backgroundColor="black" />
        {this.state.packages ? 
        <View style={Style.routeTxt}>
            <Text style={{fontSize: 20}}>{this.state.packages.order_id}</Text>
        </View>
        :
        <View></View> }

        <View style={Style.packsBody2}>
              <ScrollView style={{marginBottom: 30}}>
              {packs}
              </ScrollView>
        </View>
        {this.state.packages ? 
      <View style={Style.alignRoute}>
            <View style={{marginBottom: 15}}>
                <Text>Current Trip (1/{this.state.totTrips})</Text>
            </View>
            <View style={Style.routeCard}>
                     <View style={Style.routeCardContent}>
                      <Image style={Style.routerImg} source={Box} />
                    </View>
                    <View style={Style.routeCardContent2}>
                      <Text style={Style.nameTXT}>{this.state.packages.booking_name}</Text>
                      <Text style={Style.detailsTXT}>REF: {this.state.packages.booking_ref}</Text>
                      <Text style={Style.detailsTXT}>{this.state.packages.do_location}</Text>
                    </View>

                    <View style={Style.alignRoute}>
                        <Text></Text>
                        <Text style={{fontSize: 11}}>Message/ Special Instructions/ Packages</Text>
                        <View style={Style.routerText}>
                            <TouchableOpacity style={Style.txtBorder} onPress={()=>{this.setState({showModal: true})}}>
                            <Text>{this.state.packages.instructions}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={Style.callbtn} onPress={()=>{Linking.openURL(`tel:${this.state.packages.cellphone}`)}}>
                                <Image style={Style.routerImg2} source={Call} />
                            </TouchableOpacity>
                        </View>
                    </View>
            </View>
     </View>
        :
        <View></View> }

        <View style={Style.bottomBtn}>
            <TouchableOpacity style={Style.arriveBtn} onPress={()=>{this.arrived()}}>
                <Text>Arrived</Text>
            </TouchableOpacity>
            <TouchableOpacity style={Style.returnBtn} onPress={()=>{this.return()}}>
                <Text style={{color: '#ffe200'}}>Return</Text>
            </TouchableOpacity>
        </View>

        <Modal visible={this.state.showModal} animationType='slide'>
        {this.state.packages ? 
            <View style={Style.body}>
            <View style={Style.routeTxt}>
                <TouchableOpacity style={Style.backBtn} onPress={()=>{this.setState({showModal: false})}}>
                    <Text>Back</Text>
                </TouchableOpacity>
                <Text style={{fontSize: 20}}>{this.state.packages.booking_name}</Text>
            </View>
                <Text style={{textAlign:'center', marginTop: 20}}>Special Instructions</Text>
                <Text style={{textAlign:'center', marginTop: 20, width:'97%', marginLeft: 5}}>{this.state.packages.instructions}</Text>
            </View>
            :
            <View></View> }
        </Modal>

        <Modal visible={this.state.verifyPinModal} animationType='slide'>
            <View style={Style.body} > 
            {this.state.packages ? 
            <View  style={{justifyContent:'center', alignContent:'center', alignItems:'center', marginTop: '50%', width: '90%', marginLeft: '5%'}}>
            <Text>Ask {this.state.packages.booking_name} for the PIN before you can hand them the package.</Text>
            <Text></Text>
            <Text>REF: {this.state.packages.order_id}</Text>
            <Text></Text>
            <TextInput keyboardType='number-pad' value={this.state.pin} onChangeText={(txt) =>{this.setState({pin:txt})}} style={Style.input} placeholder="Pin" />
            </View>
            :
            <View></View>}
            <View style={Style.bottomBtn}>
                <TouchableOpacity style={Style.btn}  onPress={()=>{this.verifyPin()}}>
                    <Text>Verify Pin</Text>
                </TouchableOpacity>
            </View>
            </View>
        </Modal>

        <Modal transparent visible={this.state.nextTrip} animationType='slide'>
        <View style={Style.tripNext} />

          <View style={Style.nextTrip}>
            <View style={Style.alignPinItems}>
                <Image style={Style.routerImg} source={Box} />
              <Text style={{fontSize: 17, marginBottom: 10, marginTop: 10}}>Pin Approved</Text>
              <Text>Click "Next trip" when you're ready for the next trip</Text>
            </View>
        
        <View style={Style.bottomBtn}>
                <TouchableOpacity style={Style.btn} onPress={()=>{this.startTrip()}}>
                    <Text>Next Trip</Text>
                </TouchableOpacity>
        </View>
          </View>
        </Modal>

      </View>
    )
  }
}