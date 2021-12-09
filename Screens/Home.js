import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  Image,
  Switch,
  ScrollView,
} from 'react-native';
import Style from '../Style/Style';
import Box from '../Images/box.png';
import Geolocation from 'react-native-geolocation-service';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import messaging from '@react-native-firebase/messaging';

let counter = 0;
let tempArray = new Array();
export default class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      text: 'Offline',
      reqArray: [],
      current_location: '',
      current_coords: null,
      driverObject: null,
      phoneId: '',
      availability: 'unavailable',
      isEnabled: null,
    };
  }

  changeStatus() {
    if (!this.state.isEnabled) {
      this.setState(
        {availability: 'available', text: 'Online', isEnabled: true},
        () => this.setDriverStatus('available'),
      );
    } else {
      this.setState(
        {availability: 'unavailable', text: 'Offline', isEnabled: false},
        () => this.setDriverStatus('unavailable'),
      );
    }
  }

  setDriverStatus(status) {
    var user = auth().currentUser;
    if (this.state.driverObject) {
      database()
        .ref(this.state.driverObject.mode + '/' + user.uid)
        .update({
          status: status,
        });
      database()
        .ref('drivers/' + user.uid)
        .update({availability: status});
    }
  }

  selectReq(val) {
    this.props.navigation.navigate('verify', {
      pack: val,
      location: this.state.current_coords,
      driverObject: this.state.driverObject,
    });
  }

  componentDidMount() {
    this.getDriverDetails();
    this.trackDriver();
    this.setDriverStatus('unavailable');
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  getDriverDetails() {
    let user = auth().currentUser;
    database()
      .ref('drivers/' + user.uid)
      .once('value', data => {
        let temp = false;
        let btnState = false;
        if (
          data.val() &&
          (data.val().availability != null ||
            data.val().availability != undefined)
        ) {
          temp = data.val().availability;
        }
        if (temp == 'available') {
          btnState = true;
        }
        this.setState(
          {driverObject: data.val(), availability: temp, isEnabled: btnState, text: btnState === true ? 'Online' : 'Offline' },
          () => this.getTocken(),
        );
      });
  }

  getTocken() {
    if (this.state.driverObject) {
      messaging()
        .getToken()
        .then(token => {
          this.setState(
            {
              phoneId: token,
            },
            () => {
              let user = auth().currentUser;
              database()
                .ref(this.state.driverObject.mode + '/' + user.uid)
                .update({
                  phoneId: this.state.phoneId,
                });
            },
          );
        });
    }
  }

  checkPacksSelection() {
    database()
      .ref('apiReq/')
      .once('value', data => {
        if (data.val() != null || data.val() != undefined) {
          let details = data.val();
          let keys = Object.keys(details);
          for (var x = 0; x < keys.length; x++) {
            if (
              details[keys[x]].selected &&
              details[keys[x]].driverId === auth().currentUser.uid
            ) {
              let obj = details[keys[x]];
              obj.parentKey = keys[x];
              if (details[keys[x]].verified) {
                this.gotToPacks(obj);
                break;
              } else {
                this.selectReq(obj);
                break;
              }
            }
          }
        }
      });
  }

  gotToPacks(obj) {
    if (obj.selectedPacks) {
      this.goToMainScreen(obj);
    } else {
      this.props.navigation.navigate('addPacks', {
        driverObject: this.state.driverObject,
        packs: obj,
      });
    }
  }

  goToMainScreen(obj) {
    this.setState(
      {
        packsKeys: obj.reqKeys,
      },
      () => {
        this.getPacks(this.state.packsKeys[counter]);
      },
    );
  }

  getPacks(key) {
    database()
      .ref('newReq/' + key)
      .once('value', data => {
        let details = data.val();
        details.key = key;
        tempArray.push(details);
      })
      .then(() => {
        counter++;
        if (counter === this.state.packsKeys.length) {
          this.pushPacks(tempArray);
        } else {
          this.getPacks(this.state.packsKeys[counter]);
        }
      });
  }

  pushPacks(tempArr) {
    this.props.navigation.navigate('enroute', {packages: tempArr});
  }

  getRequests() {
    database()
      .ref('apiReq/')
      .on('value', data => {
        if (data.val() != null || data.val() != undefined) {
          let tempArr = new Array();
          let details = data.val();
          let keys = Object.keys(details);
          for (var x = 0; x < keys.length; x++) {
            if (!details[keys[x]].selected) {
              let obj = details[keys[x]];
              obj.parentKey = keys[x];
              tempArr.push(obj);
            }
          }
          this.setState({reqArray: tempArr});
        }
      });
  }

  trackDriver() {
    Geolocation.getCurrentPosition(
      info => {
        let location = info.coords.latitude + ',' + info.coords.longitude;
        this.setState({current_coords: location}, () => {
          this.getRequests();
          this.checkPacksSelection();
          this.getAddress(location);
        });
      },
      error => {
        //(error.code, error.message);
      },
      {
        enableHighAccuracy: true,
        timeout: 25000,
        maximumAge: 2000,
        distanceFilter: 0,
        forceRequestLocation: true,
      },
    );
    setTimeout(() => {
      this.trackDriver();
    }, 120000);
  }

  async getAddress(coords) {
    const key = 'AIzaSyDDMIizZ49AcXojEeG1Qmckb-uduyvX6hY';
    const url =
      'https://maps.googleapis.com/maps/api/geocode/json?latlng=' +
      coords +
      '&key=' +
      key;
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onreadystatechange = () => {
      if (xhr.readyState == '4') {
        const json = xhr.response;
        let loc = json.results[0].formatted_address;
        let temp = json.results[0].address_components;
        for (var x = 0; x < temp.length; x++) {
          let temp2 = temp[x].types;
          for (var i = 0; i < temp2.length; i++) {
            if (temp2[i] == 'administrative_area_level_2') {
              loc = loc.replace('South Africa', temp[x].short_name);
              this.setUpdateDriverLocation(loc, coords);
              break;
            }
          }
        }
      }
    };
    await xhr.send();
  }

  setUpdateDriverLocation = async (location, coords) => {
    let user = auth().currentUser;
    if (this.state.driverObject) {
      database()
        .ref(this.state.driverObject.mode + '/' + user.uid)
        .update({
          location: location,
          coords: coords,
          name:
            this.state.driverObject.firstName +
            ' ' +
            this.state.driverObject.surname,
          cell: this.state.driverObject.phone,
          vehicle: this.state.driverObject.mode,
          status: this.state.availability,
        });
    }
  };

  render() {
    const requests = this.state.reqArray.map((val, indx) => {
      return (
        // <TouchableOpacity style={Style.card} key={indx} onPress={() => { this.selectReq(val) }}>
        //   <View style={Style.cardContent}>
        //     <Image style={Style.boxImg} source={Box} />
        //   </View>
        //   <View style={Style.cardContent2}>
        //     <Text style={Style.nameTXT}> {val.id}</Text>
        //     <Text style={Style.detailsTXT}> {this.getRandomInt(30)}km / {val.locationArray[1]}</Text>
        //     <View style={{ marginLeft: '70%', marginTop: -35 }}>
        //       <Text style={Style.nameTXT}>Parcels: {val.reqKeys.length}</Text>
        //     </View>

        //   </View>
        // </TouchableOpacity>

        <TouchableOpacity
          style={{paddingHorizontal: 20, paddingVertical: 5}}
          key={indx}
          onPress={() => {
            this.selectReq(val);
          }}>
          <View style={Style.tripItem}>
            <View>
              <Image source={Box} />
            </View>
            <View style={Style.itemContent}>
              <Text style={{fontWeight: 'bold', fontSize: 16}}>{val.id}</Text>
              <Text>
                {' '}
                {this.getRandomInt(30)}km / {val.locationArray[1]}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      );
    });
    return (
      <View style={Style.outerContainer}>
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <View style={Style.topNav}>
          <View style={Style.gridContainer}>
            {this.state.driverObject !== null ? (
              <View style={Style.gridder}>
                <Image
                  style={Style.profilePic}
                  source={{uri: this.state.driverObject.img}}
                />
                <View style={Style.driverInfo}>
                  <View>
                    <Text style={{fontSize: 16, fontWeight: '500'}}>
                      {this.state.driverObject.firstName}{' '}
                      {this.state.driverObject.surname}
                    </Text>
                  </View>
                  <View>
                    <Text>{this.state.driverObject.totalTrips} Trips</Text>
                  </View>
                  <View>
                    <Text>v1.0.6</Text>
                  </View>
                  <View style={Style.flexThis}>
                    <Switch style={{width: 40}} trackColor={{false: '#767577', true: '#81b0ff'}} thumbColor={this.state.isEnabled ? '#f5dd4b' : '#f4f3f4'} ios_backgroundColor="#3e3e3e" onValueChange={() => {this.changeStatus();}} value={this.state.isEnabled}/>
                    <Text style={Style.onlineStatus}>{this.state.text}</Text>
                  </View>
                </View>
              </View>
            ) : (
              <View style={Style.gridder}>
                <View style={Style.blankImage} />
                <View style={Style.driverInfo}>
                  <View style={Style.blankInfoName} />
                  <View style={Style.blankInfoOther} />
                  <View style={Style.blankInfoOther} />
                  <View style={Style.blankInfoSwitch} />
                </View>
              </View>
            )}
          </View>
        </View>
        {this.state.isEnabled ?
          <View style={Style.scrollContent}>
            
            {this.state.reqArray.length > 0 ? (
              <View>
                <Text style={{marginLeft: 20, marginBottom: 5}}>Requests</Text>
                <ScrollView style={{paddingBottom: 10}}>
                  {requests}
                </ScrollView>
              </View>
            ) : (
              <View style={Style.emptyStuff}>
                <Text style={{textAlign: "center"}}>There are no available requests at the moment. Check back again soon for any further updates.</Text>
              </View>
            )}
          </View>
        :
        <View style={Style.emptyStuff}>
          <Text style={{textAlign: "center"}}>You won't be able to receive request updates if you're offline. Toggle the online switch to view current delivery requests.</Text>
        </View>
        }
      </View>
    );
  }
}
