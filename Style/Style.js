import react from 'react';
import {Dimensions, StyleSheet} from 'react-native';
const width = Dimensions.get('screen').width;
const height = Dimensions.get('window').height;
const totHeight = Dimensions.get('screen').height;

var faded = '#f2f2f2';
export default styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: '#F2F2F2',
    height: totHeight,
    width: width,
  },

  header: {
    backgroundColor: '#FFFFFF',
    height: height * 0.18,
    width: width,
    borderBottomLeftRadius: 30,
    borderBottomEndRadius: 30,
  },

  image: {
    height: 80,
    width: 80,
    borderRadius: 80 / 2,
  },

  imageAlign: {
    marginLeft: width * 0.05,
    marginTop: height * 0.03,
  },

  headerText: {
    position: 'absolute',
    marginLeft: width * 0.3,
    marginTop: height * 0.04,
  },

  statusText: {
    position: 'absolute',
    marginTop: height * 0.085,
    marginLeft: width * 0.1,
  },

  nameTXT: {
    fontSize: 14,
    fontWeight: '900',
  },

  detailsTXT: {
    fontSize: 12,
    opacity: 0.5,
  },

  card: {
    backgroundColor: '#FFFFFF',
    height: height * 0.09,
    width: width * 0.9,
    marginLeft: width * 0.05,
    marginTop: height * 0.03,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderTopRightRadius: 20,
  },

  boxImg: {
    width: 45,
    height: 45,
  },

  cardContent: {
    marginTop: height * 0.015,
    marginLeft: width * 0.02,
  },

  routeCardContent: {
    marginTop: height * 0.018,
    marginLeft: width * 0.02,
  },

  routeCardContent2: {
    position: 'absolute',
    marginTop: height * 0.025,
    marginLeft: width * 0.24,
  },

  routerImg: {
    width: 70,
    height: 70,
    borderRadius: 70 / 2,
  },
  routerImg2: {
    width: 55,
    height: 55,
    borderRadius: 55 / 2,
  },

  cardContent2: {
    position: 'absolute',
    marginTop: height * 0.015,
    marginLeft: width * 0.15,
  },

  heading: {
    marginTop: height * 0.025,
    marginLeft: width * 0.05,
  },

  pinBody: {
    position: 'absolute',
    bottom: 15,
    width: width * 0.86,
    height: height * 0.18,
    backgroundColor: '#FFFFFF',
    marginLeft: width * 0.07,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderTopRightRadius: 20,
    alignItems: 'center',
  },

  pinMainBody: {
    marginTop: height * 0.3,
    alignItems: 'center',
    width: width * 0.8,
    alignSelf: 'center',
  },

  addPackstext: {
    marginTop: height * 0.02,
    width: width * 0.9,
    marginLeft: width * 0.05,
  },

  packsBody: {
    height: height * 0.9,
  },
  packsBody2: {
    height: height * 0.4,
    opacity: 0.5,
    backgroundColor: '#F2F2F2',
  },

  packsTxt: {
    marginLeft: width * 0.05,
    marginTop: height * 0.01,
  },
  btn: {
    width: width * 0.6,
    backgroundColor: '#ffe200',
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderTopRightRadius: 20,
    height: height * 0.07,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: width * 0.2,
  },

  bottomBtn: {
    position: 'absolute',
    bottom: 10,
    flexDirection: 'row',
  },
  routeTxt: {
    width: width,
    height: height * 0.1,
    backgroundColor: '#FFFFFF',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  arriveBtn: {
    marginLeft: width * 0.1,
    width: width * 0.4,
    backgroundColor: '#ffe200',
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    height: height * 0.07,
    justifyContent: 'center',
    alignItems: 'center',
  },

  returnBtn: {
    alignSelf: 'flex-end',
    width: width * 0.4,
    backgroundColor: '#333333',
    borderBottomRightRadius: 20,
    borderTopRightRadius: 20,
    height: height * 0.07,
    alignItems: 'center',
    justifyContent: 'center',
  },

  routeCard: {
    width: width * 0.9,
    height: height * 0.3,
    backgroundColor: '#FFFFFF',
  },

  alignRoute: {
    marginLeft: width * 0.05,
  },

  routerText: {
    marginTop: 10,
    width: width * 0.8,
    backgroundColor: '#F2F2F2',
    height: height * 0.06,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderTopRightRadius: 20,
    justifyContent: 'flex-start',
  },
  txtBorder: {
    borderWidth: 0.25,
    marginTop: 10,
    marginLeft: 10,
    width: width * 0.55,
    height: height * 0.03,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderTopRightRadius: 20,
  },

  callbtn: {
    position: 'absolute',
    alignSelf: 'flex-end',
    marginTop: -10,
  },

  backBtn: {
    position: 'absolute',
    left: 10,
  },

  input: {
    width: width * 0.8,
    height: height * 0.07,
    borderWidth: 0.5,
  },

  nextTrip: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    height: totHeight * 0.4,
    width: width,
  },

  tripNext: {
    opacity: 0.4,
    backgroundColor: 'black',
    bottom: 0,
    width: width,
    height: totHeight * 0.6,
  },

  alignPinItems: {
    marginTop: 20,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },

  loginBody: {
    width: width,
    height: height * 0.55,
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 30,
    borderBottomEndRadius: 30,
  },

  loginInput: {
    backgroundColor: '#F2F2F2',
    width: width * 0.9,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderTopRightRadius: 20,
    marginTop: 10,
    marginBottom: 10,
  },

  alignLogin: {
    marginLeft: width * 0.05,
    marginTop: height * 0.3,
  },

  loginAlignBtn: {
    flexDirection: 'row',
    marginTop: 35,
    marginLeft: 20,
  },

  loginBtn: {
    width: width * 0.4,
    backgroundColor: '#ffe200',
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderTopRightRadius: 20,
    height: height * 0.07,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: width * 0.06,
  },

  loginImg: {
    position: 'absolute',
    marginLeft: width * 0.3,
    marginTop: -height * 0.17,
  },

  //   Start of Leo's Styling
  // Login page
  outerContainer: {
    flex: 1,
    backgroundColor: '#f2f2f2',
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

  communicado: {
    backgroundColor: 'white',
    flexDirection: 'row',
    padding: 20,
    borderRadius: 20,
  },

  atTheBottom: {
    margin: 20,
    flexDirection: 'row',
  },
  aboutClient: {
    // backgroundColor: 'red',
    flex: 1,
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
});
