import React,{Component} from 'react';
import { Modal,ActivityIndicator, View, Dimensions} from 'react-native';
const d_width = Dimensions.get('window').width;
const d_height = Dimensions.get('window').height;

export default class LoadingModal extends Component{
    constructor(){
        super();
        this.state ={
            isLoading: false
        }
    }

    showModal = () =>{
        this.setState({isLoading: true})
    }

    dismissModal = () =>{
        this.setState({isLoading: false})
    }

    render(){
        return(
                <Modal visible={this.state.isLoading}  animationType="slide" transparent={true}>
                    <View style={{flex:1, backgroundColor:'#ffffff', height: d_height, opacity:0.5}}>
                     <ActivityIndicator style={{marginTop: d_height * 0.50, fontSize:90}} size={d_height * 0.10} color="black" />
                </View> 
                </Modal> 
        )
    }

}