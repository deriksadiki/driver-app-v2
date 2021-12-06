import react from 'react';
import {Dimensions, StyleSheet} from 'react-native';
const width = Dimensions.get('screen').width;
const height = Dimensions.get('window').height;
const totHeight = Dimensions.get('screen').height;

var faded = '#f2f2f2';
export default styles = StyleSheet.create({
  //   Start of Leo's Styling
  // Login page
  outerContainer: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  outerContainer1: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0, 0.5)',
  },
  topArea: {
    height: height * 0.58,
    backgroundColor: 'white',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    padding: 20,
    position: 'relative',
  },
  loginForm: {
    alignItems: 'center',
  },
  logoImage: {
    marginBottom: 40,
  },
  loginInputs: {
    position: 'absolute',
    bottom: 10,
    width: width,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  loginButtons: {
    position: 'absolute',
    bottom: -60,
    width: width,
    paddingHorizontal: 20,
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  loginButton: {
    backgroundColor: '#ffe200',
    padding: 10,
    borderRadius: 100,
    width: width * 0.4,
    alignItems: 'center',
  },
  forgotPass: {
    paddingVertical: 10,
  },
  myInputs: {
    backgroundColor: 'white',
    width: width - 40,
    borderWidth: 0,
    borderRadius: 1000,
    backgroundColor: faded,
    paddingHorizontal: 15,
    margin: 10,
  },

  // Home screen
  topNav: {
    padding: 20,
    backgroundColor: 'white',
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
  gridder: {
    flexDirection: 'row',
    // backgroundColor: "red",
    alignItems: 'center',
  },
  profilePic: {
    width: 80,
    height: 80,
    borderRadius: 80,
  },
  blankImage: {
    width: 80,
    height: 80,
    borderRadius: 80,
    backgroundColor: '#f2f2f2',
    marginVertical: 8,
  },
  blankInfoName: {
    height: 15,
    width: 200,
    backgroundColor: '#f2f2f2',
    marginBottom: 5,
  },
  blankInfoOther: {
    height: 10,
    width: 40,
    backgroundColor: '#f2f2f2',
    marginBottom: 5,
  },
  blankInfoSwitch: {
    height: 10,
    width: 80,
    backgroundColor: '#f2f2f2',
    marginBottom: 5,
  },
  driverInfo: {
    padding: 10,
    // backgroundColor: "red",
    width: width - 120,
  },
  flexThis: {
    flexDirection: 'row',
  },
  onlineStatus: {
    marginTop: 5,
  },
  scrollContent: {
    flex: 1,
    paddingTop: 10,
    //   backgroundColor: "red",
    //   padding: 15
  },
  emptyStuff: {
    flex: 1,
    //   backgroundColor: "red",
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  tripItem: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 25,
    flexDirection: 'row',
  },
  itemContent: {
    // backgroundColor: "red",
    flex: 1,
    padding: 5,
  },

  // Verify PIN Code
  inTransitContent: {
    padding: 20,
    flex: 1,
    // backgroundColor: "white",
    justifyContent: 'center',
    alignItems: 'center',
  },
  information: {
    // backgroundColor: "red",
    padding: 10,
  },
  absoluteCard: {
    padding: 20,
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 20,
    width: width - 40,
    borderRadius: 20,
    alignItems: 'center',
  },
  cancelBtn: {
    position: 'absolute',
    top: -40,
    right: 0,
    opacity: 0,
  },
  theBtn: {
    padding: 5,
    paddingHorizontal: 10,
    // backgroundColor: "white",
    borderWidth: 1,
    borderColor: 'red',
    borderRadius: 100,
  },

  // Add Pack Stying

  topContent: {
    flex: 1,
    paddingTop: 40,
  },
  startBtn: {
    width: width - 100,
    marginHorizontal: 30,
  },
  dot: {
    width: 35,
    justifyContent: 'center',
  },
  circle: {
    backgroundColor: '#dbdbdb',
    height: 26,
    width: 26,
    borderRadius: 40 / 2,
  },

  SelectedCircle: {
    backgroundColor: '#ffe200',
    height: 26,
    width: 26,
    borderRadius: 40 / 2,
  },

  // EnRoute Styling
  inTransitSection: {
    // backgroundColor: 'red',
  },

  superWhite: {
    backgroundColor: 'white',
    // flex: 1,
    width: width,
    height: height,
    position: 'relative',
  },
  toTop: {
    // backgroundColor: 'green',
    flex: 0.15,
    justifyContent: 'center',
    alignItems: 'center',
  },

  toBottom: {
    backgroundColor: '#f2f2f2',
    flex: 1,
    width: width,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    padding: 20,
    position: 'relative',
    justifyContent: 'flex-end',
  },

  atTheBottom: {
    margin: 20,
    flexDirection: 'row',
  },
  communicado: {
    backgroundColor: 'white',
    // flexDirection: 'column',
    // justifyContent: 'center',
    padding: 20,
    paddingBottom: 30,
    borderRadius: 20,
  },
  aboutClient: {
    // backgroundColor: 'green',
    // flex: 1,
    flexDirection: 'row',
  },
  profile: {
    backgroundColor: '#f2f2f2',
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  profileAbout: {
    flex: 1,
    // backgroundColor: 'green',
    paddingLeft: 10,
    justifyContent: 'center',
  },
  addressLine: {
    flexDirection: 'row',
  },
  specialInstructions: {
    // padding: 10,
    // backgroundColor: 'green',
    position: 'relative',
  },
  instructions: {
    padding: 10,
    backgroundColor: '#F2F2F2',
    borderRadius: 20,
  },
  callButton: {
    // width: 50,
    // height: 50,
    backgroundColor: '#C2C2C2',
    // padding: 2,
    borderRadius: 50,
    position: 'absolute',
    right: 0,
    transform: [{translateY: -8}],
  },
  chatter: {
    backgroundColor: 'white',
    paddingVertical: 5,
    paddingHorizontal: 10,
    maxWidth: '80%',
    borderWidth: 0.5,
    borderColor: '#333333',
    alignSelf: 'flex-start',
    borderRadius: 5,
  },
  noChat: {
    // backgroundColor: 'white',
    paddingVertical: 5,
    paddingHorizontal: 10,
    width: '80%',
    // borderWidth: 0.5,
    // borderColor: '#333333',
    alignSelf: 'flex-start',
    borderRadius: 5,
  },

  // Verify pin modal
  daBottom: {
    backgroundColor: 'white',
    padding: 20,
    // paddingBottom: 100,
    position: 'absolute',
    bottom: 0,
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  textInput: {
    backgroundColor: '#f2f2f2',
    width: width * 0.8,
    marginVertical: 10,
    borderRadius: 100,
  },
  btnVerify: {
    backgroundColor: '#ffe200',
    padding: 10,
    width: width * 0.5,
    borderRadius: 100,
    alignItems: 'center',
    marginVertical: 10,
    alignSelf: 'center',
  },

  // Special instructrions bar
  navBar: {
    backgroundColor: 'white',
    // padding: 10,
    flexDirection: 'row',
  },
  bckBtn: {
    padding: 20,
    // backgroundColor: 'red',
    position: 'absolute',
    zIndex: 10,
    top: 0,
    left: 0,
  },
  personName: {
    padding: 20,
    // backgroundColor: 'green',
    flex: 1,
    alignItems: 'center',
  },
  theInstructions: {
    // backgroundColor: 'red',
    flex: 1,
  },
  textChat: {
    borderWidth: 0.5,
    borderColor: '#cccccc',
    marginHorizontal: 20,
    padding: 5,
    alignSelf: 'flex-start',
    maxWidth: width * 0.84,
    borderRadius: 10,
    backgroundColor: 'white',
    borderTopLeftRadius: 0,
  },

  // Next trip page
  verifiedTrip: {
    padding: 40,
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 0,
    width: width,
  },
  checkMark: {
    // width: 100,
    // height: 100,
    alignSelf: 'center',
  },
});
