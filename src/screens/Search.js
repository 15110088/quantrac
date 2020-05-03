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
  FlatList
} from 'react-native';

import {View} from 'react-native-ui-lib';
const {width, height} = Dimensions.get('window');

const Search = (props) => {
  const [display, setDisplay] = useState(false);
  const [option, setOption] = useState([]);
  const [search, setSearch] = useState('');
  const [dataTemp, setdataTemp] = useState([]);// nếu không co dữ liệu refesh lại source
  const [dataSearched, setdataSearched] = useState(["du lieu 2"]);// source để lưu lại giá trị đã search
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

  const  searchFilterFunction=(text)=> {
    //passing the inserted text in textinput
    const newData = option.filter((item)=> {
      const itemData = item.maTram ? item.maTram.toUpperCase() : ''.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    setOption(newData);
    setSearch(text);
    if(!text)
    {
        console.log('========text========')
        console.log(text)
            setOption(dataTemp)
    }
  }
  const showList=()=>{
    setDisplay(true);
  }
  var arr=[];
  const saveSearched=(text)=>{
       setdataSearched([...dataSearched,search]);
  }
  const goBackMap=()=>{
    console.log(search)
      props.navigation.navigate('MapStack',{screen:'map', params:{typemonitoring:2,keySearch:search}})
  }
  return (
    <KeyboardAvoidingView enabled={true} style={{flex: 1}}>
      <View style={{flex: 1, borderWidth: 1}}>
        <View style={{flex: 1, borderWidth: 1}}>
          <TextInput
            placeholder="Search"
            value={search}
            onChangeText={(data) => searchFilterFunction(data)}
            onSubmitEditing={(data)=>saveSearched(data)}
            onFocus={showList}
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
          <TouchableWithoutFeedback onPress={() =>{goBackMap()} }>
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
            <SafeAreaView >
            <Text >Tìm Kiếm Gần Đây:</Text>
            {
              dataSearched.map((v,i)=>{
                return(
                  <>
                 <Text> <MaterialIcons name="search"></MaterialIcons> {v}</Text>
                  </>
                )
              })
            }
          </SafeAreaView>
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

            <Button title="ok" onPress={()=>console.log(dataSearched)}></Button>
          </ScrollView>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Search;
