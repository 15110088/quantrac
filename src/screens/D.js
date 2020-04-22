import React, {Component, useState, useEffect} from 'react';
import {TouchableWithoutFeedback, StyleSheet, Dimensions,ImageBackground,ActivityIndicator} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Polyline} from 'react-native-maps';
import {Image, Button, Overlay} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import {Block, Card, Label, Input} from '../components';
import * as theme from '../constants/theme';
import {Autocomplete, AutocompleteItem} from '@ui-kitten/components';

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
import {Icon} from 'react-native-elements';
import {TouchableNativeFeedback} from 'react-native-gesture-handler';
import DialogAQI from './AQI/DialogAQI';
import TodayAQI from './AQI/TodayAQI';

const {width, height} = Dimensions.get('window');

const COORDINATES = [
  {latitude: 37.8025259, longitude: -122.4351431},
  {latitude: 37.7896386, longitude: -122.421646},
  {latitude: 37.7665248, longitude: -122.4161628},
  {latitude: 37.7734153, longitude: -122.4577787},
  {latitude: 37.7948605, longitude: -122.4596065},
  {latitude: 37.8025259, longitude: -122.4351431},
];
const region = {
  latitude: 37.78825,
  longitude: -122.4324,
  latitudeDelta: 0.09,
  longitudeDelta: 0.09,
};
const region2 = {
  latitude: 10.9597071,
  longitude: 106.8559846,
  latitudeDelta: 0.01,
  longitudeDelta: 0.01,
};
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
      isLoading:true,
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
      colorPoint: '#ffffff',
      PH: 0,
      DO: 0,
      active: null,
      value: null,
      //AQI 
      NgayTinh:null,
      chiSo:0,
      keyColor:'#fff123',
      tenTram:'NULL',
      noidungCanhBao:null,
      chatluongMT:null,


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
  }
  showDialog = (data) => {
    this.setState({
      showDialog: !this.state.showDialog,
      keyColor: '#fff123',
      chiSo: data.chiSo,
      NgayTinh: data.NgayTinh,
      tenTram:data.tenTram,
      chatluongMT: data.chatluongMT,
      noidungCanhBao:data.noidungCanhBao,
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
      <View style={styles.header}>
        <Block animated middle style={styles.search}>
          <Input placeholder="Search" />
        </Block>
        <TouchableWithoutFeedback
          onPress={() => this.showDialogTypeMonitoring('1')}>
          <Icon name="wrench" type="foundation" color="#517fa4" />
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
    } = this.state;
    const renderPannableHeader = showHeader
      ? this.renderPannableHeader
      : undefined;
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
          onPress={() =>
            this.props.navigation.push('Today', {colorPoint: colorPoint})
          }>
          <View>
            <View style={{backgroundColor: colorPoint}}>
              <Text
                style={{
                  color: '#fff',
                  alignSelf: 'center',
                  fontWeight: 'bold',
                  fontSize: 20,
                }}>
                {' '}
                Hà Nội
              </Text>
            </View>
            <View height={2} bg-dark70 />

            <View row>
              <View flex-1 style={styles.shadown}>
                <View
                  style={{
                    width: 40,
                    height: 40,
                    backgroundColor: colorPoint,
                    borderRadius: 20,
                    top: 5,
                    alignSelf: 'center',
                  }}></View>
                <View centerH style={{top: 5}}>
                  <Text style={{color: colorPoint}}>GOOD</Text>
                </View>
              </View>
              <View flex-2>
                <View row marginL-0>
                  <Icon name="clock" type="evilicon" color="#517fa4" />
                  <Text text90>10:30 02/04/2020</Text>
                </View>

                <View row>
                  <View flex-1>
                    <View centerH style={{top: 10}}>
                      <Text
                        style={{
                          top: -10,
                          color: 'gray',
                          fontSize: 30,
                          fontWeight: 'bold',
                        }}>
                        {PH}
                      </Text>
                      <Text style={{color: 'gray', top: -15, left: 5}}>
                        PH{' '}
                      </Text>
                    </View>
                  </View>
                  <View flex-1>
                    <View centerH style={{top: 10}}>
                      <Text
                        style={{
                          top: -10,
                          color: 'gray',
                          fontSize: 30,
                          fontWeight: 'bold',
                        }}>
                        {DO}
                      </Text>
                      <Text style={{color: 'gray', top: -15, left: 5}}>
                        DO{' '}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
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
         // borderRadius: 12,
          borderWidth: 1,
          borderColor: keyColor,
        }}
        visible={showDialog}
        onDismiss={this.showDialog}
        // renderPannableHeader={renderPannableHeader}
        pannableHeaderProps={this.pannableTitle}
        //supportedOrientations={this.supportedOrientations}
      >
      <TouchableWithoutFeedback onPress={this.showToday}>
        <View flex-1>
          <DialogAQI chiSo={chiSo} NgayTinh={NgayTinh} noidungCanhBao={noidungCanhBao} chatluongMT={chatluongMT} tenTram={tenTram} navigation={this.props.navigation} ></DialogAQI> 
        </View>
      </TouchableWithoutFeedback>
      </Dialog>
    );
  };
  showToday=()=>{
    this.setState({
      showDialog: !this.state.showDialog,
    });
    this.props.navigation.navigate('TodayAQI', {chiSo: this.state.chiSo,NgayTinh:this.state.NgayTinh,noidungCanhBao:this.state.noidungCanhBao,tenTram:this.state.tenTram,chatluongMT:this.state.chatluongMT})
  }
 
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
    const renderPannableHeader = showHeader
      ? this.renderPannableHeader
      : undefined;
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
      let response = await fetch(
       // 'http://25.36.7.253/DuLieuQuanTracServices.svc/GetRandomKhiTuDong?record=0',
       'http://25.36.7.253/DuLieuQuanTracServices.svc/GetRandomNuocTuDong'
      );
      await this.setState({
        isLoading:true
      })
      let reponseJson = await response.json();
      console.log(reponseJson);
      await this.props.getDataKhiTuDong(2, reponseJson);
      console.log('sau khi thay doi');
      await console.log(this.props.data);
      await this.setState({
        isLoading:false
      })
    } catch (error) {
      console.error(error);
    }
  };
  render() {
    var {data} = this.props.data;
    var {addNumber, subNumber, xacdinhmau, navigation} = this.props;
    const {typeMonitoring} = this.state;
    return (
      
      //       <>
      //       {this.state.isLoading? <ActivityIndicator size="large" color="#0000ff" />:
      //       <>
      //       {this.renderHeader()}
      //       <MapView
      //       provider={PROVIDER_GOOGLE} // remove if not using Google Maps
      //       style={{flex:1}}
      //       region={region2}>
      //       {
      //         this.props.data.map((marker,index)=>{
      //           console.log('=====')
      //           console.log(parseFloat(marker.toaDoX))
      //           console.log(parseFloat(marker.toaDoY))
      //           return (
                    
      //                 <MapView.Marker onPress={() => this.showDialog(marker)} key={marker.id} coordinate={{latitude:parseFloat(marker.toaDoX), longitude: parseFloat(marker.toaDoY)}} >
      //                <TouchableWithoutFeedback >

      //                       <View style={{  alignItems: "center",
      //                               justifyContent: "center",
      //                               width: 40,
      //                               height: 40,
      //                               borderRadius: 20,
      //                               backgroundColor: marker.colorHerder,
      //                              position: "absolute",
      //                              marginTop: -60,
      //                                 shadowColor: "#7F58FF",
      //                                 shadowRadius: 5,
      //                                 shadowOffset: { height: 10 },
      //                                 shadowOpacity: 0.3,
      //                                 borderWidth: 3,
      //                                 borderColor: "#FFFFFF"}}>
      //                       <Text style={{ fontWeight:'bold',fontSize:18 ,color:'white' }}>{marker.PH}</Text>
      //                   </View>

      //                 </TouchableWithoutFeedback>
      //                 </MapView.Marker>

      //           );
      //         })
      //       }

      //     </MapView> 
      //     {this.renderDialogAQI()}
      //     {this.renderDialogTypeMonitoring()}
      //     </>
      //     }
      // </>

      <>
        {this.renderHeader()}
        <Text>D</Text>
   
        
        {this.state.isLoading? <ActivityIndicator size="large" color="#0000ff" />:null}
        
        {this.props.data.map((marker, index) => {
          console.log(marker);
          //console.log(marker.COORDINATES[0])
          return (
            <TouchableWithoutFeedback
              key={index}
              onPress={() => this.showDialog(marker)}>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: '#fff',
                  shadowColor: '#7F58FF',
                  shadowRadius: 5,
                  shadowOffset: {height: 10},
                  shadowOpacity: 0.3,
                  borderWidth: 3,
                  borderColor: '#FFFFFF',
                }}>
                <Text
                  style={{fontWeight: 'bold', fontSize: 18, color: '#fff123'}}>
                  {marker.chiSo}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          );
        })}

        {this.renderDialogAQI()}
        {this.renderDialogTypeMonitoring()}
        <Button
          title="B"
          onPress={() => this.props.navigation.navigate('History')}></Button>
        <Button
          title="Setting"
          onPress={() => this.showDialogTypeMonitoring('1')}></Button>
          
      </>
    );
  }
}

export default D;

const styles = StyleSheet.create({
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
    borderWidth:1,

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
    justifyContent: 'flex-end',

    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 10 * 1.5,
  },
  headerTitle: {
    color: theme.colors.gray,
  },
  headerLocation: {},
  search: {
    height: theme.sizes.base * 2,
    width: width - theme.sizes.base * 2,
  },
  searchInput: {
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


  
});
