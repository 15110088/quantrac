import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import Menu from './screens/Menu';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';

import { ApplicationProvider, Layout } from '@ui-kitten/components';
import { mapping, light as lightTheme } from '@eva-design/eva';
import * as eva from '@eva-design/eva';

import B from './screens/B';
import Container from '../src/reducer/Container' 
import MapReducer from './reducer/MapReducer';
import LoginReducer from './reducer/LoginReducer';
import MenuContainer from './reducer/container/menuContainer';
import Duyet from './screens/Duyet';
import Login from './screens/Login';

let appState = {
      colorHerder:'#fff000'
}

const showQuanTrac = (state = appState, action) => {

  //console.log('data show '+action.type)
  switch (action.type) {
    case 'tot':
      console.log("tot")
      
      state={
        colorHerder:'#00FF66'
      } 
     break;
    case 'trungbinh':
      state={
        colorHerder:'#FFCC00'
      } 
      break;

    case 'xau':
      state={
        colorHerder:'#DD0000'
      } 
      break;
    // case 'nguyhai':
    //   console.log("nh")
    //   return {...state,data:onedata};
    // case 'kem':
    //   console.log("kem") 
    //   return {...state,data:onedata};

    // case 'ratxau': 
    //   console.log("rx")
    //   return {...state,data:onedata};

  }
  return state;
}

const store = createStore(
  combineReducers({
    nghia1: showQuanTrac,
    mapRedux:MapReducer,
    loginRedux:LoginReducer,
  })
);


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    return (
      <Provider store={store} >
        <View style={{ flex: 1 }}>
          <ApplicationProvider map={mapping} {...eva} theme={lightTheme}>
            {/* <NavigationContainer>
                  <MenuContainer></MenuContainer>
            </NavigationContainer> */}
                  <Duyet/>
                  {/* <Login></Login> */}
          </ApplicationProvider>
        </View>
      </Provider>

    );
  }
}

export default App;
