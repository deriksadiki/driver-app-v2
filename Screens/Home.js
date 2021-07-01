import React from 'react'
import { View, Text, TouchableOpacity, StatusBar, Image, Switch, ScrollView} from 'react-native';
import Style from '../Style/Style';
import Box from '../Images/box.png';
import Geolocation from 'react-native-geolocation-service';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

 let counter = 0;
 let tempArray = new Array();
export default class Home extends React.Component{
  constructor(){
    super()
    this.state = {
      isEnabled : false,
      text: 'Offline',
      reqArray : [],
      current_location : '',
      current_coords : null, 
      driverObject : null
    }
  }

  changeStatus(){
    if (!this.state.isEnabled){
      this.setState({isEnabled : true, text: 'Online'})
    }else{
      this.setState({isEnabled : false, text: 'Offline'})
    }
  }

  selectReq(val){
    this.props.navigation.navigate('verify', {pack : val, location: this.state.current_coords, driverObject: this.state.driverObject});
  }

  componentDidMount(){
    this.getDriverDetails()
    this.trackDriver();
  }

  getDriverDetails(){
    let user = auth().currentUser;
    database().ref('drivers/' + user.uid).once('value', data =>{
      this.setState({driverObject : data.val()})
    })
  }

  checkPacksSelection(){ 
    database().ref('apiReq/').once('value', data =>{
      if (data.val() != null || data.val() != undefined){
        let details = data.val();
        let keys =  Object.keys(details);
        for (var x = 0; x < keys.length; x++){
          if (details[keys[x]].selected && details[keys[x]].driverId === auth().currentUser.uid){
            let obj  = details[keys[x]];
            obj.parentKey = keys[x]
            if (details[keys[x]].verified){
                this.gotToPacks(obj)
                break;
            }else{
              this.selectReq(obj);
              break;
            }
          }
        }
      }
    })
  }

  gotToPacks(obj){
    if (obj.selectedPacks){
      this.goToMainScreen(obj);
    }else{
      this.props.navigation.navigate('addPacks', {driverObject: this.state.driverObject, packs : obj});
    }
    
  }

  goToMainScreen(obj){
    this.setState({
      packsKeys : obj.reqKeys
    }, ()=>{
      this.getPacks(this.state.packsKeys[counter]);
    })
  }

  getPacks(key){
    database().ref('newReq/' + key).once('value', data =>{
      let details = data.val();
      details.key = key
      tempArray.push(details);
    }).then(() =>{
      counter++;
      if (counter === this.state.packsKeys.length){
        this.pushPacks(tempArray)
      }else{
        this.getPacks(this.state.packsKeys[counter])
      }
    }) 
}

pushPacks(tempArr){
  this.props.navigation.navigate('enroute', {packages : tempArr});
}


  getRequests(){
    database().ref('apiReq/').on('value', data =>{
      if (data.val() != null || data.val() != undefined){
        let tempArr =  new Array();
        let details = data.val();
        let keys =  Object.keys(details);
        for (var x = 0; x < keys.length; x++){
          if (!details[keys[x]].selected){
            let obj  = details[keys[x]];
            obj.parentKey = keys[x]
            tempArr.push(obj);
          }
        }
       this.setState({reqArray : tempArr})
      }
    })
  }

  trackDriver(){
     Geolocation.getCurrentPosition(info => {
        let location =  info.coords.latitude + ',' + info.coords.longitude; 
        this.setState({current_coords : location}, ()=>{
          this.getRequests();
          this.checkPacksSelection();
          this.getAddress(location)
        })
    },
    (error) => {
        //(error.code, error.message);
     },
   {enableHighAccuracy: true, timeout: 25000, maximumAge: 2000, distanceFilter: 0,forceRequestLocation: true})
    setTimeout(() => {
        this.trackDriver()
    }, 120000);
 }

 async getAddress(coords){
  // const key = 'AIzaSyDDMIizZ49AcXojEeG1Qmckb-uduyvX6hY';
  // const url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng='+coords+'&key='+key;
  // const xhr = new XMLHttpRequest();
  // xhr.open('GET', url, true);
  // xhr.responseType = 'json';
  // xhr.onreadystatechange=()=>{
  //     if(xhr.readyState == '4'){
  //         const json = xhr.response;
  //         let loc = json.results[0].formatted_address;
  //         let temp = json.results[0].address_components;
  //         for (var x = 0; x < temp.length; x++){
  //            let temp2 = temp[x].types;
  //            for (var i = 0; i < temp2.length; i++){
  //                if (temp2[i] == "administrative_area_level_2"){
  //                    loc = loc.replace('South Africa', temp[x].short_name)
  //                    this.setUpdateDriverLocation(loc, coords)
  //                    break;
  //                }
  //            }
  //         }
  //     }
  // }
  // await xhr.send();
}


setUpdateDriverLocation = async (location, coords) =>{
      this.setState({
          current_location : location
      })
       database().ref(this.state.modeType + '/' + this.state.driverID).update({
        location:location,
        coords: coords,
        name : this.state.name + ' ' + this.state.surname,
        cell : this.state.phone,
        vehicle : this.state.modeType
      })
}

  render(){
    const requests = this.state.reqArray.map((val, indx) =>{
      return(
        <TouchableOpacity style={Style.card} key={indx} onPress={()=>{this.selectReq(val)}}>
                  <View style={Style.cardContent}>
                    <Image style={Style.boxImg} source={Box} />
                  </View>
                  <View style={Style.cardContent2}>
                    <Text style={Style.nameTXT}> {val.id}</Text>
                    <Text style={Style.detailsTXT}> {val.distance}km</Text>
                  </View>
              </TouchableOpacity>
      )
    })
    return(
        <View style={Style.body}>
            <StatusBar backgroundColor="black" />
         
            <View style={Style.header}>
            {this.state.driverObject !== null ?
            <View>
                <View style={Style.imageAlign}>
                     <Image style={Style.image} source={{ uri: this.state.driverObject.img}} />
                </View>
                <View style={Style.headerText}>
                    <Text style={Style.nameTXT}>{this.state.driverObject.firstName} {this.state.driverObject.surname}</Text>
                    <Text style={Style.detailsTXT}>{this.state.driverObject.totalTrips} Trips</Text>
                    <Text style={Style.detailsTXT}>Rating 5</Text>
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
                  :
                  <View></View>
                  }
            </View>
            {this.state.isEnabled ? 
            <View>
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

            :
            <View>
              <View style={{alignContentL:'center', alignItems:'center', marginTop: '60%'}}>
                <Text>You will not be able to receive requests when you have disabled
connection to our servers. To receive request, toggle the online switch or click "Reconnect"</Text>
                </View>
            </View>
            }

        </View>
    )
  }
}   