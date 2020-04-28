import React, {Component, useState, useEffect} from 'react';
import {Block, Card, Label} from '../components';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
import * as theme from '../constants/theme';

import {
  TouchableWithoutFeedback,
  StyleSheet,
  Dimensions,
  ImageBackground,
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Text,
  TextInput,
  Button,
} from 'react-native';

import {View} from 'react-native-ui-lib';
const {width, height} = Dimensions.get('window');

const Search = () => {
  const [display, setDisplay] = useState(false);
  const [option, setOption] = useState([]);
  const [search, setSearch] = useState('');
  const [dataTemp, setdataTemp] = useState([]);

  const selectIndex = (data) => {
    setSearch(data);
    setDisplay(!display);
  };

  useEffect(() => {
    fetch('http://25.36.7.253/DuLieuQuanTracServices.svc/GetRandomKhiTuDong')
      .then((response) => response.json())
      .then((json) => {
        setOption(json);
        setdataTemp(json)
      })
      .catch((error) => {
        console.error(error);
      });
    console.log(option);
  }, []);
  const filterItems = (query) => {
    return option.filter(function (el) {
      return el.toLowerCase().indexOf(query.toLowerCase()) > -1;
    });
  };
  const  SearchFilterFunction=(text)=> {
    //passing the inserted text in textinput
    const newData = option.filter((item)=> {
      const itemData = item.maTram ? item.maTram.toUpperCase() : ''.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    setOption(newData);
    setSearch(text)
    console.log('========tex2========')
    console.log(text.is)
    if(!text)
    {
        console.log('========text========')
        console.log(text)
            setOption(dataTemp)
    }
  }


  const test = () => {
    console.log(filterItems('a'));
  };
  return (
    <KeyboardAvoidingView enabled={true} style={{flex: 1}}>
      <View style={{flex: 1, borderWidth: 1}}>
        <View style={{flex: 1, borderWidth: 1}}>
          <TextInput
            placeholder="Search"
            value={search}
            onChangeText={(data) => SearchFilterFunction(data)}
            style={{
              borderRadius: 30,
              borderWidth: 2,
              borderColor: theme.colors.green,
              backgroundColor: theme.colors.white,
              width: width - 60,
              marginLeft: 40,
              marginVertical: 15,
              padding: 7,
              fontSize: 20,
            }}></TextInput>
          <TouchableWithoutFeedback onPress={() => setDisplay(!display)}>
            <MaterialIcons
              size={30}
              name="arrow-back"
              color={theme.colors.green}
              style={{
                position: 'absolute',
                marginVertical: 20,
              }}></MaterialIcons>
          </TouchableWithoutFeedback>
          <ScrollView style={{borderWidth: 2, flex: 1}}>
            {display
              ? option.map((v, i) => {
                    return (
                      <TouchableWithoutFeedback
                        onPress={() => selectIndex(v.maTram)}>
                        <Text style={{borderWidth: 1}}>
                          {v.maTram} + {v.chiSo}
                        </Text>
                      </TouchableWithoutFeedback>
                    );
                  })
              : null}

            <Button title="ok" onPress={test}></Button>
          </ScrollView>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Search;
