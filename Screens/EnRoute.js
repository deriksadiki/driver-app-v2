import React from 'react'
import Style from '../Style/Style';
import {View, Text, StatusBar, TouchableOpacity, Image , ScrollView, Modal, TextInput, Alert, Linking} from 'react-native';
import Box from '../Images/box.png';
import Call from '../Images/call.png';
import Loc from '../Images/loc.png'
 
export default class EnRoute extends React.Component{

    constructor(){
        super()
        this.state = {
          packages : [],
          selectedPacks : [],
          packsArray : [],
          showModal : false,
          verifyPinModal : false,
          nextTrip : false
        }
      }

      verifyPin(){
          this.setState({verifyPinModal : false, nextTrip : true })
      }

      componentDidMount(){
        this.setState({
          packages : this.props.route.params.packages,
          totTrips :  this.props.route.params.packages.length
        })
      }

      arrived(){
        this.setState({verifyPinModal : true })
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
        this.setState({nextTrip : false })
      }

  render(){

    const packs = this.state.packages.map((val, indx) =>{
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
        {this.state.packages.length > 0 ? 
        <View style={Style.routeTxt}>
            <Text style={{fontSize: 20}}>{this.state.packages[0].order_id}</Text>
        </View>
        :
        <View></View> }

        <View style={Style.packsBody2}>
              <ScrollView style={{marginBottom: 30}}>
              {packs}
              </ScrollView>
        </View>
        {this.state.packages.length > 0 ? 
      <View style={Style.alignRoute}>
            <View style={{marginBottom: 15}}>
                <Text>Current Trip (1/{this.state.totTrips})</Text>
            </View>
            <View style={Style.routeCard}>
                     <View style={Style.routeCardContent}>
                      <Image style={Style.routerImg} source={Box} />
                    </View>
                    <View style={Style.routeCardContent2}>
                      <Text style={Style.nameTXT}>{this.state.packages[0].booking_name}</Text>
                      <Text style={Style.detailsTXT}>REF: {this.state.packages[0].booking_ref}</Text>
                      <Text style={Style.detailsTXT}>{this.state.packages[0].do_location}</Text>
                    </View>

                    <View style={Style.alignRoute}>
                        <Text></Text>
                        <Text style={{fontSize: 11}}>Message/ Special Instructions/ Packages</Text>
                        <View style={Style.routerText}>
                            <TouchableOpacity style={Style.txtBorder} onPress={()=>{this.setState({showModal: true})}}>
                            <Text>{this.state.packages[0].instructions}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={Style.callbtn} onPress={()=>{Linking.openURL(`tel:${this.state.packages[0].cellphone}`)}}>
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
        {this.state.packages.length > 0 ? 
            <View style={Style.body}>
            <View style={Style.routeTxt}>
                <TouchableOpacity style={Style.backBtn} onPress={()=>{this.setState({showModal: false})}}>
                    <Text>Back</Text>
                </TouchableOpacity>
                <Text style={{fontSize: 20}}>{this.state.packages[0].booking_name}</Text>
            </View>
                <Text style={{textAlign:'center', marginTop: 20}}>Special Instructions</Text>
                <Text style={{textAlign:'center', marginTop: 20, width:'97%', marginLeft: 5}}>{this.state.packages[0].instructions}</Text>
            </View>
            :
            <View></View> }
        </Modal>

        <Modal visible={this.state.verifyPinModal} animationType='slide'>
            <View style={Style.body} > 
            
            <View  style={{justifyContent:'center', alignContent:'center', alignItems:'center', marginTop: '50%', width: '96%'}}>
            <Text>Ask Julius for the PIN before you can hand them the package.</Text>
            <Text></Text>
            <Text>REF: 1SLF5H1N4G</Text>
            <Text></Text>
            <TextInput keyboardType='number-pad' style={Style.input} placeholder="Pin" />
            </View>
            
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