import React, {Component} from 'react';
import {
  View,
  Text,
  StatusBar,
  Button,
  Image,
  FlatList,
  ListRenderItem,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import BackgroundHeader from '../components/BackgroundHeader';
import * as theme from '../constants/theme';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Octicons from 'react-native-vector-icons/Octicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {connect, useDispatch, useSelector} from 'react-redux';
import {SearchBar, Input, ListItem} from 'react-native-elements';

import * as Animatable from 'react-native-animatable';
import {loginAction} from '../reducer/action/LoginAction';

const data = [
  {
    id: 1,
    name: 'Đăng Nhập',
    code: 'dangnhap',
    iconName: 'login',
    iconColor: '#191919',
    iconBackgroud: '#D1D1D1',
    isLogin: 'False',
  },
  {
    id: 2,
    name: 'Duyệt',
    code: 'duyet',
    iconName: 'new-message',
    iconColor: '#7F7DF5',
    iconBackgroud: '#DEDEFD',
    isLogin: 'True',
  },
  {
    id: 3,
    name: 'Thiết Lập Cảnh Báo',
    code: 'canhbao',
    iconName: 'warning',
    iconColor: '#EDAE01',
    iconBackgroud: '#F5FF9C',
    isLogin: 'True',
  },
  {
    id: 5,
    name: 'Nhật Ký',
    code: 'nhatky',
    iconName: 'open-book',
    iconColor: '#F87619',
    iconBackgroud: '#FEE3CF',
    isLogin: 'True',
  },
  {
    id: 6,
    name: 'Đăng Xuất',
    code: 'dangxuat',
    iconName: 'log-out',
    iconColor: '#191919',
    iconBackgroud: '#D1D1D1',
    isLogin: 'True',
  },
];

class UserInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refersh: false,
    };
    this.props.navigation.addListener('focus', this.refershScreen);
  }

  refershScreen = () => {
    this.setState({
      refersh: !this.state.refersh,
    });
  };
  renderItem = ({item, index}) => {
    if (this.props.dataLogin.isLogin.trim() == item.isLogin.trim()) {
      return (
        <ListItem
          onPress={() => this.SelectMenu(item)}
          title={item.name}
          titleStyle={{fontSize: 16, fontWeight: 'bold', color: '#5D5D5D'}}
          rightIcon={
            <Entypo name="chevron-right" size={25} color="#5D5D5D"></Entypo>
          }
          leftElement={
            <View
              style={[styles.iconMenu, {backgroundColor: item.iconBackgroud}]}>
              <Entypo
                name={item.iconName}
                size={25}
                color={item.iconColor}></Entypo>
            </View>
          }
          bottomDivider
        />
      );
    }
  };
  SelectMenu = async (data) => {
    switch (data.code) {
      case 'dangnhap':
          {
            this.props.navigation.navigate('Tabs', {
                screen: 'Login',
              });
              break;
          }
      case 'dangxuat':
          {
            const data = {
                ketQua: 'Đăng Xuất Thành Công',
                trangThai: 'False',
                tenDangNhap: 'Đăng Nhập', 
                matKhau: '',
              };
              await this.props.SaveLogin(
                data.tenDangNhap,
                data.matKhau,
                data.trangThai,
              );
              this.props.navigation.navigate('Tabs', {
                screen: 'Login',
              });
              break;
          }
    

      case 'duyet':
          {
            this.props.navigation.navigate('Tabs', {
                screen: 'Duyet',
                dataLogin: this.props.dataLogin,
              });
          }
        break;

        case 'canhbao':{
            this.props.navigation.navigate('Tabs', {
                screen: 'DanhSachNguoiDung',
              });
        }
      
    }

    // if (data.code == 'duyet') {
    //   this.props.navigation.navigate('Tabs', {
    //     screen: 'Duyet',
    //     dataLogin: this.props.dataLogin,
    //   });
    //   //  DanhSachNguoiDung
    // }
  };

  render() {
    console.log(this.state.refersh);
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView style={styles.container}>
          <BackgroundHeader style={[styles.bg, {}]} />
          <View style={styles.header}>
            <View style={styles.headerBody}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Map')}>
                <Entypo name="chevron-left" size={32} color="#fff" />
              </TouchableOpacity>
              <Text style={styles.headerText}>User</Text>
              <TouchableOpacity>
                <MaterialIcons name="notifications" size={32} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              height: windowHeight * 0.35,
              alignItems: 'center',
              paddingTop: 15,
            }}>
            <Image
              source={require('../assets/image/logo.png')}
              style={[styles.image]}></Image>
            <Text style={styles.UserNameText}>
              {this.props.dataLogin.userName}
            </Text>
          </View>
          <View style={styles.body}>
            <FlatList
              extraData={this.state.refersh}
              scrollEnabled={true}
              data={data}
              keyExtractor={data.id}
              renderItem={this.renderItem}></FlatList>
          </View>
        </SafeAreaView>
      </>
    );
  }
}
const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;
const mapProstoState = (state) => {
  return {
    dataLogin: state.loginRedux,
  };
};
const mapDispatchtoProps = (dispatch, props) => {
  // muon them action viet vao day
  return {
    SaveLogin: (userName, token, islogin) =>
      dispatch(loginAction(userName, token, islogin)),
  };
};

export default connect(mapProstoState, mapDispatchtoProps)(UserInfo);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F1F2',
  },
  body: {
    width: windowWidth,
    height: windowHeight * 0.39,
    backgroundColor: theme.colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 10,
  },
  bg: {
    position: 'absolute',
    width: Dimensions.get('window').width,
    height: windowHeight,
  },
  bg1: {
    position: 'absolute',
    width: Dimensions.get('window').width,
    height: 50,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: theme.colors.green,
  },
  header: {
    marginTop: 0,
    padding: 5,
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
  UserNameText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#231b12',
  },
  iconMenu: {
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,

    elevation: 11,
  },
});
