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
    },

    pinBody : {
        position: 'absolute',
        bottom: 15,
        width: width * 0.86,
        height : height * 0.18,
        backgroundColor: '#FFFFFF',
        marginLeft : width * 0.07,
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        borderTopRightRadius: 20, 
        alignItems: 'center'
    }, 

    pinMainBody:{
        marginTop: height * 0.3,
        alignItems: 'center',
        width: width * 0.8,
        alignSelf: 'center'
    },

    addPackstext :{
        marginTop: height * 0.02,
        width: width * 0.9,
        marginLeft : width * 0.05,
    },

    circle : {
        backgroundColor: '#dbdbdb',
        height : 40,
        width: 40,
        borderRadius: 40/2
    },
    
    packsBody : {
        height: height * 0.9
    },

    packsTxt : {
        marginLeft : width * 0.05,
        marginTop: height * 0.01
    },
    btn :{
        width : width * 0.6,
        backgroundColor: '#ffe200',
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        borderTopRightRadius: 20, 
        height : height * 0.07,
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: width * 0.2
    },

    bottomBtn : {
        position: 'absolute',
        bottom: 10,
    }
})