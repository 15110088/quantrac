import React, {Component, useState, useEffect} from 'react';
import {
  TouchableWithoutFeedback,
  StyleSheet,
  Dimensions,
  ImageBackground,
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  TextInput,
  Keyboard
} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Polyline} from 'react-native-maps';
import {Image, Button, Overlay, Card} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import {Block, Label, Input} from '../components';
import * as theme from '../constants/theme';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';

import {
  Text,
  View,
  Dialog,
  Colors,
  PanningProvider,
  RadioGroup,
  RadioButton,
  Switch,
  Constants,
} from 'react-native-ui-lib'; // eslint-disable-line
import DialogAQI from './AQI/DialogAQI';
import TodayAQI from './AQI/TodayAQI';
import LevelAQI from './AQI/LevelAQI';
import config from '../ultilities/config';
import DialogWQI from './WQI/DialogWQI';

const {width, height} = Dimensions.get('window');


class D extends Component {
  constructor(props) {
    super(props);
    this.SCROLL_TYPE = {
      NONE: 'none',
      VERTICAL: 'vertical',
      HORIZONTAL: 'horizontal',
    };
    this.state = {
      isVisible: true,
      isShow: false,
      isLoading: true,
      //dialog
      panDirection: PanningProvider.Directions.UP,
      position: 'center',
      scroll: this.SCROLL_TYPE.NONE,
      showHeader: true,
      isRounded: true,
      showDialog: false,
      showDialogType: false,
      typeMonitoring: this.props.route.params.typeMonitoring,
      //WQI
      colorPoint: '#fff123',
      PH: 0,
      DO: 0,
      active: null,
      value: null,
      //AQI
      NgayTinh: null,
      chiSo: 0,
      keyColor: '#fff123',
      tenTram: 'NULL',
      noidungCanhBao: null,
      chatluongMT: null,
      maTram: null,
      //Search
      dataTemp: null,
      dataSearched: null,
      search: null,
      dataSearch: null,
      displaySearch: false,
      maTramSearch:null,
      region:{
        latitude: 10.9597071,
        longitude: 106.8559846,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      },
    };
  }
  xulysolieu() {
    this.props.data.map((value, index) => {
      this.props.xacdinhmau(index, value);
    });
  }
  componentDidMount() {
    //this.xulysolieu()
    this.fetchData();
   // this.fetchDataSearch();
  }
  showDialog = (data) => {
    this.setState({
      showDialog: !this.state.showDialog,
      keyColor: '#fff123',
      chiSo: data.chiSo,
      NgayTinh: data.NgayTinh,
      tenTram: data.tenTram,
      chatluongMT: data.chatluongMT,
      noidungCanhBao: data.noidungCanhBao,
      maTram: data.maTram,
      PH:data.PH,
      DO:data.DO,
      colorPoint:data.keyColor
    });
  };
  showDialogTypeMonitoring = (data) => {
    this.setState({
      showDialogType: !this.state.showDialogType,
    });
  };
  renderPannableHeader = (props) => {
    const {title} = props;
    return (
      <View>
        <View margin-20>
          <Text>{title}</Text>
        </View>
        <View height={1} bg-dark70 />
      </View>
    );
  };
  renderHeader() {
    return (
      <View
      style={{height: 45, width: '100%', backgroundColor: 'transparent'}}>
      <View
        style={{
          backgroundColor: '#fff',
          marginLeft: 50,
          marginRight: 10,
          marginVertical: 10,
          borderRadius: 60,
        }}>
        <MaterialIcons
          size={25}
          name="search"
          color={theme.colors.green}
          style={{
            position: 'absolute',
            paddingLeft: 5,
            paddingTop: 5,
          }}></MaterialIcons>
        <TextInput
          value={this.state.search}
          onChangeText={(data) => this.searchFilterFunction(data)}
          onFocus={this.showDataSearch}
          style={{
            width: '100%',
            height: theme.sizes.base * 2,
            paddingLeft: 30,
            borderRadius: 60,
            padding: 0,
          }}
          placeholder="search"
        />
        {this.state.displaySearch?<TouchableWithoutFeedback
        style={{position: 'absolute', flex: 1}}
        onPress={this.hideDataSearch}>
        <MaterialIcons
          size={25}
          name="close"
          color={theme.colors.green}
          style={{
            position: 'absolute',
            paddingRight: 0,
            marginRight:0,
            right:0,
            paddingTop: 5,
          }}>
          </MaterialIcons>
        </TouchableWithoutFeedback>:null}
        
        
      </View>
      <TouchableWithoutFeedback
        style={{position: 'absolute', flex: 1}}
        onPress={() => this.props.navigation.openDrawer()}>
        <View
          style={{
            marginHorizontal: 10,
            width: 30,
            height: 30,
            borderRadius: 15,
            alignItems: 'center',
            position: 'absolute',
            backgroundColor: '#fff',
            marginVertical: 10,
          }}>
          <MaterialIcons
            size={25}
            name="menu"
            color={theme.colors.green}
            style={{position: 'absolute'}}></MaterialIcons>
        </View>
      </TouchableWithoutFeedback>
    </View>
    );
  }
  renderDialogWQI = () => {
    const {
      showDialog,
      panDirection,
      position,
      scroll,
      showHeader,
      colorPoint,
      PH,
      DO,
      NgayTinh,
      tenTram,
      maTram
    } = this.state;
    const height = scroll !== this.SCROLL_TYPE.NONE ? '70%' : '20%';
    return (
      <Dialog
        migrate
        useSafeArea
        //key={this.getDialogKey(height)}
        top={position === 'top'}
        bottom={position === 'bottom'}
        height={height}
        width={'52%'}
        panDirection={panDirection}
        containerStyle={{
          backgroundColor: Colors.white,
          marginBottom: Constants.isIphoneX ? 0 : 20,
          borderRadius: 12,
          borderBottomWidth: 10,
          borderBottomColor: colorPoint,
        }}
        visible={showDialog}
        onDismiss={this.showDialog}
        // renderPannableHeader={renderPannableHeader}
        pannableHeaderProps={this.pannableTitle}
        //supportedOrientations={this.supportedOrientations}
      >
        <TouchableWithoutFeedback
          onPress={this.showTodayWQI}>
             <View flex-1>
             <DialogWQI PH={PH} DO={DO} 
          NgayTinh={NgayTinh}
          tenTram={tenTram}
          maTram={maTram}
          colorPoint={colorPoint}
          ></DialogWQI>
          </View>
         
        </TouchableWithoutFeedback>
      </Dialog>
    );
  };

  renderDialogAQI = () => {
    const {
      showDialog,
      panDirection,
      position,
      scroll,
      showHeader,
      keyColor,
      chiSo,
      NgayTinh,
      tenTram,
      maTram,
      noidungCanhBao,
      chatluongMT,
    } = this.state;
    const height = scroll !== this.SCROLL_TYPE.NONE ? '70%' : '50%';
    return (
      <Dialog
        migrate
        useSafeArea
        top={position === 'top'}
        bottom={position === 'bottom'}
        height={height}
        width={'100%'}
        panDirection={panDirection}
        containerStyle={{
          backgroundColor: 'transparent',
          marginBottom: Constants.isIphoneX ? 0 : 20,
          borderWidth: 1,
          borderColor: keyColor,
        }}
        visible={showDialog}
        onDismiss={this.showDialog}
        pannableHeaderProps={this.pannableTitle}>
        <TouchableWithoutFeedback onPress={this.showTodayAQI}>
          <View flex-1>
            <DialogAQI
              chiSo={chiSo}
              NgayTinh={NgayTinh}
              noidungCanhBao={noidungCanhBao}
              chatluongMT={chatluongMT}
              tenTram={tenTram}
              maTram={maTram}
              navigation={this.props.navigation}></DialogAQI>
          </View>
        </TouchableWithoutFeedback>
      </Dialog>
    );
  };
  showTodayAQI = () => {
    this.setState({
      showDialog: !this.state.showDialog,
    });
    this.props.navigation.navigate('TodayAQI', {
      chiSo: this.state.chiSo,
      NgayTinh: this.state.NgayTinh,
      noidungCanhBao: this.state.noidungCanhBao,
      tenTram: this.state.tenTram,
      chatluongMT: this.state.chatluongMT,
      maTram: this.state.maTram,
    });
  };

  showTodayWQI = () => {
    this.setState({
      showDialog: !this.state.showDialog,
    });
    this.props.navigation.push('Today', {
      colorPoint: this.state.colorPoint,
      PH:this.state.PH,
      DO:this.state.DO,
      tenTram:this.state.tenTram,
      maTram :this.state.maTram,
      NgayTinh:this.state.NgayTinh
    })
  };


  handleType = (id) => {
    const {active} = this.state;
    console.log(id);
    this.setState({
      active: active === id ? null : id,
      showDialogType: !this.state.showDialogType,
      typeMonitoring: id == 'Air' ? 2 : 1,
    });
  };
  renderOption = (item, index) => (
    // <AutocompleteItem
    //   key={index}
    //   title={item.title}
    //   //accessoryLeft={StarIcon}
    // />
    <></>
  );
  renderDialogTypeMonitoring = () => {
    const {
      showDialogType,
      panDirection,
      position,
      scroll,
      showHeader,
      colorPoint,
      PH,
      DO,
      active,
    } = this.state;
    const height = scroll !== this.SCROLL_TYPE.NONE ? '70%' : '20%';
    const adminIcon = (
      <Image
        source={require('../assets/images/icons/water.png')}
        style={{height: 30, width: 30}}
      />
    );

    const operatorIcon = (
      <Image
        source={require('../assets/images/icons/air.png')}
        style={{height: 30, width: 30}}
      />
    );

    const checkIcon = (
      <Image
        source={require('../assets/images/icons/check.png')}
        style={{height: 18, width: 18}}
      />
    );

    return (
      <Dialog
        migrate
        useSafeArea
        // key={this.getDialogKey(height)}
        top={position === 'top'}
        bottom={position === 'bottom'}
        height={height}
        width={'50%'}
        panDirection={panDirection}
        containerStyle={{
          backgroundColor: Colors.white,
          marginBottom: Constants.isIphoneX ? 0 : 20,
          borderRadius: 12,
          borderBottomWidth: 10,
          borderBottomColor: '#fff',
        }}
        visible={showDialogType}
        onDismiss={this.showDialogTypeMonitoring}
        // renderPannableHeader={renderPannableHeader}
        pannableHeaderProps={this.pannableTitle}
        //supportedOrientations={this.supportedOrientations}
      >
        <View style={{backgroundColor: '#fff123'}}>
          <Text
            style={{
              color: '#fff',
              alignSelf: 'center',
              fontWeight: 'bold',
              fontSize: 20,
            }}>
            {' '}
            Type
          </Text>
        </View>
        <Block row style={{marginHorizontal: 20, marginTop: 5}}>
          <TouchableWithoutFeedback
            onPress={() => this.handleType('Water')}
            style={active === 'Water' ? styles.activeBorder : null}>
            <Block
              center
              middle
              style={[
                styles.card,
                {marginRight: 20},
                active === 'Water' ? styles.active : null,
              ]}>
              {active === 'Water' ? (
                <Block center middle style={styles.check}>
                  {checkIcon}
                </Block>
              ) : null}
              <Block center middle style={styles.icon}>
                {adminIcon}
              </Block>
            </Block>
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback
            onPress={() => this.handleType('Air')}
            style={active === 'Air' ? styles.activeBorder : null}>
            <Block
              center
              middle
              style={[styles.card, active === 'Air' ? styles.active : null]}>
              {active === 'Air' ? (
                <Block center middle style={styles.check}>
                  {checkIcon}
                </Block>
              ) : null}
              <Block center middle style={styles.icon}>
                {operatorIcon}
              </Block>
            </Block>
          </TouchableWithoutFeedback>
        </Block>
      </Dialog>
    );
  };
  fetchData = async () => {
    try {
      var URL=''
      if(this.state.typeMonitoring==1)
      {
        URL=`http://${config.URLIP}/DuLieuQuanTracServices.svc/GetRandomNuocTuDong?record=0`
        console.log(URL)
      }
      if(this.state.typeMonitoring==2)
      {
        URL=`http://${config.URLIP}/DuLieuQuanTracServices.svc/GetRandomKhiTuDong?record=0`
        console.log(URL)

      }
      let response = await fetch(URL);
      await this.setState({
        isLoading: true,
      });
      let reponseJson = await response.json();

      //console.log(reponseJson);
      await this.props.getDataKhiTuDong(2, reponseJson);

      await this.xulysolieu();
      // console.log('sau khi thay doi');
      // await console.log(this.props.data);
      await this.setState({
        isLoading: false,
        dataTemp: reponseJson,
        dataSearch: reponseJson,
      });
    } catch (error) {
      console.error(error);
    }
  };

  fetchDataSearch = async () => {
    try {
      var URL=""
      if(this.state.typeMonitoring==1)
      {
        URL=`http://${config.URLIP}/DuLieuQuanTracServices.svc/GetDataGiaTriDo?maTram=${this.state.maTramSearch}`
      }
      if(this.state.typeMonitoring==2)
      {
        URL= `http://${config.URLIP}/DuLieuQuanTracServices.svc/GetDataKhiTuDong?maTram=${this.state.maTramSearch}`
      }

     
      fetch(URL)
        .then((response) => response.json())
        .then((json) => {
          this.setState({
            region: {
              latitude: parseFloat(json.toaDoX),
              longitude: parseFloat(json.toaDoY),
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }
          });
          console.log(json);
          console.log(parseFloat(json.toaDoX));
          console.log(this.state.region);
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (error) {
      console.error(error);
    }
  };

  searchFilterFunction = (text) => {
    //passing the inserted text in textinput
    const newData = this.state.dataSearch.filter((item) => {
      const itemData = item.tenTram
        ? item.tenTram.toUpperCase()
        : ''.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      dataSearch: newData,
      search: text,
    });
    //setOption(newData);
    //setSearch(text);
    console.log(this.state.dataSearch);
    if (!text) {
      console.log('========text========');
      console.log(text);
      this.setState({
        dataSearch: this.state.dataTemp,
      });
      // setOption(dataTemp)
    }
  };
  showDataSearch = () => {
    this.setState({
      displaySearch: true,
    });
  };
  hideDataSearch = () => {
    console.log("ok test")
    Keyboard.dismiss()
    this.setState({
      displaySearch: false,
    });
  };
  selectIndex = async(maTram,tenTram) => {
   // setSearch(data);
    //setDisplay(!display);
     await this.setState({
        search:tenTram,
        maTramSearch:maTram,
        displaySearch:!this.state.displaySearch
      })
     await this.fetchDataSearch()
  };
  render() {
    var {data} = this.props.data;
    var {addNumber, subNumber, xacdinhmau, navigation} = this.props;
    const {typeMonitoring} = this.state;

    return (

      <>
      <View style={{flex: 1, backgroundColor: theme.colors.green}}>
        {this.renderHeader()}
        <View style={{flex: 1, backgroundColor: '#fff'}}>
          {this.state.isLoading ? (
            <ActivityIndicator size="large" color="#0000fr" style={{position:'absolute'}} />
          ) : 
              <MapView
               // provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                 ref={ref => {
                  this.map = ref;
                }}
                style={{flex: 3}}
                region={this.state.region}>
                {this.props.data.map((marker, index) => {
                  console.log(    'x '+ parseFloat(marker.toaDoX)+
                'y '+parseFloat(marker.toaDoY))
                  return (
                    <MapView.Marker
                      onPress={() => this.showDialog(marker)}
                      key={index}
                      coordinate={{
                      latitude: parseFloat(marker.toaDoX),
                      longitude: parseFloat(marker.toaDoY),
                      }}>
                      <TouchableWithoutFeedback>
                        <View
                          style={[styles.diemquantrac,{backgroundColor: marker.keyColor}]
                          }>
                          <Text
                            style={{
                              fontWeight: 'bold',
                              fontSize: 18,
                              color: 'white',
                            }}>
                           {this.state.typeMonitoring==1?marker.PH:marker.chiSo} 
                          </Text>
                        </View>
                      </TouchableWithoutFeedback>

                      
                    </MapView.Marker>
                  );
                })}
                  
              </MapView>
           }          
          {this.state.displaySearch?
          <View
            style={{
              backgroundColor: 'transparent',
              flex: 1,
              width: '100%',
              height: 200,
              position: 'absolute',
              paddingLeft: 50,
              paddingRight: 10,
            }}>
            <ScrollView
              style={{
                width: '100%',
                height: 200,
                paddingLeft: 30,
                paddingHorizontal: 50,
                backgroundColor: 'transparent',
              }}>     
              {this.state.displaySearch
                ? this.state.dataSearch.map((v, i) => {
                    return (
                      <TouchableWithoutFeedback
                        onPress={() => this.selectIndex(v.maTram,v.tenTram)}>
                         <Card containerStyle={{borderWidth:2,borderBottomColor:theme.colors.green}} >
                          <View style={{flex:1,flexDirection:'row'}}>
                          <Text>
                        <Entypo name="location"></Entypo> {v.tenTram} 
                         </Text>
                          </View>
                        </Card>
                      </TouchableWithoutFeedback>
                    );
                  })
                : null}
            </ScrollView>
          </View>:null}
          {this.state.typeMonitoring==1?   this.renderDialogWQI(): this.renderDialogAQI()}
          {this.renderDialogTypeMonitoring()}
                         <View style={{ position: "absolute",
              right: 0,
              left: 0,
              bottom: 0,
              paddingBottom: theme.sizes.base * 2}}>
                <LevelAQI></LevelAQI>
                               </View>
         
        </View>
      </View>
    </>



    //   <>
    //     <View style={{flex: 1, backgroundColor: theme.colors.green}}>
    //       {this.renderHeader()}
    //       <View style={{flex: 1, backgroundColor: '#fff'}}>
    //         {this.state.isLoading ? (
    //           <ActivityIndicator size="large" color="#0000fr" />
    //         ) : null}
    //         {
    //         this.props.data.map((marker, index) => {
    //           //console.log(parseFloat(marker.toaDoX))
    //           //console.log(parseFloat(marker.toaDoY))
    //           //console.log(marker.COORDINATES[0])
    //           return (
    //             <TouchableWithoutFeedback
    //               key={index}
    //               onPress={() => this.showDialog(marker)}>
    //               <View
    //                 style={{
    //                   alignItems: 'center',
    //                   justifyContent: 'center',
    //                   width: 50,
    //                   height: 50,
    //                   borderRadius: 25,
    //                   backgroundColor: marker.keyColor,
    //                   shadowColor: '#7F58FF',
    //                   shadowRadius: 5,
    //                   shadowOffset: {height: 10},
    //                   shadowOpacity: 0.3,
    //                   borderWidth: 3,
    //                   borderColor: '#FFFFFF',
    //                 }}>
    //                 <Text
    //                   style={{
    //                     fontWeight: 'bold',
    //                     fontSize: 18,
    //                     color: '#000',
    //                   }}>
    //                  {this.state.typeMonitoring==1?marker.PH:marker.chiSo} 
    //                 </Text>
    //               </View>
    //             </TouchableWithoutFeedback>
    //           );
    //         })
    //         }


    //  {this.state.displaySearch?
    //       <View
    //         style={{
    //           backgroundColor: 'transparent',
    //           flex: 1,
    //           width: '100%',
    //           height: 200,
    //           position: 'absolute',
    //           paddingLeft: 50,
    //           paddingRight: 10,
    //         }}>
    //         <ScrollView
    //           style={{
    //             width: '100%',
    //             height: 200,
    //             paddingLeft: 30,
    //             paddingHorizontal: 50,
    //             backgroundColor: 'transparent',
    //           }}>     
    //           {this.state.displaySearch
    //             ? this.state.dataSearch.map((v, i) => {
    //                 return (
    //                   <TouchableWithoutFeedback
    //                     onPress={() => this.selectIndex(v.maTram,v.tenTram)}>
    //                      <Card containerStyle={{borderWidth:2,borderBottomColor:theme.colors.green}} >
    //                       <View style={{flex:1,flexDirection:'row'}}>
    //                       <Text>
    //                     <Entypo name="location"></Entypo> {v.tenTram} 
    //                      </Text>
    //                       </View>
    //                     </Card>
    //                   </TouchableWithoutFeedback>
    //                 );
    //               })
    //             : null}
    //         </ScrollView>
    //       </View>:null}
            
    //         {this.state.typeMonitoring==1?this.renderDialogWQI(): this.renderDialogAQI()}
    //         {this.renderDialogTypeMonitoring()}

    //         <Button
    //           title="B"
    //           onPress={() =>
    //             this.props.navigation.navigate('History')
    //           }></Button>
    //         <Button
    //           title="Setting"
    //           onPress={() => this.showDialogTypeMonitoring('1')}></Button>
    //           <View style={{ position: "absolute",
    //           right: 0,left: 0,bottom: 0,
    //           paddingBottom: theme.sizes.base * 2}}>
    //           <LevelAQI></LevelAQI></View>
    //       </View>
    //     </View>
    //   </>
    );
  }
}

export default D;

const styles = StyleSheet.create({
  container: {flex: 1},
  marker: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#7F58FF',
    //  position: "absolute",
    //  marginTop: -60,
    shadowColor: '#7F58FF',
    shadowRadius: 5,
    shadowOffset: {height: 10},
    shadowOpacity: 0.3,
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  dialog: {
    backgroundColor: Colors.white,
  },
  roundedDialog: {
    backgroundColor: Colors.white,
    marginBottom: Constants.isIphoneX ? 0 : 20,
    borderRadius: 12,
    borderBottomWidth: 10,
    borderBottomColor: '#fff123',
  },
  button: {
    margin: 5,
    alignSelf: 'flex-start',
  },
  verticalScroll: {
    marginTop: 20,
  },
  horizontalTextContainer: {
    alignSelf: 'center',
    position: 'absolute',
    top: 10,
  },
  statusIcon: {
    width: 40,
    height: 40,
    backgroundColor: '#DD0000',
    borderRadius: 20,
    top: 5,

    alignSelf: 'center',
  },
  shadown: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,
    borderWidth: 1,

    elevation: 14,
  },
  card: {
    padding: 20,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: 5,
    backgroundColor: theme.colors.white,
  },
  active: {
    borderColor: theme.colors.blue,
    shadowOffset: {width: 0, height: 0},
    shadowColor: theme.colors.lightblue,
    shadowRadius: 3,
    shadowOpacity: 1,
  },
  icon: {
    flex: 0,
    height: 48,
    width: 48,
    borderRadius: 48,
    marginBottom: 5,
    backgroundColor: theme.colors.white,
  },
  check: {
    position: 'absolute',
    right: -9,
    top: -9,
  },
  header: {
    flexDirection: 'row',
    // justifyContent: 'flex-end',
    flex: 0.1,
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 10 * 1.5,
    // backgroundColor:theme.colors.green
  },
  headerTitle: {
    color: theme.colors.gray,
  },
  headerLocation: {},
  search: {
    flex: 1,
    justifyContent: 'space-between',
    height: theme.sizes.base * 4,
    width: width - theme.sizes.base * 2,
  },
  searchInput: {
    flex: 1,
    fontSize: theme.sizes.caption,
    height: theme.sizes.base * 2,
    backgroundColor: 'rgba(142, 142, 147, 0.06)',
    borderColor: 'rgba(142, 142, 147, 0.06)',
    paddingLeft: theme.sizes.base / 1.333,
    paddingRight: theme.sizes.base * 1.5,
  },
  searchRight: {
    top: 0,
    marginVertical: 0,
    backgroundColor: 'transparent',
  },
  searchIcon: {
    position: 'absolute',
    right: theme.sizes.base / 1.333,
    top: theme.sizes.base / 1.6,
  },
  diemquantrac:{
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    borderRadius: 25,
    shadowColor: '#7F58FF',
    shadowRadius: 5,
    shadowOffset: {height: 10},
    shadowOpacity: 0.3,
    borderWidth: 3,
    borderColor: '#FFFFFF',
  }
});
