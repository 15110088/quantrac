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
  TouchableHighlight,
  TextInput,
  Keyboard,
  TouchableOpacity,
  View
} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Polyline} from 'react-native-maps';
import {Image, Button, Overlay, Card,Divider } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import {Block, Label, Input} from '../components';
import * as theme from '../constants/theme';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Modal from 'react-native-modalbox';

import { 
  Text,
  
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
import BackgroundHeader from '../components/BackgroundHeader';
import DialogType from './TrangChu/DialogType';

const {width, height} = Dimensions.get('window');
 
var screen = Dimensions.get('window');

class D extends Component {
  constructor(props) {
    super(props);
    this.SCROLL_TYPE = {
      NONE: 'none',
      VERTICAL: 'vertical',
      HORIZONTAL: 'horizontal',
    }; 
    this.state = {
      isVisibleSearchBar: false,// hiển hị thanh tìm kiếm 
      isShow: false,
      isLoading: true,
      //dialog
      panDirection: PanningProvider.Directions.UP,
      position: 'center',
      scroll: this.SCROLL_TYPE.NONE,
      showHeader: true,
      isRounded: true,
      showDialog: false,
      typeMonitoring: this.props.route.params.typeMonitoring, //1 nuoc 2 khong khi
      //WQI
      colorPoint: '#fff123',
      PH: {GiaTri:0},
      DO: {},
      active: null,
      value: null,
      isOpen: false,

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
  UNSAFE_componentWillMount() {
    //this.xulysolieu()
    this.fetchData(this.state.typeMonitoring);
   // this.fetchDataSearch();
  }
  
  showDialog = (data) => {
    this.setState({
      showDialog: !this.state.showDialog,
      //chỉ sổ chung 
      keyColor: data.keyColor, 
      NgayTinh: data.NgayTinh,
      tenTram: data.tenTram,
      chatluongMT: data.chatluongMT,
      noidungCanhBao: data.noidungCanhBao,
      maTram: data.maTram,
      //AQI
      chiSo: data.chiSo,
      //WQI
      PH:data.PH,
      DO:data.DO,
      //colorPoint:data.keyColor
    });
    //show dialog Aqi
     
    if(this.state.typeMonitoring==2){
       this.refs.DialogAQI.open()
     }
     if(this.state.typeMonitoring==1)
     {
      this.DialogWQI.open()
     }
  };
  showDialogTypeMonitoring = (data) => {
    
  };
 
  renderHeader() {
    return (
      <>
      <BackgroundHeader style={[styles.bg, {height:50}]} />
      <View style={styles.header}>
      <View style={styles.headerBody}>
              <TouchableOpacity
                onPress={() =>  this.props.navigation.openDrawer()}>
                <Entypo name="menu" size={32} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>this.DialogType.open()}>
              <View style={{flexDirection:'row'}}>
              <Text style={styles.headerText}>Water</Text><View style={{paddingTop:3}}><Entypo name="chevron-small-down"  size={25} color="#fff" /></View>
              </View>
              </TouchableOpacity>
         
              <TouchableOpacity  onPress={()=>{!this.state.isLoading && this.setState({isVisibleSearchBar:!this.state.isVisibleSearchBar})}}>
                <FontAwesome5 name="search-location" size={25} color="#fff" />
              </TouchableOpacity>
      </View>
      </View>
      </>
    );
  }
  renderSearh(){
    return(
      <View
      style={{
       backgroundColor: 'transparent',
        marginTop:10,
        borderRadius: 60,
        borderWidth:2,
        borderColor:theme.colors.gray,
        marginHorizontal:15,
        position:'absolute',
        alignSelf:'center',
        width:width*0.9
        
      }}>
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
          backgroundColor:'white'
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
          paddingTop: 2,
        }}>
        </MaterialIcons>
      </TouchableWithoutFeedback>:null}
    </View>
    )
 
  }
  renderSearchDialog(){
    return(
      <ScrollView
      style={{
        width: '100%',
        height: 200,
        position: 'absolute',
        backgroundColor: 'transparent',
        marginTop:50,
      }}>     
      {this.state.displaySearch
        ? this.state.dataSearch.map((v, i) => {
            return (
              <TouchableWithoutFeedback key={i}
                onPress={() => this.selectIndex(v.maTram,v.tenTram)}>
                 <View style={{flex:1,marginHorizontal:20,height:45,backgroundColor:theme.colors.gray}} >
                  <View style={{flex:1,flexDirection:'row',alignItems:'center'}}>
                      <Text style={{paddingHorizontal:10,color:theme.colors.white}}>
                    <Entypo name="location"></Entypo> {v.tenTram} 
                    </Text>
                  </View>
                  <Divider style={{height: 2, backgroundColor: theme.colors.gray3 }} />

                </View>
              </TouchableWithoutFeedback>
            );
          })
        : null}
    </ScrollView>
    )
     
    
  
  }
  renderDialogWQI = () => {
    const {
      PH,
      DO,
      NgayTinh,
      tenTram,
      maTram,
      keyColor
    } = this.state;
    return (
      <Modal
      ref={(refs)=>{this.DialogWQI=refs}}
      style={[styles.modal3]}
      position={'center'}
      useNativeDriver={true}
      >      
        <TouchableWithoutFeedback onPress={this.showTodayWQI}>
        <View style={styles.modal3}>
             <DialogWQI PH={PH} DO={DO} 
              NgayTinh={NgayTinh}
              tenTram={tenTram}
              maTram={maTram}
              colorPoint={keyColor}
          ></DialogWQI>
          </View>
         
        </TouchableWithoutFeedback>
      </Modal>
    );
  };

  renderDialogAQI = () => {
    const {
      keyColor,
      chiSo,
      NgayTinh,
      tenTram,
      maTram,
      noidungCanhBao,
      chatluongMT,
    } = this.state;
    return (
          
        <Modal
          ref={'DialogAQI'}
          style={[styles.modal, styles.modal3]}
          position={'center'}
          useNativeDriver={true}
          >       
         <TouchableWithoutFeedback  onPress={this.showTodayAQI}>
             <View style={styles.modal3}>
            <DialogAQI
              chiSo={chiSo}
              NgayTinh={NgayTinh}
              noidungCanhBao={noidungCanhBao}
              chatluongMT={chatluongMT}
              tenTram={tenTram}
              maTram={maTram}
              keyColor={keyColor}
              navigation={this.props.navigation}>
              </DialogAQI>
            </View> 
          </TouchableWithoutFeedback> 
        </Modal>
      
       
    );
  };

  renderDialogType=()=>{
    return(
      <Modal
      ref={(refs)=>this.DialogType=refs}
      style={[styles.modalType]}
      position={'bottom'}
      useNativeDriver={true}
      >  
      <DialogType chonloai={this.chonLoaiQuanTrac} type={this.state.typeMonitoring}></DialogType>
      </Modal>
    )
  }

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
      this.refs.DialogAQI.close()
  };

  showTodayWQI = () => {
    this.setState({
      showDialog: !this.state.showDialog,
    });
    this.props.navigation.push('Today', {
      colorPoint: this.state.keyColor,
      PH:this.state.PH,
      DO:this.state.DO,
      tenTram:this.state.tenTram,
      maTram :this.state.maTram,
      NgayTinh:this.state.NgayTinh
    })
  };


  chonLoaiQuanTrac = async(loai) => {
    console.log(loai) //1 nuoc 2 khi
    if(loai==2)
    {
      await this.setState({
        typeMonitoring:loai
      })
      await this.fetchData(loai) 
      this.DialogType.Close()
    }
    if(loai==1)
    {
      await this.fetchData(loai)

      await this.setState({
        typeMonitoring:loai
      })
      this.DialogType.Close()

    }

   

    // const {active} = this.state;
    // console.log(id);
   
    // await this.setState({
    //   active: active === id ? null : id,
    //   showDialogType: !this.state.showDialogType,
    //   typeMonitoring: id == 'Air' ? 2 : 1,
    // });
    // if(id!='Air')
    // {
    //   this.fetchData()
    // }
  };

  
  fetchData = async (loai) => {
    try {
      var URL=''
      if(loai==1)
      {
        //URL=`http://${config.URLIP}/DuLieuQuanTracServices.svc/GetRandomNuocTuDong?record=0`
        URL=`http://${config.URLIP_API}/api/Client/GetNuocTuDong`
        console.log(URL)
      }
      if(loai==2)
      {
        URL=`http://${config.URLIP}/DuLieuQuanTracServices.svc/GetRandomKhiTuDong?record=0`
        console.log(URL)
      }
      let response = await fetch(URL);
      await this.setState({
        isLoading: true,
      });
      let reponseJson = await response.json();
      await this.props.getDataKhiTuDong(2, reponseJson);
      //await this.xulysolieu();
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
  GetLocation=()=>{
    console.log("Click location")
    this.setState({
      region: {
        latitude: 10.9597071,
        longitude: 106.8559846,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }
    });
  }
  render() {
    var {addNumber, subNumber, xacdinhmau, navigation,data} = this.props;
    const {typeMonitoring} = this.state;
    console.log(this.state.isLoading)
    console.log('loai '+typeMonitoring)
    console.log(data)
    return (
    //   <>
    //     {this.renderHeader()} 
    //     <View style={{flex: 1, backgroundColor: '#fff'}}>
    //     {/* <ActivityIndicator size="large" color="#0000fr" style={{position:'absolute'}} /> */}
    //           <MapView
    //           //   provider={PROVIDER_GOOGLE} // remove if not using Google Maps
    //              ref={ref => {
    //               this.map = ref;
    //             }}
    //             style={{flex: 3}}
    //             region={this.state.region}>
    //             {!this.state.isLoading && this.props.data.map((marker, index) => {
    //               console.log(    'x '+ parseFloat(marker.toaDoX)+
    //             'y '+parseFloat(marker.toaDoY))
    //               return (
    //                 <MapView.Marker
    //                   onPress={() => this.showDialog(marker)}
    //                   key={index}
    //                   coordinate={{
    //                   latitude: parseFloat(marker.toaDoX),
    //                   longitude: parseFloat(marker.toaDoY),
    //                   }}>
    //                   <TouchableWithoutFeedback>
    //                     <View
    //                       style={[styles.diemquantrac,{backgroundColor: marker.keyColor}]
    //                       }>
    //                       <Text
    //                         style={{
    //                           fontWeight: 'bold',
    //                           fontSize: 18,
    //                           color: 'white',
    //                         }}>
    //                        {this.state.typeMonitoring==1?marker.PH.GiaTri:marker.chiSo} 
    //                       </Text>
    //                     </View>
    //                   </TouchableWithoutFeedback>
    //                 </MapView.Marker>
    //               );
    //             })}
    //           </MapView>
           
    //       {this.state.isVisibleSearchBar&&this.renderSearh()} 
    //       {this.state.displaySearch&&this.renderSearchDialog()}
    //       {this.state.typeMonitoring==1?   this.renderDialogWQI(): this.renderDialogAQI()}

    //       <TouchableOpacity style={{width:40,height:40,bottom:60,right:10,position:'absolute'}} onPress={this.GetLocation}>
    //           <MaterialIcons
    //             size={35}
    //             name="my-location"
    //             color={theme.colors.green}
    //             style={{
    //             }}>
    //           </MaterialIcons>
    //              </TouchableOpacity>
    //       <View style={{ position: "absolute",
    //           right: 0,
    //           left: 0,
    //           bottom: 0,
    //           paddingBottom: theme.sizes.base * 2}}>
    //             <LevelAQI></LevelAQI>
    //       </View>    
    //     </View>
    // </>



      <>
        <View style={{flex: 1, backgroundColor: theme.colors.white}}>
          {this.renderHeader()}
          <View style={{flex: 1,height:200, backgroundColor: 'white'}}>
            {this.state.isLoading &&<ActivityIndicator size="large" color="#0000fr" />}
            {
            this.props.data.map((marker, index) => {
            
              return (
                !this.state.isLoading&&
                <TouchableWithoutFeedback
                  key={index}
                  onPress={() => this.showDialog(marker)}>
                  <View
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 50,
                      height: 50,
                      borderRadius: 25,
                      backgroundColor: marker.keyColor,
                      shadowColor: '#7F58FF',
                      shadowRadius: 5,
                      shadowOffset: {height: 10},
                      shadowOpacity: 0.3,
                      borderWidth: 3,
                      borderColor: '#FFFFFF',
                    }}>
                    <Text
                      style={{
                        fontWeight: 'bold',
                        fontSize: 18,
                        color: '#000',
                      }}>
                     {this.state.typeMonitoring==1&&marker.PH.GiaTri} 
                     {this.state.typeMonitoring==2&&marker.chiSo}
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              );
            })
            }
           {this.state.isVisibleSearchBar&&this.renderSearh()} 
           {this.state.displaySearch&&this.renderSearchDialog()}
           {this.state.typeMonitoring==1?this.renderDialogWQI(): this.renderDialogAQI()}
           {this.renderDialogType()}
            <Button
              title="B"
              onPress={() =>
                this.props.navigation.navigate('History')
              }></Button>
            <Button
              title="Setting"
              onPress={() => this.showDialogTypeMonitoring('1')}></Button>

      
        <TouchableHighlight
          style={{width: 50}}
          onPress={() => this.refs.nghia.open()}>
          <View style={{width: 50, height: 50, backgroundColor: '#4567e3'}}></View>
        </TouchableHighlight>

        <TouchableOpacity onPress={this.GetLocation}>
        <View style={{position:'absolute',width:40,height:40,right:50,bottom:0,borderWidth:2,alignSelf:"flex-end"}}>
        <MaterialIcons
          size={35}
          name="my-location"
          color={theme.colors.green}
          style={{
          }}>
          </MaterialIcons>
        </View>
        </TouchableOpacity>

        
        <TouchableOpacity onPress={this.GetLocation}>
        <View style={{position:'absolute',width:40,height:40,right:100,bottom:0,borderWidth:2,alignSelf:"flex-end"}}>
        <Entypo
          size={35}
          name="air"
          color={theme.colors.green}
          style={{
          }}>
          </Entypo>
        </View>
        </TouchableOpacity>

            <View style={{ position: "absolute",
                  right: 0,left: 0,bottom: 0,borderWidth:2,
                  paddingBottom: theme.sizes.base * 2}}>
              <LevelAQI></LevelAQI>
          </View>
          </View>
        </View>
      </>
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
  
  button: {
    margin: 5,
    alignSelf: 'flex-start',
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
 
 
  
 
  search: {
    flex: 1,
    justifyContent: 'space-between',
    height: theme.sizes.base * 4,
    width: width - theme.sizes.base * 2,
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
  },
  modal3: {
    height: 150,
    width: screen.width - 50,
    borderRadius: 20,
  },
  modalType: {
    height: 200,
    width: screen.width,
    borderTopLeftRadius: 20,
    borderTopRightRadius:20,
    borderBottomWidth:0.5
  },
  shadow: { 
    flex:0.4,
    flexDirection:'row',
    backgroundColor:'#10d60f',
    borderRadius:20,
       shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 7,
  },
  shadowOpacity: 0.43,
  shadowRadius: 9.51,
  
  elevation: 15,
      },
      bg: {
        position: 'absolute',
        width: Dimensions.get('window').width,
        height: 50,
        borderBottomRightRadius: 0,
        borderBottomLeftRadius: 0,
      },
      header: {
        marginTop: 0,
        padding: 5,
        //flex:1,
      },
      headerBody: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
      },

    });
