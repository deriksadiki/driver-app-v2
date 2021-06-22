import React from 'react'
import Style from '../Style/Style';
import database from '@react-native-firebase/database';
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
        }
      }

      componentDidMount(){
        this.setState({
          packs : this.props.route.params.packs,
          driverObject : this.props.route.params.driverObject,
          packsKeys : this.props.route.params.packs.reqKeys
        }, ()=>{
          this.getPacks(this.state.packsKeys[counter]);
        })
    }

    getPacks(key){
          database().ref('newReq/' + key).once('value', data =>{
            let details = data.val();
            details.key = key
            tempArr.push(details);
          }).then(() =>{
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
    
      startTrip(){
          let tempArr =  new Array();
          for (var x = 0; x < this.state.selectedPacks.length; x++){
              tempArr.push(this.state.allPacks[this.state.selectedPacks[x]]);
           }
          if (tempArr.length > 0){
            this.props.navigation.navigate('enroute', {packages : tempArr});
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
        <Text style={Style.packsTxt}>Packages (6)</Text>
       <View style={Style.packsBody}>
              <ScrollView style={{marginBottom: 130}}>
              {packs}
              </ScrollView>
        </View>

        <View style={Style.bottomBtn}>
                <TouchableOpacity style={Style.btn} onPress={()=>{this.startTrip()}}>
                    <Text>Start</Text>
                </TouchableOpacity>
        </View>

      </View>
    )
  }
}