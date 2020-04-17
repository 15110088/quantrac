import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import A from './A';
import B from './B';
import C from './C';
import D from './D';
import ButtonIconTabMenu from '../components/ButtonIconTabMenu';
import Container from '../reducer/Container';
import mapContainer from '../reducer/container/mapContainer';
import E from './E';
import History from './History';
import {Icon} from 'react-native-elements';
import Today from './Today';
import Chart from './Chart';
import Splash from './Splash';
import Login from './Login';
import * as theme from '../constants/theme';


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
  </Stack.Navigator>
);

const DrawerMenu = () => {
  return (
    <Drawer.Navigator>
    
      <Drawer.Screen name="Tabs" component={StackMenu}></Drawer.Screen>
      <Drawer.Screen name="Login" component={Login}></Drawer.Screen>
      <Drawer.Screen name="C" component={C}></Drawer.Screen>
      <Drawer.Screen name="E" component={E}></Drawer.Screen>
      <Drawer.Screen name="Splash" component={Splash}></Drawer.Screen>
    </Drawer.Navigator>
  );
};

const Menu = () => {
  return (
    <RootStack.Navigator headerMode="none">
      <RootStack.Screen name="Drawer" component={DrawerMenu}></RootStack.Screen>
    </RootStack.Navigator>
  );
};

export default Menu;
