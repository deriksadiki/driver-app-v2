import React from 'react'
import Style from '../Style/Style';

import { View, Text, StatusBar, TouchableOpacity, Image , ScrollView} from 'react-native';
 
export default class AddPacks extends React.Component{

    constructor(){
        super()
        this.state = {
          test : [0, 1, 2, 3, 4,5, 6,7,8,9,19,3,3,3,3],
          selectedPacks : [],
          packsArray : []
        }
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
              tempArr.push(this.state.test[this.state.selectedPacks[x]]);
          }

          if (tempArr.length > 0){
            this.props.navigation.navigate('enroute');
          }else{
              alert('Please select packs before you can start the delivery')
          }
      }

  render(){
    const packs = this.state.test.map((val, indx) =>{
        return(
          <TouchableOpacity style={Style.card} key={indx} onPress={() =>{this.selectPack(val, indx)}}>
                    <View style={Style.cardContent}>
                      <View style={ this.state.selectedPacks.indexOf(indx) >= 0 ? Style.SelectedCircle : Style.circle}></View>
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