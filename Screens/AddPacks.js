import React from 'react'
import Style from '../Style/Style';
import database, { firebase } from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import { View, Text, StatusBar, TouchableOpacity, Image , ScrollView, Alert} from 'react-native';
 
let counter = 0;
let tempArr = new Array();
export default class AddPacks extends React.Component{

    constructor(){
        super()
        this.state = {
          allPacks : [],
          selectedPacks : [],
          packsArray : [],
          packs : []
        }
      }

      componentDidMount(){
        this.setState({
          packs : this.props.route.params.packs,
          driverObject : this.props.route.params.driverObject,
          packsKeys : this.props.route.params.packs.reqKeys
        }, ()=>{
          console.log(this.state.packs)
          this.getPacks(this.state.packsKeys[counter]);
        })
    }

    getPacks(key){
      
      var today = new Date();
      var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
      var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      var dateTime = date+' '+time;
      let pinx =Math.floor(Math.random(100000000 - 100) * 100000000);
          database().ref('newReq/' + key).once('value', data =>{
            let details = data.val();
            details.key = key
            details.pickup_date = dateTime
            details.returnPin = pinx
            details.mainKey = this.state.packs.parentKey;
            details.returnPackage = false;
            tempArr.push(details);
          }).then(() =>{
            database()
              .ref('newReq/' + key)
              .update({
                pickup_date: dateTime,
                returnPin: pinx,
                returnPackage: false,
              });
            counter++;
            if (counter === this.state.packsKeys.length){
              this.pushPacks(tempArr)
            }else{
              this.getPacks(this.state.packsKeys[counter])
            }
          }) 
    }

    pushPacks(tempArr){
      this.setState({allPacks : tempArr})
    }

      selectPack(val, indx){
          let tempArr = this.state.selectedPacks;
          if (tempArr.length === 0){
            tempArr.push(indx)
            this.setState({selectedPacks: tempArr})
          }else{
              let arr = tempArr;
              let foundState = false;
              for (var x = 0; x < arr.length; x++){
                  if (arr[x] === indx){
                      tempArr.splice(x, 1);
                      foundState = true;
                  }
              }
              if (!foundState){
                tempArr.push(indx)
              }
              this.setState({selectedPacks: tempArr})
          }
      }

      returnPackages(){
        let tempArray = new Array();
        let selectedArr = new Array();
        for (var x = 0; x < this.state.allPacks.length; x++){
          let foundState = false;
          for (var i = 0; i < this.state.selectedPacks.length; i++){
              if (x === this.state.selectedPacks[i]){
                foundState = true;
              }
          }
          if (!foundState){
            tempArray.push(this.state.allPacks[x].key)
          }else{
            selectedArr.push(this.state.allPacks[x].key)
          }
        }
        if (tempArray.length > 0){
          database().ref("apiReq/" + this.state.packs.parentKey).update({reqKeys : selectedArr}).then(() =>{
            this.handleLeftOvers(tempArray)
          })
        }else{
          this.startTrip()
        }
      }
    
      handleLeftOvers(arr){
        database().ref("apiReq/").push({
          locationArray: this.state.packs.locationArray,
          reqKeys: arr,
          packagesNumber: arr.length,
          distance: 20,
          pu_coords: this.state.packs.locationArray.pu_coords,
          verified: false,
          pin: Math.floor(Math.random(100000000 - 100) * 100000000),
          id: Math.floor(Math.random(100000000 - 100) * 100000000),
          selected: false,
        }).then(() =>{
           this.startTrip()
        })
      }
    
      startTrip(){
          let tempArr =  new Array();
          for (var x = 0; x < this.state.selectedPacks.length; x++){
              tempArr.push(this.state.allPacks[this.state.selectedPacks[x]]);
           }
          if (tempArr.length > 0){
            database().ref('apiReq/' +  this.state.packs.parentKey).update({selectedPacks : true}).then(() =>{
              this.props.navigation.navigate('enroute', {packages : tempArr, key : this.state.packs.parentKey});
            })
          }else{
            Alert.alert('', 'Please select packs before you can start the delivery')
          }
      }

  render(){
    const packs = this.state.allPacks.map((val, indx) =>{
        return(
          <TouchableOpacity style={Style.card} key={indx} onPress={() =>{this.selectPack(val, indx)}}>
                    <View style={Style.cardContent}>
                      <View style={ this.state.selectedPacks.indexOf(indx) >= 0 ? Style.SelectedCircle : Style.circle}></View>
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
       <View style={Style.addPackstext}>
           <Text>Please ensure that all of the packages can neatly fit in your vehicle. After loading a package, click its reference to fulfill and return the packages that don't fit.</Text>
       </View>
        <Text style={Style.packsTxt}>Packages ({this.state.allPacks.length})</Text>
       <View style={Style.packsBody}>
              <ScrollView style={{marginBottom: 130}}>
              {packs}
              </ScrollView>
        </View>

        <View style={Style.bottomBtn}>
                <TouchableOpacity style={Style.btn} onPress={()=>{this.returnPackages()}}>
                    <Text>Start</Text>
                </TouchableOpacity>
        </View>

      </View>
    )
  }
}