import React, {Component,useEffect,useState} from 'react';
import {View, Text,StyleSheet,Image,Dimensions,Alert} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator,DrawerContentScrollView,DrawerItem} from '@react-navigation/drawer';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { NavigationContainer, StackActions } from '@react-navigation/native';

import A from './A';
import B from './B';
import C from './C';
import D from './D';
import { Block, Card, Label ,Input} from '../components';

import Container from '../reducer/Container';
import mapContainer from '../reducer/container/mapContainer';
import E from './E';
import History from './History';
import {Icon} from 'react-native-elements';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Octicons from 'react-native-vector-icons/Octicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import SimpleLineIcons from 'react-native-vector-icons/dist/SimpleLineIcons';
import AsyncStorage from '@react-native-community/async-storage';




import Today from './Today';
import Chart from './Chart';
import Splash from './Splash';
import Login from './Login';


import * as theme from '../constants/theme';
import TodayAQI from './AQI/TodayAQI';
import Search from './Search';
import Duyet from './Duyet';
import loginContainer from '../reducer/container/loginContainer';
import {loginAction} from '../reducer/action/LoginAction'

//readux 
import { connect, useDispatch ,useSelector} from 'react-redux';
import FillterTram from './Duyet/FillterTram';
import UserInfo from './UserInfo';
import DanhSachNguoiDung from './CanhBao/DanhSachNguoiDung';
import DanhSachTramCanhBao from './CanhBao/DanhSachTramCanhBao';

const Stack = createStackNavigator();
const RootStack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();


const TabMenu = () => (
  <Tab.Navigator 
    screenOptions={({route}) => ({
      tabBarIcon: ({focused, color, size}) => {
        let iconName, colorIcon;

        if (route.name === 'Map') {
          iconName = focused ? 'globe' : 'globe';

          colorIcon = focused ? '#34569e' : '#08be51';
        } else if (route.name === 'List') {
          iconName = focused ? 'search' : 'search';
          colorIcon = focused ? '#34569e' : '#08be51';
        } else if (route.name === 'History') {
          iconName = focused ? 'history' : 'history';
          colorIcon = focused ? '#34569e' : '#08be51';
      
        } else if (route.name === 'User') {
          iconName = focused ? 'user' : 'user';
          colorIcon = focused ? '#34569e' : '#08be51';
        }

        // You can return any component that you like here!
        return <FontAwesome5 name={iconName} type="octicon" color={color} size={25} />;
      },
    
     })}
    tabBarOptions={{
      activeTintColor: theme.colors.green,
      inactiveTintColor: theme.colors.gray,
      style: {
        backgroundColor: theme.colors.white, 
      },
      showLabel:false
    }}
    >  
    <Tab.Screen  name="Map" component={mapContainer}></Tab.Screen> 
    {/* <Tab.Screen name="Map" component={StackMenu}></Tab.Screen> */}
    {/* <Tab.Screen name="List" component={C}></Tab.Screen>
    <Tab.Screen name="History" component={Chart}></Tab.Screen> */}
    <Tab.Screen name="User" component={UserInfo}></Tab.Screen>
  </Tab.Navigator>
);

const StackMenu = () => ( 
  <Stack.Navigator headerMode="none">
   <Stack.Screen name="Splash" component={Splash}></Stack.Screen> 
    <Stack.Screen name="MapStack" component={TabMenu}></Stack.Screen>
    <Stack.Screen name="A" component={A}></Stack.Screen>
    <Stack.Screen name="D" component={D}></Stack.Screen>
    <Stack.Screen name="B" component={Container}></Stack.Screen>
    <Stack.Screen name="Today" component={Today}></Stack.Screen>
    <Stack.Screen name="TodayAQI" component={TodayAQI}></Stack.Screen>
    <Stack.Screen name="Search" component={Search}></Stack.Screen>
    <Stack.Screen name="Duyet" component={Duyet}></Stack.Screen>
    <Stack.Screen name="FillterTram" component={FillterTram}></Stack.Screen>
    <Stack.Screen name="LoginStack" component={loginContainer}></Stack.Screen>
    <Stack.Screen name="Login" component={loginContainer}></Stack.Screen>
    <Stack.Screen name="DanhSachNguoiDung" component={DanhSachNguoiDung}></Stack.Screen>
    <Stack.Screen name="DanhSachTramCanhBao" component={DanhSachTramCanhBao}></Stack.Screen>

  </Stack.Navigator>
);

const CustomDrawerContent=(props)=>{
  const dataLogin=useSelector(state=>state.loginRedux)
  const dispatch=useDispatch()
  const LogoutSubmit=()=>{
    const data={
      ketQua: "Đăng Xuất Thành Công",
      trangThai: 'False',
      tenDangNhap: "Đăng Nhập", 
      matKhau: ""
      }
    //await AsyncStorage.setItem('checkLogin', JSON.stringify(data) );
     dispatch(loginAction(data.tenDangNhap,data.matKhau,data.trangThai))
     Alert.alert(data.ketQua)
     props.navigation.dispatch(StackActions.replace('LoginStack'))
     props.navigation.closeDrawer()
    } 

  return( 
  <View style={{flex:1}}>
  <DrawerContentScrollView {...props}>
      <View style={styles.drawerContent}>
          <View style={styles.drawerSection}>
                 {dataLogin.isLogin=='True'?<Block flex={0.5} >
          <Image
                    source={require('../assets/image/logo.png')}
                    style={[styles.image]}></Image>
                    <Text style={[styles.textUser,{alignSelf:"center"}]}>{dataLogin.userName}</Text>
      </Block>
      :null}      
      <DrawerItem
        label="Home"
        labelStyle={styles.text}
        onPress={() => props.navigation.navigate('Tabs')}
        style={styles.lineItemMenu}

        icon={() => <AntDesign name="home" color={theme.colors.white} size={16} />}
      />
       {dataLogin.isLogin=='True'?null:<DrawerItem
        label="Sign In"
        labelStyle={styles.text}
        onPress={() => props.navigation.navigate('Login')}
        style={styles.lineItemMenu}
        icon={() => <SimpleLineIcons name="login" color={theme.colors.white} size={16} />}
      />}
      {dataLogin.isLogin=='True'?<DrawerItem
        label="Monitoring"
        labelStyle={styles.text} 
        style={styles.lineItemMenu}
        onPress={() => props.navigation.navigate('Duyet',{dataLogin:dataLogin})}
        icon={() => <SimpleLineIcons name="logout" color={theme.colors.white} size={16} />}/>:null}
       <DrawerItem
        label="Setting"
        labelStyle={styles.text}
        style={styles.lineItemMenu}
        onPress={() => props.navigation.navigate('C')}
        icon={() => <AntDesign name="setting" color={theme.colors.white} size={16} />}
      />
          </View>
      </View>
  </DrawerContentScrollView>
  {dataLogin.isLogin=='True'?<DrawerItem
        label="Sing Out"
        labelStyle={styles.text} 
        style={{marginBottom:15}}
        onPress={LogoutSubmit}
        icon={() => <SimpleLineIcons name="logout" color={theme.colors.white} size={16} />}/>:null}
</View>)
}


class Menu extends Component {
  constructor(props) {
    super(props); 
    this.state = { 
      isLogin:null
    };
  }
  
  getLogin=async()=>{
    let checkLogin = await AsyncStorage.getItem('checkLogin')
    var jsoncheckLogin =  JSON.parse(checkLogin)
    console.log(jsoncheckLogin.trangThai);
     this.setState({
       isLogin:jsoncheckLogin.trangThai
   })
  }
  DrawerMenu =  (props) => {
    return (
      <Drawer.Navigator
        drawerType="front" 
        initialRouteName="Stack"  
        overlayColor="transparent"
        drawerStyle={styles.drawerStyles}
        contentContainerStyle={{ flex: 1 }}
        drawerContentOptions={{
            activeBackgroundColor: 'transparent',
            activeTintColor: 'white',
            inactiveTintColor: 'white',
          }} 
        sceneContainerStyle={{ backgroundColor: 'transparent' }}
        drawerContent={(props) => {
                     return <CustomDrawerContent {...props}   />;
                   }}
      > 
        <Drawer.Screen name="Tabs" component={StackMenu}></Drawer.Screen>
        <Drawer.Screen name="Login" component={loginContainer}></Drawer.Screen>
        <Drawer.Screen name="C" component={C}></Drawer.Screen>
        <Drawer.Screen name="E" component={E}></Drawer.Screen>
        <Drawer.Screen name="Splash" component={Splash}></Drawer.Screen> 
      </Drawer.Navigator>
    );
  };
  render() {
    console.log(this.props)

    return (
        <RootStack.Navigator headerMode="none">
          <RootStack.Screen name="Drawer"  component={this.DrawerMenu}></RootStack.Screen>
        </RootStack.Navigator>
      
    ); 
  }
}



export default  Menu;

const styles = StyleSheet.create({
  drawerStyles: { flex: 1, width: '50%', backgroundColor: theme.colors.green },
  image: {
    width: 100,
    height: 100,
    borderRadius:50,
    marginBottom: 16,
    backgroundColor:theme.colors.green,
    marginTop:80,
    marginLeft:50,

  },
  text:{
    color:theme.colors.white,
    fontWeight:'bold',
  },
  textUser:{
    color:theme.colors.white,
    fontWeight:'bold',
    fontSize:30
  },
  lineItemMenu:{
      shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 5,
  },
  shadowOpacity: 0.36,
  shadowRadius: 6.68,

  elevation: 0.9  ,
  //borderBottomWidth:1,borderBottomColor:'#fff'
  },
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
      marginBottom: 15,
      borderTopColor: '#f4f4f4',
      borderTopWidth: 1
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  
  
});




