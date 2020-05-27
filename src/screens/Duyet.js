import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Button,
  Dimensions,
  Picker,
  TextInput,
  TouchableWithoutFeedback,
  FlatList,
  Keyboard,
  StatusBar,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {RangeDatepicker, Icon, NativeDateService} from '@ui-kitten/components';
import {SearchBar, Image, Input, ListItem} from 'react-native-elements';
import Swiper from 'react-native-swiper';
import DateTimePicker from '@react-native-community/datetimepicker';

import * as theme from '../constants/theme';

import * as Animatable from 'react-native-animatable';
import {ScrollView} from 'react-native-gesture-handler';
import Loading from './Loading';
import config from '../ultilities/config';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Octicons from 'react-native-vector-icons/Octicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import BackgroundHeader from '../components/BackgroundHeader';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {Select} from 'react-native-propel-kit';
import DataTimeHour from '../DataGlobal/DataTimeHour.json';
import { GridThongSo } from './Duyet/GirdThongSo';
import RNPickerSelect from 'react-native-picker-select';
import { connect, useSelector } from 'react-redux';

const CalendarIcon = (props) => <Icon {...props} name="calendar" />;
const Rating = ({rating}) => {
  return (
    <View style={styles.rating}>
      {Array(5)
        .fill(0)
        .map((_, i) => {
          if (rating > i) {
            return (
              <AntDesign name="star" color="#FA8D00" style={{marginRight: 5}} />
            );
          }
          return <AntDesign name="staro" style={{marginRight: 5}} />;
        })}
    </View>
  );
};


const formatDateService = new NativeDateService('en', {format: 'DD/MM/YYYY'});


class Duyet extends Component {
  constructor(props) {
    super(props);

    this.state = {
      indexTram: '',
      dateFrom: new Date(Date.now()),
      dateTo: new Date(Date.now()), //new Date(Date.now()).toLocaleDateString('en-US'),
      timeTo: new Date(Date.now()),
      timeFrom: '', //this.timeTo.setTime(Date.now().getTime() + (30 * 60 * 1000)),
      convertDateFrom:'',
      convertDateTo:'',
      rangeTime: 12,
      tabIndex: 0,
      rangeDate: {},
      //Variable thực hiện load giao diện
      isDisplay: false,
      isLoading: false,
      isLoadingGird: false,
      isShowTimeTo: false,
      isShowTimeFrom: false,
      isDataNull:false,
      indexSwiper:0,
      animatible_Tram: 'fadeInUpBig',
      //Variable search
      search: '', // từ khóa tìm kiếm tên trạm
      dataTemp: null,
      dataSearch: null,

      //set gia tri cho api
      isNhaNuoc: true,
      idPhanLoai: 1, // loại 1 là nước
      idLoaiTram: 39, // nước mặc 156 nuoc thai 39
      idDiem: 46,

      //
      dataTram: [],
      dataThongSo: [],
      dataTableHeader: [],
      dataTableLeft: [],
      dataTest:[],

    };
    this.fetchData();
    this.fetchChiSoDataTram();
  }

  header = (navigation) => {
    return (
      <View style={{height: 200, width: windowWidth, paddingHorizontal: 10}}>
        <View style={styles.header}>
          <TouchableOpacity onPress={()=>navigation.goBack()}>
           <Entypo name="chevron-left" size={32} color="#fff" />
          </TouchableOpacity>
          <View style={styles.headerBody}>
            <Text style={styles.headerText}>Duyệt dữ liệu quan trắc nước</Text>
            <View style={styles.headerRightContainer}>
              <Entypo name="map" size={25} color="#fff" />
              <TouchableOpacity onPress={this.refreshGrid}>
              <Octicons
                name="settings" 
                size={25}
                color="#fff"
                style={styles.icon}
              />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <Swiper index={this.state.indexSwiper} loop={true}  style={{height: 170}}>
          <View style={{height: 100, width: windowWidth}}>
            <View style={styles.wrapperInput}>
              <AntDesign name="search1" size={18} color="gray" />
              <Picker
                style={styles.inputText}
                selectedValue={this.state.indexTram}
                mode="dialog"
                onValueChange={this.updateLoaiTram}>
                <Picker.Item label="Nước Mặt Nhà Nước" value="1" />
                <Picker.Item label="Nước Mặt Doanh Nghiệp" value="2" />
                <Picker.Item label="Nước Thải Nhà Nước" value="3" />
                <Picker.Item label="Nước Thải Doanh Nghiệp" value="4" />
              </Picker>
            </View>
            <View style={styles.wrapperInput}>
              <Feather name="map-pin" size={18} color="gray" />
              <TextInput
                style={[styles.inputText, {color: '#9770A3'}]}
                placeholder="Tên Trạm"
                onFocus={this.showDataSearch}
                onKeyPress={this.handleChangeAndDelete}
                containerStyle={{height: 30}}
                value={this.state.search}
                onChangeText={(data) => this.searchFilterFunction(data)}
              />
              {this.state.isDisplay ? (
                <TouchableWithoutFeedback
                  style={{position: 'absolute', flex: 1}}
                  onPress={this.hideDataSearch}>
                  <MaterialIcons
                    size={25}
                    name="close"
                    color={theme.colors.green}
                    style={{
                      position: 'absolute',
                      paddingRight: 0,
                      marginRight: 0,
                      right: 1,
                      paddingTop: 5,
                    }}></MaterialIcons>
                </TouchableWithoutFeedback>
              ) : null}
            </View>
          </View>
          <View
            style={{height: 250, width: windowWidth, paddingHorizontal: 10}}>
            <View style={[styles.wrapperDate, {width: windowWidth * 0.9}]}>
              <MaterialIcons name="date-range" size={18} color="gray" />
              <RangeDatepicker
                style={{height: 40, width: 250}}
                range={this.state.rangeDate}
                onSelect={(nextRange) => this.layNgayQuanTrac(nextRange)}
                accessoryRight={CalendarIcon}
                dateService={formatDateService}
                autoDismiss={false}
              />
            </View>

            <View
              style={{
                flexDirection: 'row',
                width: windowWidth * 0.9,
                justifyContent: 'space-between',
              }}>
                
              <View style={[styles.wrapperTime]}>
                <MaterialIcons name="access-time" size={18} color="gray" />
                {/* <RNPickerSelect value={this.state.rangeTime} style={{inputAndroid:{padding:10,width:windowWidth * 0.2}}}
            onValueChange={(value) => console.log(value)}
            items={DataTimeHour}/> */}
              </View>
            </View>
          </View>
        </Swiper>
      </View>
    );
  };
  ButtonDuyet = () => {
    return (
      <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
        <TouchableOpacity onPress={this.XemDuLieuQuanTrac}
          style={[
            styles.button,
            {
              borderColor: theme.colors.green,
              borderRadius: 50,
              borderWidth: 1,
              backgroundColor: theme.colors.white,
            },
          ]}>
          <Text style={{color: theme.colors.green}}>Xem</Text>
        </TouchableOpacity>
        <TouchableOpacity disabled={this.state.isLoadingGird?true:false} onPress={this.DuyetDuLieuQuanTrac}
          style={[
            styles.button,
            {
              borderColor: theme.colors.green,
              borderRadius: 50,
              borderWidth: 1,
              backgroundColor: theme.colors.white,
            },
          ]}>
          <Text style={{color: theme.colors.green}}>Duyệt</Text>
        </TouchableOpacity>
      </View>
    );
  };
  XemDuLieuQuanTrac = ()=>{
      var datefrom=this.state.dateFrom.toLocaleDateString("en-GB")+' '+this.state.timeFrom
      var dateto=this.state.dateTo.toLocaleDateString("en-GB")+' '+this.state.timeTo.toLocaleTimeString('en-GB').substr(0,5)
      this.setState({
          convertDateFrom:encodeURIComponent(datefrom),
          convertDateTo:encodeURIComponent(dateto)
      })
      this.fetchChiSoDataTram()
      console.log(datefrom + ' ' +dateto)
      console.log(this.state.convertDateFrom + ' ' +this.state.convertDateTo)

  }
  DuyetDuLieuQuanTrac= async()=>{
     if(this.state.isDataNull)
     {
      console.log(this.props.route.params.dataLogin)
      const data={
       lstChiSo:this.state.dataTram,
        auth:{
         UserName:this.props.route.params.dataLogin.userName,
         Token:this.props.route.params.dataLogin.token
        }
      }
      const requestOption ={
        method:'POST',  
        headers:{'Content-Type':'application/json'}, 
        body:JSON.stringify(data)
      }
      await fetch(`http://${config.URLIP_API}/api/Duyet/LuuDuLieu`,requestOption)
      .then(response => response.json())
      .then(data => console.log(data)); 
      this.refreshGrid()
     }
     else{
      Alert.alert("Không có dữ liệu")
     }
  }
  refreshGrid=()=>{
    this.fetchChiSoDataTram();
  }
  updateLoaiTram = async (data) => {
    console.log(data);
    this.setState({indexTram: data});
    if (data == '1') {
      await this.setState({
        isNhaNuoc: true,
        idPhanLoai: 1, // loại 1 là nước
        idLoaiTram: 39, // nước thải 39
      });
    }
    if (data == '2') {
      await this.setState({
        isNhaNuoc: false,
        idPhanLoai: 1, // loại 1 là nước
        idLoaiTram: 156, // nước mặc 156
      });
    }
    if (data == '3') {
      await this.setState({
        isNhaNuoc: true,
        idPhanLoai: 1, // loại 1 là nước
        idLoaiTram: 156, // nước thải 156
      });
    }
    if (data == '4') {
      await this.setState({
        isNhaNuoc: false,
        idPhanLoai: 1, // loại 1 là nước
        idLoaiTram: 39, // nước thải 39
      });
    }
    this.setState({
      search: '',
    });

    await this.fetchData();
  };
  componentDidMount() {
    this.setTimeFrom();  
  }
  // Hàm này để suy ra giá trị ngày bất đầu  từ biến timeTo
  setTimeFrom = () => {
    var dateTemp = new Date(this.state.timeTo);
    dateTemp.setTime(
      dateTemp.getTime() + -this.state.rangeTime * 60 * 60 * 1000,
    );
    this.setState({
      timeFrom: dateTemp.toLocaleTimeString('en-GB').substr(0, 5),
      dateFrom: dateTemp,
    });
  };
  setTimeNextPrevious = async(key) => {
    //1 previour 2 next
    console.log(this.state.dateFrom + ' - ' + this.state.dateTo);
    if (key == 2) {
      let dateTempFrom = new Date(this.state.dateFrom);
      dateTempFrom.setTime(
        dateTempFrom.getTime() + this.state.rangeTime * 60 * 60 * 1000,
      );
      let dateTempTo = new Date(this.state.dateTo);
      dateTempTo.setTime(
        dateTempTo.getTime() + this.state.rangeTime * 60 * 60 * 1000,
      );
      await this.setState({
        timeFrom: dateTempFrom.toLocaleTimeString('en-GB').substr(0, 5),
        timeTo: dateTempTo,
        dateFrom: dateTempFrom,
        dateTo: dateTempTo,
      });
      this.XemDuLieuQuanTrac();
    }
    if (key == 1) {
      let dateTempFrom = new Date(this.state.dateFrom);
      dateTempFrom.setTime(
        dateTempFrom.getTime() - this.state.rangeTime * 60 * 60 * 1000,
      );
      let dateTempTo = new Date(this.state.dateTo);
      dateTempTo.setTime(
        dateTempTo.getTime() - this.state.rangeTime * 60 * 60 * 1000,
      );
      await this.setState({
        timeFrom: dateTempFrom.toLocaleTimeString('en-GB').substr(0, 5),
        timeTo: dateTempTo,
        dateFrom: dateTempFrom,
        dateTo: dateTempTo,
      });
      this.XemDuLieuQuanTrac();
    }
  };

  layNgayQuanTrac = (nextDate) => {
    console.log(nextDate.endDate);
    this.setState({
      rangeDate: nextDate,
      dateFrom: new Date(nextDate.startDate),
      dateTo: new Date(nextDate.endDate),
    });
  };
  layThoiGianQuanTrac = (value) => {
    this.setState({
      rangeTime: value,
    });
    this.setTimeFrom();
  }; 

  fetchData = async () => {
    try {
      var URL = '';
      URL = `http://${config.URLIP}/DuLieuQuanTracServices.svc/GetDanhSachTenTram?idLoaiTram=${this.state.idLoaiTram}&isNhaNuoc=${this.state.isNhaNuoc}&idPhanLoai=${this.state.idPhanLoai}`;
      console.log(URL);

      let response = await fetch(URL);
      await this.setState({
        isLoading: true,
      });
      let reponseJson = await response.json();

      await this.setState({
        isLoading: false,
        dataTemp: reponseJson,
        dataSearch: reponseJson,
      });
    } catch (error) {
      console.error(error);
    }
  };
  fetchChiSoDataTram = async () => {
    try {
      await this.setState({
        dataTableLeft: [],
        dataTableHeader: [],
        dataThongSo: [],
        isDataNull:false,
      });
      var URL = '';
         URL = `http://${config.URLIP_API}/api/Duyet/GetDanhSachThongSoNuoc?idDiem=${this.state.idDiem}&from=03%2F01%2F2018%2010%3A00&to=03%2F01%2F2018%2010%3A30`;
    //   URL = `http://${config.URLIP_API}/api/Duyet/GetDanhSachThongSoNuoc?idDiem=${this.state.idDiem}&from=29%2F07%2F2018%2008%3A30&to=29%2F07%2F2018%2020%3A30`;
        // URL = `http://${config.URLIP_API}/api/Duyet/GetDanhSachThongSoNuoc?idDiem=${this.state.idDiem}&from=${this.state.convertDateFrom}&to=${this.state.convertDateTo}`;

      console.log(URL);
      let response = await fetch(URL);
      await this.setState({
        isLoadingGird: true,
      });
      let reponseJson = await response.json();
      console.log('=====reposejson=====');
      console.log(reponseJson);
      if(reponseJson!=null)
      {
        await this.setState({
          isLoadingGird: false,
          dataTram: reponseJson,
        });
        await this.state.dataTram.map((v, i) => {
          this.setState({
            dataThongSo: [...this.state.dataThongSo, v.ThongSo],
            dataTableHeader: [
              ...this.state.dataTableHeader,
              v.THOIDIEMDO.substr(11, 5) + ' ' + v.THOIDIEMDO.substr(20),
            ],
          });
        });
        console.log(this.state.dataThongSo);
        if (this.state.dataThongSo.length != 0) {
          await this.state.dataThongSo[0].map((v, i) => {
            this.setState({
              dataTableLeft: [...this.state.dataTableLeft, v.KYHIEU_THONGSO],
            });
          });
          this.setState({
            dataTest:this.state.dataThongSo
          })
        }
        if(this.state.dataThongSo.length==0)
        {
           await this.setState({
          isDataNull: true,
        });
        }
        console.log('===============');
        console.log(this.state.dataTableHeader);
      }
      else{
        this.setState({
          isDataNull: true,});
      }
      
    } catch (error) {
      console.error(error);
    }
  };
  renderItem = ({item, index}) => (
    <ListItem
      onPress={() => this.bindingInputTram(item)}
      title={item.tenTram}
      subtitle={item.maTram}
      leftAvatar={{source: {uri: item.avatar_url}}}
      bottomDivider
      chevron
    />
  );
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
    //khi ô search trống load lại data
    if (!text) {
      console.log('========text========');
      console.log(text);
      this.setState({
        dataSearch: this.state.dataTemp,
      });
    }
  };
  bindingInputTram = (data) => {
    console.log(data);
    this.setState({
      search: data.tenTram,
      idDiem: data.ID,
      isDisplay: false,
      //idDiem: 46,
    });
    this.fetchChiSoDataTram();
  };
  hideDataSearch = () => {
    Keyboard.dismiss();
    this.setState({
      animatible_Tram: 'fadeOutDownBig',
      isDisplay: false,
      search: '',
    });
  };
  showDataSearch = () => {
    this.setState({
      animatible_Tram: 'fadeInUpBig',
      isDisplay: true,
    });
  };
  ClickTime=()=>{
    console.log('click ok cai da')
    this.setState({
      indexSwiper:1
    })
  }
  ClickThongSo=(data)=>{ 
    console.log(data)
    const dataTempThongSo=this.state.dataThongSo 
    this.state.dataThongSo.forEach((element,index) => {
     
      let indexElement=element.findIndex(n=>n.id==data.id)
      const resultData=element.find(n=>n.id==data.id)
      
      if(indexElement!=-1)
      {
        // [index][indexElenmt]
        element.map((v,i)=>{
            if(v.id==resultData.id)
            {
              if(dataTempThongSo[index][indexElement].keyColor!="_SilverStyle")
              {
                dataTempThongSo[index][indexElement].keyColor="_SilverStyle"
              }
              else{
                dataTempThongSo[index][indexElement].keyColor="_BlueStyle"
              }
            }
        })
        this.setState(
            {
              dataThongSo:dataTempThongSo
            } 
        )
        console.log(this.state.dataThongSo)
      }
    });
  
  }
  render() {
    const {isLoadingGird,isDataNull} = this.state;
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView style={styles.container}>
          <BackgroundHeader style={styles.bg} />
          {this.header(this.props.navigation)}
          <ScrollView style={styles.scrollView}>
            {this.ButtonDuyet()}
            <View>
              <GridThongSo
               data={this.state.dataThongSo}
               dataHeader={this.state.dataTableHeader}  
               dataHeaderLeft={this.state.dataTableLeft}
               dateFrom={this.state.dateFrom}
               dateTo={this.state.dateTo}
               timeTo={this.state.timeTo
                 .toLocaleTimeString('en-GB')
                 .substr(0, 5)}
               timeFrom={this.state.timeFrom}
               Next={() => this.setTimeNextPrevious(2)}
               Previous={() => this.setTimeNextPrevious(1)}
               isLoadingGird={isLoadingGird}
               isDataNull={isDataNull}
               ClickTime={this.ClickTime}
               ClickThongSo={this.ClickThongSo}
              ></GridThongSo>
            
        
            </View>
          </ScrollView>
          {this.state.isDisplay ? (
            <Animatable.View
              animation={this.state.animatible_Tram}
              duration={1500}
              delay={0}
              useNativeDriver
              style={{
                width: windowWidth,
                height: windowHeight -200,
                bottom: 0,
                marginBottom: 0,
                paddingBottom: 0,
                backgroundColor: theme.colors.white,
              }}>
              {this.state.isLoading ? (
                <Loading />
              ) : (
                <FlatList
                  keyExtractor={(item) => item.maTram}
                  data={this.state.dataSearch}
                  renderItem={this.renderItem}
                />
              )}
            </Animatable.View>
          ) : null}
        </SafeAreaView>
      </>
    );
  }
}

const IconTenTram = (
  <Image
    source={require('../assets/image/station.png')}
    style={{height: 30, width: 30}}
  />
);

const IconLoaiTram = (
  <Image
    source={require('../assets/image/water-meter.png')}
    style={{height: 30, width: 30}}
  />
);
const mapProstoState=(state)=>{
      return {
        dataLogin:state.loginRedux
      }
}

export default Duyet;
const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;
const styles = StyleSheet.create({
  text: {
    fontSize: 30,
    alignSelf: 'center',
    color: 'red',
  },

  container: {
    flex: 1,
    backgroundColor: '#F0F1F2',
  },
  picker: {
    flex: 1,
    margin: 2,
  },
  select: {
    width: 200,
    margin: 2,
  },
  item: {
    backgroundColor: '#fff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 2,
    flex: 1,
    flexDirection: 'row',
  },
  title: {
    fontSize: 20,
    flex: 1,
  },
  bg: {
    position: 'absolute',
    width: Dimensions.get('window').width,
    height: 200,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
  },
  bg1: {
    position: 'absolute',
    width: Dimensions.get('window').width,
    height: 280,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
  },
  scrollView: {
    flex: 0.6,
  },

  header: {
    marginTop: 0,
    padding: 5,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  headerRightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {marginLeft: 12, transform: [{rotate: '-90deg'}]},
  headerBody: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  wrapperInput: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 10,
    width: windowWidth * 0.95,
  },
  wrapperDate: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 10,
  },
  wrapperTime: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 10,
    width: windowWidth * 0.3,
  },
  inputText: {
    padding: 10,
    flex: 1,
  },
  button: {
    width: 100,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    top: 10,
  },

  //

  rating: {
    flexDirection: 'row',
    marginTop: 5,
  },
  tag: {
    color: '#B066A4',
  },
  cardContainer: {
    padding: 15,
    paddingBottom: 0,
  },
  margin: {
    height: 1,
    backgroundColor: '#F0F1F2',
    width: '100%',
    marginVertical: 10,
  },
  cardBodyBottom: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardBottomTitle: {
    fontSize: 14,
    marginTop: 5,
  },
  cardGroupIcon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconMore: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  iconLike: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  cardBody: {
    padding: 15,
    backgroundColor: '#fff',
    marginTop: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  cardBodyTop: {
    flexDirection: 'row',
  },
  cardLeftSide: {
    paddingHorizontal: 10,
    flex: 1,
  },
  cardName: {
    color: '#222',
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardTime: {
    color: '#222',
    fontSize: 16,
    fontWeight: '500',
    marginTop: 5,
  },
  cardAddress: {
    color: 'gray',
    fontSize: 15,
    fontWeight: '500',
    marginTop: 5,
  },
  cardAvatar: {
    height: 60,
    width: 60,
    backgroundColor: 'gray',
    borderRadius: 60,
  },
  cardHeaderContaner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardHeading: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  cardMore: {
    fontWeight: 'bold',
    color: '#7B6C95',
  },
  faceGroup: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  faceContainer: {
    backgroundColor: '#fff',
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 20,
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    marginTop: 20,
  },
  faceText: {
    fontSize: 16,
    marginTop: 6,
  },

  headerContainer: {
    padding: 20,
    paddingHorizontal: 30,
    marginTop: 52,
  },
  heading: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
  },
  desc: {
    fontSize: 20,
    fontWeight: '400',
    color: '#fff',
    marginTop: 5,
  },
  buttonBooks: {
    flexDirection: 'row',
    marginTop: 20,
  },
  btnGradient: {
    padding: 10,
    borderRadius: 40,
  },
  btnBookText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
  },
  textHeaderDate: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#222',
  },
  textHeaderTime: {
    fontWeight: 'bold',
    fontSize: 15,
    color: theme.colors.black,
  },
});
