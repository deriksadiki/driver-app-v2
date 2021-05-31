import React from 'react'

import { View, Text, TouchableOpacity} from 'react-native';
 
export default class Home extends React.Component{

  render(){
    return(
      <View>
        <Text>hello Home page</Text>
        <TouchableOpacity onPress={()=>this.props.navigation.navigate('History')}>
            <Text>go to past</Text>
        </TouchableOpacity>
      </View>
    )
  }
}