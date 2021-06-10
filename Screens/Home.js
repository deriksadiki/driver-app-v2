import React from 'react'
import { View, Text, TouchableOpacity, StatusBar, Image, Switch, ScrollView} from 'react-native';
import Style from '../Style/Style';
import Box from '../Images/box.png';

 
export default class Home extends React.Component{
  constructor(){
    super()
    this.state = {
      isEnabled : false,
      text: 'Offline',
      test : [0, 1, 2, 3, 4,5, 6,7,8,9,19,3,3,3,3]
    }
  }

  changeStatus(){
    if (!this.state.isEnabled){
      this.setState({isEnabled : true, text: 'Online'})
    }else{
      this.setState({isEnabled : false, text: 'Offline'})
    }
  }

  render(){
    const requests = this.state.test.map((val, indx) =>{
      return(
        <TouchableOpacity style={Style.card} key={indx}>
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
            <View style={Style.header}>
                <View style={Style.imageAlign}>
                     <Image style={Style.image} source={{ uri: "https://media.vanityfair.com/photos/5ff69600c97c041ce0e7ac0d/master/pass/1230086798"}} />
                </View>
                <View style={Style.headerText}>
                    <Text style={Style.nameTXT}>Jabulani Masuku</Text>
                    <Text style={Style.detailsTXT}>1220 Trips</Text>
                    <Text style={Style.detailsTXT}>Rating 4.9</Text>
                        <Switch
                        style={{width: 40}}
                        trackColor={{ false: "#767577", true: "#81b0ff" }}
                        thumbColor={this.state.isEnabled ? "#f5dd4b" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={()=>{this.changeStatus()}} 
                        value={this.state.isEnabled}  
                      />
                      <View style={Style.statusText}>
                          <Text style={Style.detailsTXT}>{this.state.text}</Text>
                      </View>
                </View>
  
            </View>
            <View style={Style.heading}>
              <Text style={Style.nameTXT}>Requests</Text>
              <Text></Text>
            </View>

            <View>
              <ScrollView style={{marginBottom: 120}}>
              {requests}
              </ScrollView>
            </View>
        </View>
    )
  }
}   