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
        marginLeft : width * 0.10,
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

    routeCardContent :{
        marginTop : height * 0.018,
        marginLeft : width * 0.02,
    },

    routeCardContent2 :{
        position:'absolute',
        marginTop : height * 0.025,
        marginLeft : width * 0.24,
    },

    routerImg :{
        width : 70,
        height : 70,
        borderRadius : 70 / 2
    },
    routerImg2 :{
        width : 55,
        height : 55,
        borderRadius : 55 / 2
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

    SelectedCircle : {
        backgroundColor: '#ffe200',
        height : 40,
        width: 40,
        borderRadius: 40/2
    },
    
    packsBody : {
        height: height * 0.9
    },
    packsBody2 : {
        height: height * 0.4,
        opacity: 0.5,
        backgroundColor: '#F2F2F2',
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
       flexDirection: 'row'
    },
    routeTxt :{
        width: width,
        height : height * 0.1,
        backgroundColor: '#FFFFFF',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    arriveBtn :{
        marginLeft: width * 0.1,
        width : width * 0.4,
        backgroundColor: '#ffe200',
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
        height : height * 0.07,
        justifyContent: 'center',
        alignItems: 'center',
    },

    returnBtn :{
        alignSelf: 'flex-end',
        width : width * 0.4,
        backgroundColor: '#333333',
        borderBottomRightRadius: 20,
        borderTopRightRadius: 20, 
        height : height * 0.07,
        alignItems: 'center',
        justifyContent: 'center',
    },

    
  routeCard :{
      width : width * 0.9,
      height: height * 0.3,
      backgroundColor: '#FFFFFF',
  },

  alignRoute :{
    marginLeft: width * 0.05,
  },

  routerText :{
      marginTop: 10,
    width: width * 0.8,
    backgroundColor: '#F2F2F2',
    height : height * 0.06,
    borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        borderTopRightRadius: 20, 
        justifyContent: 'flex-start',
  },
  txtBorder :{
      borderWidth: .25,
      marginTop: 10,
      marginLeft: 10,
      width: width * 0.55,
      height: height * 0.03,
      borderTopLeftRadius: 20,
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
      borderTopRightRadius: 20, 
  },

  callbtn :{
      position: 'absolute',
      alignSelf:'flex-end',
      marginTop: -10,
  },

  backBtn :{
      position: 'absolute',
      left: 10
  },

  input:{
    width: width * 0.8,
    height: 38,
    borderWidth: .5,
  },

  nextTrip :{
    flex: 1,
    backgroundColor: '#FFFFFF',
    height: totHeight * 0.4,
    width: width,
  },

  tripNext :{
    opacity: 0.4,
    backgroundColor: 'black',
    bottom: 0,
    width: width,
    height : totHeight * 0.6,
  },

  alignPinItems: {
      marginTop: 20,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center'
  },

  loginBody :{
    width: width,
    height : height * 0.65,
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 30,
    borderBottomEndRadius: 30
  },

  loginInput :{
    backgroundColor: '#F2F2F2',
    width: width * 0.9,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderTopRightRadius: 20,
    marginTop: 10,
    marginBottom: 10 
  },

  alignLogin :{
    marginLeft: width * 0.05,
    marginTop: height * 0.4
  },

  loginAlignBtn :{
      flexDirection:'row',
      marginTop: 30,
      marginLeft: 20
  },

  loginBtn :{
    width : width * 0.4,
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
    marginLeft: width * 0.06
  }, 

  loginImg :{
      position:'absolute',
      marginLeft: width * 0.3,
      marginTop: -height * 0.22
  }

})