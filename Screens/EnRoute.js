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
import Loc from '../Images/done.png';
import axios from 'axios';
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
      Alert.alert('', 'The Pin you have entered is incorrect!');
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
            this.sendSMS(
              this.state.packages.cellphone,
              this.state.packages.pu_pin,
            );
            this.sendPin(
              this.state.packages.pu_pin,
              this.state.packages.booking_email,
              this.state.packages.booking_name,
            );
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
        <TouchableOpacity disabled={true} style={Style.card} key={indx}>
          <View style={Style.cardContent}>
            <Image style={Style.boxImg} source={Box} />
          </View>
          <View style={Style.cardContent2}>
            <Text style={Style.nameTXT}>{val.order_id}</Text>
            <Text style={Style.detailsTXT}>{val.distance} km</Text>
          </View>
        </TouchableOpacity>
      );
    });

    return (
      <View style={Style.body}>
        <StatusBar backgroundColor="black" />
        {this.state.packages ? (
          <View style={Style.routeTxt}>
            <Text style={{fontSize: 20}}>{this.state.packages.order_id}</Text>
          </View>
        ) : (
          <View></View>
        )}

        <View style={Style.packsBody2}>
          <ScrollView style={{marginBottom: 30}}>{packs}</ScrollView>
        </View>
        {this.state.packages ? (
          <View style={Style.alignRoute}>
            <View style={{marginBottom: 15}}>
              <Text>Current Trip (1/{this.state.totTrips})</Text>
            </View>
            <View style={Style.routeCard}>
              <View style={Style.routeCardContent}>
                <Image style={Style.routerImg} source={Box} />
              </View>
              <View style={Style.routeCardContent2}>
                <Text style={Style.nameTXT}>
                  {this.state.packages.booking_name}
                </Text>
                <Text style={Style.detailsTXT}>
                  REF: {this.state.packages.booking_ref}
                </Text>
                <Text style={Style.detailsTXT}>
                  {this.state.packages.do_location.split(',')[0] +
                    ',' +
                    this.state.packages.do_location.split(',')[1]}
                </Text>
              </View>

              <View style={Style.alignRoute}>
                <Text></Text>
                <Text style={{fontSize: 11}}>
                  Message/ Special Instructions/ Packages
                </Text>
                <View style={Style.routerText}>
                  <TouchableOpacity
                    style={Style.txtBorder}
                    onPress={() => {
                      this.setState({showModal: true});
                    }}>
                    <Text>{this.state.packages.instructions}</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={Style.callbtn}
                    onPress={() => {
                      Linking.openURL(`tel:${this.state.packages.cellphone}`);
                    }}>
                    <Image style={Style.routerImg2} source={Call} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        ) : (
          <View></View>
        )}

        <View style={Style.bottomBtn}>
          <TouchableOpacity
            style={Style.arriveBtn}
            onPress={() => {
              this.arrived();
            }}>
            <Text>Arrived</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={Style.returnBtn}
            onPress={() => {
              this.return();
            }}>
            <Text style={{color: '#ffe200'}}>Return</Text>
          </TouchableOpacity>
        </View>

        <Modal visible={this.state.showModal} animationType="slide">
          {this.state.packages ? (
            <View style={Style.body}>
              <View style={Style.routeTxt}>
                <TouchableOpacity
                  style={Style.backBtn}
                  onPress={() => {
                    this.setState({showModal: false});
                  }}>
                  <Text>Back</Text>
                </TouchableOpacity>
                <Text style={{fontSize: 20}}>
                  {this.state.packages.booking_name}
                </Text>
              </View>
              <Text style={{textAlign: 'center', marginTop: 20}}>
                Special Instructions
              </Text>
              <Text
                style={{
                  textAlign: 'center',
                  marginTop: 20,
                  width: '97%',
                  marginLeft: 5,
                }}>
                {this.state.packages.instructions}
              </Text>
            </View>
          ) : (
            <View></View>
          )}
        </Modal>

        <Modal visible={this.state.verifyPinModal} animationType="slide">
          <View style={Style.body}>
            {this.state.packages ? (
              <View
                style={{
                  justifyContent: 'center',
                  alignContent: 'center',
                  alignItems: 'center',
                  marginTop: '50%',
                  width: '90%',
                  marginLeft: '5%',
                }}>
                <Text>
                  Ask {this.state.packages.booking_name} for the PIN before you
                  can hand them the package.
                </Text>
                <Text></Text>
                <Text>REF: {this.state.packages.order_id}</Text>
                <Text></Text>
                <TextInput
                  keyboardType="number-pad"
                  textAlign={'center'}
                  value={this.state.pin}
                  onChangeText={txt => {
                    this.setState({pin: txt});
                  }}
                  style={Style.input}
                  placeholder="Pin"
                />
              </View>
            ) : (
              <View></View>
            )}
            <View style={Style.bottomBtn}>
              <TouchableOpacity
                style={Style.btn}
                onPress={() => {
                  this.verifyPin();
                }}>
                <Text>Verify Pin</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <Modal transparent visible={this.state.nextTrip} animationType="slide">
          <View style={Style.tripNext} />

          <View style={Style.nextTrip}>
            <View style={Style.alignPinItems}>
              <Image style={Style.routerImg} source={Loc} />
              <Text style={{fontSize: 17, marginBottom: 10, marginTop: 10}}>
                Pin Approved
              </Text>
              <Text>Click "Next trip" when you're ready for the next trip</Text>
            </View>

            <View style={Style.bottomBtn}>
              <TouchableOpacity
                style={Style.btn}
                onPress={() => {
                  this.startTrip();
                }}>
                <Text>Next Trip</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}
