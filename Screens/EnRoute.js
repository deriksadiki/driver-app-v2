import React from 'react';
import Style from '../Style/Style';
import VIForegroundService from '@voximplant/react-native-foreground-service';
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Image,
  ScrollView,
  Modal,
  TextInput,
  Alert,
  Linking,
  BackHandler,
} from 'react-native';
import Box from '../Images/box.png';
import Call from '../Images/call.png';
import Done from '../Images/done.png';
import Loc from '../Images/loc.png';
import lnkOpen from '../Images/lnk-open.png';
import PhoneIcon from '../Images/call.png';
import axios from 'axios';
import Person from '../Images/person.png';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

export default class EnRoute extends React.Component {
  constructor() {
    super();
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.state = {
      packages: null,
      selectedPacks: [],
      allPackages: [],
      packsArray: [],
      showModal: false,
      verifyPinModal: false,
      nextTrip: false,
      pin: '',
      driverId: '',
      plate: '',
      mode: '',
      name: '',
      returnArray: [],
      returnState: false,
    };
  }

  UNSAFE_componentWillMount() {
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }

  handleBackButtonClick() {
    BackHandler.exitApp();
  }

  verifyPin() {
    if (
      this.state.packages.pu_pin == this.state.pin ||
      this.state.packages.returnPin == this.state.pin
    ) {
      if (this.state.allPackages.length >= 1) {
        database()
          .ref('newReq/' + this.state.packages.key)
          .remove()
          .then(() => {
            this.sendReceipt(this.state.packages);
            this.removeKey(
              this.state.packages.mainKey,
              this.state.packages.key,
            );
            this.setState(
              {
                pin: '',
                verifyPinModal: false,
                nextTrip: true,
                packages: this.state.allPackages[0],
              },
              () => this.changePack(this.state.packages.pu_pin),
            );
          });
      } else {
        if (this.state.returnArray.length > 0) {
          database()
            .ref('newReq/' + this.state.packages.key)
            .remove()
            .then(() => {
              this.sendReceipt(this.state.packages);
              this.removeKey(
                this.state.packages.mainKey,
                this.state.packages.key,
              );
              let tempArray = this.state.returnArray[0];
              tempArray.returnPackage = true;
              this.setState(
                {
                  allPackages: this.state.returnArray,
                  packages: tempArray,
                  returnArray: [],
                  pin: '',
                  verifyPinModal: false,
                  returnState: true,
                },
                () => {
                  this.changePack(this.state.packages.pu_pin);
                  this.startTrip();
                },
              );
            });
        } else {
          database()
            .ref('newReq/' + this.state.packages.key)
            .remove()
            .then(() => {
              this.setState({verifyPinModal: false}, () => {
                this.sendReceipt(this.state.packages);
                database()
                  .ref('apiReq/' + this.state.packages.mainKey)
                  .remove()
                  .then(() => {
                    Alert.alert('', 'you have completed all the deliveries');
                    this.props.navigation.popToTop();
                  });
              });
            });
        }
      }
    } else {
      Alert.alert('', 'The PIN you have entered is incorrect!');
    }
  }

  removeKey(key, childKey) {
    let tempArr = new Array();
    database()
      .ref('apiReq/' + key)
      .once('value', data => {
        let reqKeys = data.val().reqKeys;
        for (var x = 0; x < reqKeys.length; x++) {
          if (reqKeys[x] != childKey) {
            tempArr.push(reqKeys[x]);
          }
        }
      })
      .then(() => {
        database()
          .ref('apiReq/' + key)
          .update({reqKeys: tempArr});
      });
  }

  getDriverData() {
    var driverUid = auth().currentUser.uid;
    database()
      .ref('drivers/' + driverUid)
      .once('value', data => {
        var thisDriver = data.val();
        console.log(thisDriver);
        var fname = thisDriver.firstName;
        var surname = thisDriver.surname;
        var name = `${fname} ${surname}`;
        var mode = thisDriver.mode;
        var plate = thisDriver.plateNum;
        this.setState({plate: plate});
        this.setState({mode: mode});
        this.setState({name: name, driverId: driverUid});
      });
  }

  componentDidMount() {
    this.getDriverData();
    BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
    let packs = this.props.route.params.packages;
    this.setState(
      {
        packages: this.props.route.params.packages[0],
        allPackages: packs,
        totTrips: packs.length,
      },
      () => {
        this.changePack(this.state.packages.pu_pin);
        this.openMap();
      },
    );
  }

  arrived() {
    VIForegroundService.stopService();
    this.setState({verifyPinModal: true});
  }

  dismissModal() {
    VIForegroundService.stopService();
    this.setState({verifyPinModal: false});

  }

  openMap() {
    Linking.openURL(`google.navigation:q=${this.state.packages.do_location}`);
    this.startForegroundService();
  }

  async startForegroundService() {
    const channelConfig = {
      id: 'channelId',
      name: 'Channel name',
      description: 'Channel description',
      enableVibration: false,
    };
    VIForegroundService.createNotificationChannel(channelConfig);
    const notificationConfig = {
      channelId: 'channelId',
      id: 3456,
      title: 'Title',
      text: 'Some text',
      icon: 'ic_icon',
    };
    try {
      await VIForegroundService.startService(notificationConfig);
    } catch (e) {
      console.error(e);
    }
  }

  changePack(pin) {
    let tmpArr = new Array();
    for (var x = 0; x < this.state.allPackages.length; x++) {
      if (this.state.allPackages[x].pu_pin !== pin) {
        tmpArr.push(this.state.allPackages[x]);
      }
    }
    if (this.state.allPackages.length > 0) {
      this.setState(
        {
          allPackages: tmpArr,
        },
        () => {
          console.log(this.state.packages.returnPackage);
          if (!this.state.packages.returnPackage || !this.state.returnState) {
            this.sendSMS(this.state.packages.cellphone, this.state.packages.pu_pin);
            this.sendPin(this.state.packages.pu_pin, this.state.packages.booking_email, this.state.packages.booking_name);
            if(this.state.packages.booking_email !== this.state.packages.do_email) {
              this.sendSMS(this.state.packages.do_cell, this.state.packages.pu_pin);
              this.sendPin(this.state.packages.pu_pin, this.state.packages.do_email, this.state.packages.do_name);
            }
          }
        },
      );
    } else if (this.state.returnArray.length > 0) {
      this.setState(
        {
          allPackages: this.state.returnArray,
          packages: this.state.returnArray[0],
          returnArray: [],
          returnState: true,
        },
        () => {
          this.changePack(this.state.packages.pu_pin);
          this.startTrip();
        },
      );
    } else {
      Alert.alert('', 'you have completed all the deliveries');
      this.props.navigation.popToTop();
    }
  }

  sendSMS(cellphone, pin) {
    var body = `Thank you for using Zipi Delivery. Zipi PIN: ${pin}. Please present it to your driver.`;
    var sms = `https://us-central1-zipi-app.cloudfunctions.net/sendSms?cellphone=${cellphone.replace(
      '0',
      '27',
    )}&message=${body}`;
    axios.get(sms).then(data => {
      console.log('sent');
    });
  }

  sendPin(pin, email, name) {
    var url = `https://developer.zipi.co.za/ZLpin.php?name=${name}&email=${email}&pin=${pin}`;
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.send();
  }

  return() {
    VIForegroundService.stopService();
    Alert.alert(
      '',
      'Are you sure you want to return this package?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            if (this.state.allPackages.length >= 1) {
              let tempArr = this.state.returnArray;
              tempArr.push(this.state.packages);
              tempArr.returnPackage = true;
              this.setState(
                {
                  returnArray: tempArr,
                },
                () => {
                  database()
                    .ref('newReq/' + this.state.packages.key)
                    .update({returnPackage: true})
                    .then(() => {
                      this.setState(
                        {
                          pin: '',
                          nextTrip: true,
                          packages: this.state.allPackages[0],
                        },
                        () => this.changePack(this.state.packages.pu_pin),
                      );
                    });
                },
              );
            } else {
              Linking.openURL(
                `google.navigation:q=${this.state.packages.pu_location}`,
              );
              this.startForegroundService();
            }
            this.sendReturnPin();
          },
        },
      ],
      {cancelable: false},
    );
  }

  startTrip() {
    this.setState({nextTrip: false}, () => {
      this.openMap();
    });
  }

  sendReceipt(data) {
    var today = new Date();
    var date =
      today.getFullYear() +
      '-' +
      (today.getMonth() + 1) +
      '-' +
      today.getDate();
    var time =
      today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
    var dateTime = date + ' ' + time;
    var x = data;
    var email = 'nelo@landsea-shipping.co.za';
    var xhr = new XMLHttpRequest();
    var url = 'https://developer.zipi.co.za/ZLreceipt.php?';
    this.sendSecInvoice(x);
    var params = `distance=${x.distance}&username=${x.booking_name}&pick_time=${
      x.pickup_date.split(' ')[1]
    }&dropTime=${dateTime}&numPlate=${this.state.plate}&vehicle=${
      this.state.mode
    }&email=${x.booking_email}&total=${
      x.amount
    }&pu_address=${x.pu_location.replace(
      ', South Africa',
      '',
    )}&do_address=${x.do_location.replace(', South Africa', '')}&ref=${
      x.booking_ref
    }&name=${this.state.name}&date=${x.date.split(' ')[0]}&duration=${
      x.eta
    }&distance=${x.distance}&time=${x.date.split(' ')[1]}`;
    xhr.open('GET', `${url}${params}`, true);
    xhr.onreadystatechange = () => {
      if (xhr.status == '200') {
        let resp = xhr.responseText;
        console.log('sent', resp);
      }
    };
    xhr.send();
  }

  sendSecInvoice(list) {
    let xhr = new XMLHttpRequest();
    let url = 'https://developer.zipi.co.za/Driver_Invoice.php?';
    let body = `id=${this.state.driverId}&name=${this.state.name}&no=${
      list.booking_ref
    }&date=${list.date}&pu=${list.pu_location.replace(
      ', South Africa',
      '',
    )}&do=${list.do_location.replace(', South Africa', '')}&reg=${
      this.state.plate
    }&mode=${this.state.mode}&duration=${list.eta}&distance=${
      list.distance
    }&amount=${parseInt(66.5)}&vat=${parseInt(66.5) * 0.15}&total=${
      parseInt(66.5) + parseInt(66.5 * 0.15)
    }`;
    xhr.open('GET', `${url}${body}`, true);
    xhr.onreadystatechange = () => {
      if (xhr.status == '200') {
        let resp = xhr.responseText;
        console.log('sent invoice');
      }
    };
    xhr.send();
  }

  sendReturnPin() {
    var url = `https://developer.zipi.co.za/returnPin.php?name=${this.state.packages.booking_name}&email=${this.state.packages.booking_email}&pin=${this.state.packages.returnPin}`;
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.send();
  }

  render() {
    const packs = this.state.allPackages.map((val, indx) => {
      return (        
        <TouchableOpacity style={{paddingHorizontal: 20, paddingVertical: 5}} key={indx} disabled={true} key={indx}>
          <View style={Style.tripItem}>
            <View>
              <Image source={Box} />
            </View>
            <View style={Style.itemContent}>
              <Text style={{fontWeight: 'bold', fontSize: 16}}>{val.order_id}</Text>
              <Text>{val.distance} km</Text>
            </View>
          </View>
        </TouchableOpacity>
      );
    });

    return (
      <View style={Style.outerContainer}>
        <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />
          <View style={Style.superWhite}>
            <View style={Style.toTop}>
            {this.state.packages ? (
              <Text>{this.state.packages.order_id}</Text>
              ) : (
                <View></View>
              )}
            </View>
            <View style={Style.toBottom}>
              <Text style={{marginVertical: 10}}>Current Trip (1/{this.state.totTrips})</Text>
                  {this.state.packages ? (
              <View style={Style.communicado}>
                <View style={Style.aboutClient}>
                  <View style={Style.profile}>
                      <Image style={Style.profile} source={Person} />
                  </View>
                  <View style={Style.profileAbout}>
                    <Text style={{fontWeight: "bold", fontSize: 18}}>{this.state.packages.booking_name}</Text>
                    <View style={Style.addressLine}>
                      <Image source={Loc} />
                    <Text style={{flex: 1}} numberOfLines={1}>  &nbsp; 
                  {this.state.packages.do_location.split(',')[0] + ',' + this.state.packages.do_location.split(',')[1]}</Text>
                    <TouchableOpacity onPress={() => {this.openMap();}}>
                      <Image style={Style.goToMap} source={lnkOpen} />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
                  <Text style={{marginTop: 10}}>Message/ Special Instructions/ Packages</Text>
                <View style={Style.specialInstructions}>
                  <TouchableOpacity style={Style.instructions}
                  onPress={() => {
                    this.setState({showModal: true});
                  }}>
                    {this.state.packages.instructions ? (

                    
                    <Text style={Style.chatter} numberOfLines={1}>{this.state.packages.instructions} </Text>
                    
              ) : (
                <Text style={Style.noChat}> </Text>
              )}
                  </TouchableOpacity>
                  <TouchableOpacity style={Style.callButton} 
                  onPress={() => {
                    Linking.openURL(`tel:${this.state.packages.cellphone}`);
                  }}>

                  <Image source={PhoneIcon} /> 
                  </TouchableOpacity>
                </View>
              </View>
                  ) : (
                    <View></View>
                  )}
              <View style={Style.atTheBottom}>
                <TouchableOpacity onPress={() => {this.arrived();}} style={{
                  backgroundColor: "#ffe200",
                  flex: 1,
                  alignItems: "center",
                  padding: 10,
                  borderTopLeftRadius: 100,
                  borderBottomLeftRadius: 100,}}>
                  <Text>Arrive</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {this.return();}}
               style={{
                  backgroundColor: "#333333",
                  flex: 1,
                  alignItems: "center",
                  padding: 10,
                  borderTopRightRadius: 100,
                  borderBottomRightRadius: 100,}}>
                  <Text style={{color: "#ffe200"}}>Return</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          {/* this.state.showModal */}
        <Modal visible={this.state.showModal} animationType="slide">
            <View style={Style.outerContainer}>
              {this.state.packages ? (
              <View style={Style.navBar}>
                <TouchableOpacity style={Style.bckBtn} onPress={() => {
                    this.setState({showModal: false});
                  }}>
                  <Text>Back</Text>
                </TouchableOpacity>
                <View style={Style.personName}>
                  <Text style={{fontWeight: 'bold'}}>{this.state.packages.booking_name}</Text>
                </View>
              </View>
              ) : (
                <View></View>
              )}
              <View style={Style.theInstructions}>
                  <Text style={{
                    textAlign: 'center',
                    margin: 20,
                    }}>Special instructions
                  </Text>
                  {this.state.packages ? (
                  <View style={Style.textChat}>
                  <Text>
                  {this.state.packages.instructions}
                  </Text>
                </View>) : (
                <View></View>
                )}
              </View>
            </View>
        </Modal>
        <Modal visible={this.state.verifyPinModal} animationType="slide" transparent>
        <StatusBar backgroundColor="#7f7f7f" barStyle="light-content" />
          <View style={Style.outerContainer1}>
            <TouchableOpacity onPress={() => {
                  this.dismissModal();
                }}
                style={{flex: 1,}}>
            </TouchableOpacity>
            {this.state.packages ? (
              <View style={Style.daBottom}>
              <Text style={{margin: 10, textAlign: 'center', fontWeight: 'bold'}}>REF: {this.state.packages.order_id}</Text>
                <Text style={{margin: 10, textAlign: 'center'}}>Ask {this.state.packages.booking_name} for the PIN before you can hand them the package.</Text>
                <TextInput keyboardType="number-pad" textAlign={'center'} value={this.state.pin} onChangeText={txt => {this.setState({pin: txt});}} style={Style.textInput} placeholder="Verify PIN"/>
                <TouchableOpacity style={Style.btnVerify} onPress={() => { this.verifyPin(); }}>
                  <Text style={{ fontWeight: 'bold' }}>Confirm PIN</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View></View>
            )}
          </View>
        </Modal>
        <Modal transparent visible={this.state.nextTrip} animationType="slide">
        <StatusBar backgroundColor="#7f7f7f" barStyle="light-content" />
          <View style={Style.outerContainer1}>
            <View style={Style.verifiedTrip}>
            <Image source={Done} style={Style.checkMark}/>
              <Text style={{textAlign: 'center', marginVertical: 10}}>
                Pin Approved
              </Text>
              <Text style={{textAlign: 'center'}}>Click "Next trip" when you're ready for the next trip</Text>

              <TouchableOpacity style={Style.btnVerify} onPress={() => {
                  this.startTrip();
                }}>
                <Text>
                  Next trip
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}
