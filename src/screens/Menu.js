import React, {Component,useEffect,useState} from 'react';
import {View, Text,StyleSheet,Image,Dimensions} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator,DrawerContentScrollView,DrawerItem} from '@react-navigation/drawer';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

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
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import SimpleLineIcons from 'react-native-vector-icons/dist/SimpleLineIcons';


import Today from './Today';
import Chart from './Chart';
import Splash from './Splash';
import Login from './Login';


import * as theme from '../constants/theme';
import TodayAQI from './AQI/TodayAQI';
import Search from './Search';
import Duyet from './Duyet';
import loginContainer from '../reducer/container/loginContainer';


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
      
        } else if (route.name === 'Setting') {
          iconName = focused ? 'gear' : 'gear';
          colorIcon = focused ? '#34569e' : '#08be51';
        }

        // You can return any component that you like here!
        return <Icon name={iconName} type="octicon" color={color} size={30} />;
      },
    })}
    tabBarOptions={{
      activeTintColor: theme.colors.green,
      inactiveTintColor: theme.colors.gray,
      style: {
        backgroundColor: theme.colors.white, 
      }
     
    }}

    
    >
      
    <Tab.Screen name="Map" component={mapContainer}></Tab.Screen> 
    {/* <Tab.Screen name="Map" component={StackMenu}></Tab.Screen> */}
    <Tab.Screen name="List" component={C}></Tab.Screen>
    <Tab.Screen name="History" component={Chart}></Tab.Screen>
    <Tab.Screen name="Setting" component={Today}></Tab.Screen>
  </Tab.Navigator>
);

const StackMenu = () => (
  <Stack.Navigator    headerMode="none">
   <Stack.Screen name="Splash" component={Splash}></Stack.Screen> 
    <Stack.Screen name="MapStack" component={TabMenu}></Stack.Screen>
    <Stack.Screen name="A" component={A}></Stack.Screen>
    <Stack.Screen name="D" component={D}></Stack.Screen>
    <Stack.Screen name="B" component={Container}></Stack.Screen>
    <Stack.Screen name="Today" component={Today}></Stack.Screen>
    <Stack.Screen name="TodayAQI" component={TodayAQI}></Stack.Screen>
    <Stack.Screen name="Search" component={Search}></Stack.Screen>
    <Stack.Screen name="Duyet" component={Duyet}></Stack.Screen>

  </Stack.Navigator>
);




const CustomDrawerContent=props=> {
 
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{flex:1}}>
      <Block flex={0.5} >
            <Image
                    source={require('../assets/image/logo.png')}
                    style={[styles.image]}></Image>
                    <Text style={[styles.textUser,{alignSelf:"center"}]}>xxxxxx</Text>
      </Block>
      <DrawerItem
        label="Home"
        labelStyle={styles.text}
        onPress={() => props.navigation.navigate('Tabs')}
        style={styles.lineItemMenu}

        icon={() => <AntDesign name="home" color={theme.colors.white} size={16} />}
      />
       <DrawerItem
        label="Login"
        labelStyle={styles.text}
        onPress={() => props.navigation.navigate('Login')}
        style={styles.lineItemMenu}

        icon={() => <SimpleLineIcons name="login" color={theme.colors.white} size={16} />}

      />
       <DrawerItem
        label="Setting"
        labelStyle={styles.text}
        style={styles.lineItemMenu}
        onPress={() => props.navigation.navigate('C')}
        icon={() => <AntDesign name="setting" color={theme.colors.white} size={16} />}

      />
        <Block flex={0.5}>
        <DrawerItem
        label="Logout"
        labelStyle={styles.text}
        style={{paddingTop:200}}
        //onPress={() => props.navigation.navigate('C')}
        icon={() => <SimpleLineIcons name="logout" color={theme.colors.white} size={16} />}/>
        </Block>
     

    
    </DrawerContentScrollView>
  );
}



const DrawerMenu = (props) => {
  console.log('=====DrawMenu=======')

  console.log(props)
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
        drawerContent={props => {
         
         // setProgress(props.progress);
          return <CustomDrawerContent {...props} />;
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
const Menu = (props) => {
  console.log('=====Menu=======')
  const [isLogin,SetLogin]=useState(true);
  console.log(props.data.isLogin)
  //isLogin=props.
  return (
    <RootStack.Navigator headerMode="none">
      <RootStack.Screen name="Drawer" data={props.data} component={DrawerMenu}></RootStack.Screen>
    </RootStack.Navigator>
  );
};

export default Menu;

const withScreen=Dimensions.get("screen").width
const heightScreen=Dimensions.get("screen").height
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
  }
  
  
});




