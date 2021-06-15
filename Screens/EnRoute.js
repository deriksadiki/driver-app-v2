import React from 'react'
import Style from '../Style/Style';
import {View, Text, StatusBar, TouchableOpacity, Image , ScrollView, Modal, TextInput, Alert} from 'react-native';
import Box from '../Images/box.png';
import Call from '../Images/call.png';
import Loc from '../Images/loc.png'
 
export default class EnRoute extends React.Component{

    constructor(){
        super()
        this.state = {
          test : [0, 1, 2, 3, 4,5, 6,7,8,9,19,3,3,3,3],
          selectedPacks : [],
          packsArray : [],
          showModal : false,
          verifyPinModal : false 
        }
      }

      verifyPin(){
          this.setState({verifyPinModal : false })
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

  render(){

    const packs = this.state.test.map((val, indx) =>{
        return(
          <TouchableOpacity disabled={true} style={Style.card} key={indx}>
                    <View style={Style.cardContent}>
                      <Image style={Style.boxImg} source={Box} />
                    </View>
                    <View style={Style.cardContent2}>
                      <Text style={Style.nameTXT}>6654FGTH</Text>
                      <Text style={Style.detailsTXT}>5km</Text>
                    </View>
                </TouchableOpacity>
        )
      })

    return(
        <View style={Style.body}>
            <StatusBar backgroundColor="black" />
        <View style={Style.routeTxt}>
            <Text style={{fontSize: 20}}>GHGGHV8764</Text>
        </View>

        <View style={Style.packsBody2}>
              <ScrollView style={{marginBottom: 30}}>
              {packs}
              </ScrollView>
        </View>

      <View style={Style.alignRoute}>
            <View style={{marginBottom: 15}}>
                <Text>Current Trip (1/5)</Text>
            </View>
            <View style={Style.routeCard}>
                     <View style={Style.routeCardContent}>
                      <Image style={Style.routerImg} source={Box} />
                    </View>
                    <View style={Style.routeCardContent2}>
                      <Text style={Style.nameTXT}>Jabulani Malema</Text>
                      <Text style={Style.detailsTXT}>REF: 22121FGB</Text>
                      <Text style={Style.detailsTXT}>Johannesburg, Roodepoort, 13 leghorn road, princess</Text>
                    </View>

                    <View style={Style.alignRoute}>
                        <Text></Text>
                        <Text style={{fontSize: 11}}>Message/ Special Instructions/ Packages</Text>
                        <View style={Style.routerText}>
                            <TouchableOpacity style={Style.txtBorder} onPress={()=>{this.setState({showModal: true})}}>
                            <Text>  ask for marry at the end of the road</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={Style.callbtn}>
                                <Image style={Style.routerImg2} source={Call} />
                            </TouchableOpacity>
                        </View>
                    </View>
            </View>
     </View>
        

        <View style={Style.bottomBtn}>
            <TouchableOpacity style={Style.arriveBtn} onPress={()=>{this.arrived()}}>
                <Text>Arrived</Text>
            </TouchableOpacity>
            <TouchableOpacity style={Style.returnBtn} onPress={()=>{this.return()}}>
                <Text style={{color: '#ffe200'}}>Return</Text>
            </TouchableOpacity>
        </View>

        <Modal visible={this.state.showModal} animationType='slide'>
            <View style={Style.body}>
            <View style={Style.routeTxt}>
                <TouchableOpacity style={Style.backBtn} onPress={()=>{this.setState({showModal: false})}}>
                    <Text>Back</Text>
                </TouchableOpacity>
                <Text style={{fontSize: 20}}>Nelo Mandela</Text>
            </View>
                <Text style={{textAlign:'center', marginTop: 20}}>Special Instructions</Text>
                <Text style={{textAlign:'center', marginTop: 20, width:'97%', marginLeft: 5}}>Text messages are used for personal, family, business and social purposes. Governmental and non-governmental organizations use text messaging for communication between colleagues. In the 2010s, the sending of short informal messages became an accepted part of many cultures, as happened earlier with emailing.[1] This makes texting a quick and easy way to communicate with friends, family and colleagues, including in contexts where a call would be impolite or inappropriate (e.g., calling very late at night or when one knows the other person is busy with family or work activities). Like e-mail and voicemail and unlike calls (in which the caller hopes to speak directly with the recipient), texting does not require the caller and recipient to both be free at the same moment; this permits communication even between busy individuals. Text messages can also be used to interact with automated systems, for example, to order products or services from e-commerce websites, or to participate in online contests. Advertisers and service providers use</Text>
            </View>
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

      </View>
    )
  }
}