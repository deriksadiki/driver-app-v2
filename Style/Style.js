import react from 'react'
import { Dimensions, StyleSheet } from 'react-native'
const width = Dimensions.get('screen').width
const height = Dimensions.get('window').height
const totHeight =  Dimensions.get('screen').height

export default styles =  StyleSheet.create({

    body :{
        flex: 1,
        backgroundColor: '#F2F2F2',
        height: totHeight,
        width: width,
    },

    header :{
        backgroundColor: '#FFFFFF',
        height: height * 0.18,
        width: width,
        borderBottomLeftRadius: 30,
        borderBottomEndRadius: 30
    },

    image :{
        height: 80,
        width: 80,
        borderRadius: 80 / 2
    },

    imageAlign :{
        marginLeft : width * 0.05,
        marginTop : height * 0.03 
    },

    headerText:{
        position: 'absolute',
        marginLeft : width * 0.3,
        marginTop : height * 0.04

    },

    statusText : {
        position: 'absolute',
        marginTop : height * 0.085,
        marginLeft : width * 0.12,
    },

    nameTXT:{
        fontSize : 14,
        fontWeight: '900'
    },

    detailsTXT :{
        fontSize: 12,
        opacity: 0.5
    },

    card :{
        backgroundColor: '#FFFFFF',
        height: height * 0.09,
        width: width * 0.9,
        marginLeft : width * 0.05,
        marginTop: height * 0.03,
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        borderTopRightRadius: 20
    },

    boxImg :{
        width : 45,
        height : 45 
    },

    cardContent : {
        marginTop : height * 0.015,
        marginLeft : width * 0.02,
    },

    cardContent2 : {
        position:'absolute',
        marginTop : height * 0.015,
        marginLeft : width * 0.15,
    },

    heading:{
        marginTop : height * 0.025,
        marginLeft : width * 0.05,
    }

})