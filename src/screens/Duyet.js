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
} from 'react-native';
import {
  Layout,
  Tab,
  TabView,
  IndexPath,
  Select,
  SelectGroup,
  SelectItem,
} from '@ui-kitten/components';
import {SearchBar, Image, Input, ListItem} from 'react-native-elements';
import {Divider, List} from '@ui-kitten/components';

import * as theme from '../constants/theme';

import DatePicker from 'react-native-datepicker';
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

const dataTest = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
];

function ItemThongSo({data}) {
  console.log('==da==');

  console.log(data);
  const title = [data[0]];
  //console.log(title)
  return (
    <>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          backgroundColor: '#e4e6eb',
          padding: 20,
          margin: 16,
          borderRadius: 16,
        }}>
        {title.map((v, i) => {
          return (
            <View style={{width: 90}}>
              <Text>{v.KYHIEU_THONGSO}</Text>
            </View>
          );
        })}
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          backgroundColor: '#e4e6eb',
          padding: 20,
          margin: 16,
          borderRadius: 16,
        }}>
        {data.map((v, i) => {
          return (
            //  <Text style={styles.title}>{v.GIATRISO}</Text>
            <View style={{width: 90}}>
              <Text style={styles.title}>{v.GIATRISO}</Text>
            </View>
          );
        })}
      </View>
    </>
  );
}

class Duyet extends Component {
  state = {
    indexTram: '',
    dateFrom: '',
    dateTo: '',
    tabIndex: 0,

    //Variable thực hiện load giao diện
    isDisplay: false,
    isLoading: false,
    animatible_Tram: 'fadeInUpBig',
    //Variable search
    search: '', // từ khóa tìm kiếm tên trạm
    dataTemp: null,
    dataSearch: null,

    //set gia tri cho api
    isNhaNuoc: true,
    idPhanLoai: 1, // loại 1 là nước
    idLoaiTram: 156, // nước mặc 156
    idDiem: 46,

    //
    dataTram: [],
    dataThongSo: [],
  };
  header = () => {
    return (
      <View style={styles.header}>
        <Entypo name="chevron-left" size={32} color="#fff" />
        <View style={styles.headerBody}>
          <Text style={styles.headerText}>Search</Text>
          <View style={styles.headerRightContainer}>
            <Entypo name="map" size={25} color="#fff" />
            <Octicons
              name="settings"
              size={25}
              color="#fff"
              style={styles.icon}
            />
          </View>
        </View>
        <View>
          <View style={styles.wrapperInput}>
            <AntDesign name="search1" size={18} color="gray" />
            {/* <TextInput style={styles.inputText} value="Ho Chi Minh" /> */}
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
            <Text>12</Text>
          </View>
        </View>
      </View>
    );
  };
  updateLoaiTram = async (data) => {
    console.log(data);
    this.setState({indexTram: data});
    if (data == '1') {
      await this.setState({
        isNhaNuoc: true,
        idPhanLoai: 1, // loại 1 là nước
        idLoaiTram: 156, // nước mặc 156
      });
    }
    if (data == '3') {
      await this.setState({
        isNhaNuoc: true,
        idPhanLoai: 1, // loại 1 là nước
        idLoaiTram: 39, // nước thải 39
      });
    }

    await this.fetchData();
  };
  updateSearch = (search) => {
    this.setState({search});
  };
  SelectTab = (index) => {
    this.setState({
      tabIndex: index,
    });
  };
  componentWillMount() {
    this.fetchData();
  }
  keyExtractor = (item, index) => index.toString();
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
  fetchDataTram = async () => {
    try {
      var URL = '';
      URL = `http://${config.URLIP_API}/api/Duyet/GetDanhSachThongSoNuoc?idDiem=${this.state.idDiem}&from=03%2F01%2F2018%2010%3A00&to=03%2F01%2F2018%2010%3A30`;
      console.log(URL);
      let response = await fetch(URL);
      await this.setState({
        isLoading: true,
      });
      let reponseJson = await response.json();

      await this.setState({
        isLoading: false,
        dataTram: reponseJson,
      });
      await this.state.dataTram.map((v, i) => {
        //console.log(JSON.parse(v.ThongSo));
        //const newItem = JSON.parse()
        this.setState({
          dataThongSo: [...this.state.dataThongSo, v.ThongSo],
        });
      });
      console.log('===============');
      console.log(this.state.dataThongSo);
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
    //khi ô search trống load lại data
    if (!text) {
      console.log('========text========');
      console.log(text);
      this.setState({
        dataSearch: this.state.dataTemp,
      });
    }
  };
  BindingInputTram = (data) => {
    console.log(data);
    this.setState({
      search: data.tenTram,
      idDiem: data.ID,
    });
    this.fetchDataTram();
  };
  renderItem = ({item, index}) => (
    <ListItem
      onPress={() => this.BindingInputTram(item)}
      title={item.tenTram}
      subtitle={item.maTram}
      leftAvatar={{source: {uri: item.avatar_url}}}
      bottomDivider
      chevron
    />
  );

  renderItemTable = (item) => {
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>;
  };
  handleChangeAndDelete(event) {
    console.log(event);
  }
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
  render() {
    return (
      // <SafeAreaView style={styles.container}>
      //   <TabView
      //     selectedIndex={this.state.language}
      //     onSelect={(index) => this.SelectTab(index)}>
      //     <Tab title="Trạm">
      //       <Layout style={{height: 80}}>
      //         <View style={{flex: 1, flexDirection: 'row'}}>
      //           <View style={{paddingTop: 10}}>{IconLoaiTram}</View>
      //           <View style={{width: 220}}>
      //             <Picker
      //               selectedValue={this.state.indexTram}
      //               mode="dropdown"
      //               onValueChange={this.updateLoaiTram}>
      //               <Picker.Item label="Nước Mặt Nhà Nước" value="1" />
      //               <Picker.Item label="Nước Mặt Doanh Nghiệp" value="2" />
      //               <Picker.Item label="Nước Thải Nhà Nước" value="3" />
      //               <Picker.Item label="Nước Thải Doanh Nghiệp" value="4" />
      //             </Picker>
      //             {/* <Text style = {styles.text}>{this.state.user}</Text> */}
      //           </View>
      //         </View>
      //         <View style={{paddingBottom: 10, flexDirection: 'row'}}>
      //           {IconTenTram}
      //           <Input
      //             placeholder="Tên Trạm"
      //             onFocus={this.showDataSearch}
      //             onKeyPress={this.handleChangeAndDelete}
      //             containerStyle={{height: 30}}
      //             value={this.state.search}
      //             onChangeText={(data) => this.searchFilterFunction(data)}
      //           />
      //           {this.state.isDisplay ? (
      //             <TouchableWithoutFeedback
      //               style={{position: 'absolute', flex: 1}}
      //               onPress={this.hideDataSearch}>
      //               <MaterialIcons
      //                 size={25}
      //                 name="close"
      //                 color={theme.colors.green}
      //                 style={{
      //                   position: 'absolute',
      //                   paddingRight: 0,
      //                   marginRight: 0,
      //                   right: 0,
      //                   paddingTop: 5,
      //                 }}></MaterialIcons>
      //             </TouchableWithoutFeedback>
      //           ) : null}
      //         </View>
      //       </Layout>
      //     </Tab>
      //     <Tab title="Thời Gian">
      //       <Layout style={{borderWidth: 1, height: 80, flexDirection: 'row'}}>
      //         <View style={{flex: 1}}>
      //           <DatePicker
      //             style={{width: 150}}
      //             date={this.state.dateFrom}
      //             mode="date"
      //             placeholder="select date"
      //             format="DD-MM-YYYY"
      //             androidMode="calendar"
      //             confirmBtnText="Confirm"
      //             cancelBtnText="Cancel"
      //             customStyles={{
      //               dateIcon: {
      //                 position: 'absolute',
      //                 left: 0,
      //                 top: 4,
      //                 marginLeft: 0,
      //               },
      //               dateInput: {
      //                 marginLeft: 36,
      //                 height: 20,
      //                 borderRadius: 5,
      //               },
      //             }}
      //             onDateChange={(date) => {
      //               this.setState({dateFrom: date});
      //             }}
      //           />
      //         </View>
      //         <View style={{flex: 1}}>
      //           <DatePicker
      //             style={{width: 150}}
      //             date={this.state.dateTo}
      //             mode="date"
      //             placeholder="select date"
      //             format="DD-MM-YYYY"
      //             androidMode="calendar"
      //             confirmBtnText="Confirm"
      //             cancelBtnText="Cancel"
      //             customStyles={{
      //               dateIcon: {
      //                 position: 'absolute',
      //                 left: 0,
      //                 top: 4,
      //                 marginLeft: 0,
      //               },
      //               dateInput: {
      //                 marginLeft: 36,
      //                 height: 20,
      //                 borderRadius: 5,
      //               },
      //               // ... You can check the source to find the other keys.
      //             }}
      //             onDateChange={(date) => {
      //               this.setState({dateTo: date});
      //             }}
      //           />
      //         </View>
      //       </Layout>
      //     </Tab>
      //     <Tab title="Khác">
      //       <Layout style={styles.tabContainer}>
      //         <Text category="h5">TRANSACTIONS</Text>
      //       </Layout>
      //     </Tab>
      //   </TabView>
      //   <View style={{flex: 1, borderWidth: 2}}>
      //     <ScrollView horizontal={true} style={{flex: 1}}>
      //       {/* Table */}
      //       <FlatList
      //         horizontal={false}
      //         data={this.state.dataThongSo}
      //         ListHeaderComponent={()=><Text>sss</Text>}
      //         renderItem={({item}) => <ItemThongSo data={item} />}
      //         // keyExtractor={item => item.id}
      //       />
      //     </ScrollView>
      //     {this.state.isDisplay ? (
      //       <Animatable.View
      //         animation={this.state.animatible_Tram}
      //         duration={1500}
      //         delay={0}
      //         useNativeDriver
      //         style={{
      //           width: windowWidth,
      //           height: windowHeight / 2,
      //           bottom: 0,
      //           marginBottom: 0,
      //           paddingBottom: 0,
      //           backgroundColor: 'green',
      //         }}>
      //         {/* <SearchBar
      //       containerStyle={{backgroundColor:theme.colors.green,height:30}}
      //       inputContainerStyle={{backgroundColor:theme.colors.white}}
      //       inputStyle={{color:theme.colors.green}}
      //       placeholder="Tên Trạm"
      //       onChangeText={this.updateSearch}
      //       value={this.state.search}/> */}
      //         {this.state.isLoading ? (
      //           <Loading />
      //         ) : (
      //           <FlatList
      //             keyExtractor={this.keyExtractor}
      //             data={this.state.dataSearch}
      //             renderItem={this.renderItem}
      //           />
      //         )}
      //       </Animatable.View>
      //     ) : null}
      //   </View>
      // </SafeAreaView>
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView style={styles.container}>
          <BackgroundHeader style={styles.bg} />
          <ScrollView style={styles.scrollView}>{this.header()}</ScrollView>
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

export default Duyet;
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  text: {
    fontSize: 30,
    alignSelf: 'center',
    color: 'red',
  },
  tabContainer: {
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
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
    fontSize: 32,
    flex: 1,
  },
  bg: {
    position: 'absolute',
    width: Dimensions.get('window').width,
    height: 250,
  },
  bg1: {
    position: 'absolute',
    width: Dimensions.get('window').width,
    height: 280,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
  },
  scrollView: {
    flex: 1,
  },

  header: {
    marginTop: 0,
    padding: 15,
  },
  headerText: {
    fontSize: 32,
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
    paddingHorizontal: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  inputText: {
    padding: 10,
    flex: 1,
    
      },
});
