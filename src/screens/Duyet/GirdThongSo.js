import React, {Component, useState, useEffect} from 'react';
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
} from 'react-native';

import * as theme from '../../constants/theme';

import * as Animatable from 'react-native-animatable';
import {ScrollView} from 'react-native-gesture-handler';
import Loading from './../Loading';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Octicons from 'react-native-vector-icons/Octicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {CheckBox} from '@ui-kitten/components';
import {cos} from 'react-native-reanimated';

const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;

export const setColor = (data) => {
  if (data == '_BlackStyle') {
    return {
      item: '#fff',
      itemBorder: '#231b12',
    };
  }
  if (data == '_SilverStyle') {
    return {
      item: '#5D535E',
      itemBorder: theme.colors.gray,
    };
  }
  if (data == '_RedStyle') {
    return {
      item: '#de2302',
      itemBorder: '#A1D6E2',
    };
  }
  if (data == '_BlueStyle') {
    return {
      item: '#fff',
      itemBorder: '#0099FF',
    };
  }
  console.log(data);
};

export const GridThongSo = (props) => {
  return (
    <>
      <View style={styles.cardContainer}>
        
        <View
          style={{
            flex: 1,
            height: 50,
            flexDirection: 'row',
            borderRadius: 10,
          }}>
            {/* Tu ngay */}
          <View
            style={{
              flex: 1,
              backgroundColor: theme.colors.green3,
              justifyContent: 'center',
              alignItems: 'center',
              borderTopLeftRadius: 10,
              borderBottomLeftRadius: 10,

            }}>
            <Text style={styles.textHeaderDate}>
              {props.dateFrom.toLocaleDateString('en-GB')}
            </Text>
            <Text style={styles.textHeaderTime}>{props.timeFrom}</Text>
          </View>
          {/* > */}
          <View
            style={{
              flex: 0.2,
              justifyContent: 'center',
              backgroundColor: theme.colors.green3,
            }}>
            <MaterialIcons
              name="navigate-next"
              size={30}
              color={theme.colors.white}></MaterialIcons>
          </View>
            {/* den ngay */}
            <View
            style={{
              flex: 1,
              backgroundColor: theme.colors.green3,
              justifyContent: 'center',
              alignItems: 'center',
              borderTopRightRadius: 10,
              borderBottomRightRadius: 10,
            }}>
            <Text style={styles.textHeaderDate}>
              {props.dateTo.toLocaleDateString('en-GB')}
            </Text>
            <Text style={styles.textHeaderTime}>{props.timeTo}</Text>
          </View>
        </View>
        <View style={styles.cardBody}>
          {/* {props.isDataNull ?<Text style={styles.cardGroupIcon}>Không có dữ liệu</Text>:!props.isLoadingGird?
           */}
          <View
            // contentContainerStyle={{flexDirection: 'row'}}
            style={{
              flex: 1,
              borderColor: theme.colors.green1,
              borderWidth: 3,
              flexDirection: 'row',
            }}>
            <View>
              <View
                style={{
                  backgroundColor: theme.colors.green1,
                  flex: 1,
                }}>
                <View style={{width: 100, height: 40, padding: 5}}>
                  <Text style={styles.textheadergrid}>Thông Số</Text>
                </View>
              </View>
              {props.dataHeaderLeft.map((v, i) => {
                return (
                  <View
                    key={i}
                    style={{
                      backgroundColor: '#e4e6eb',
                      padding: 5,
                      flex: 1,
                      borderBottomWidth: 0.5,
                      borderBottomColor: '#e4e6eb',
                      flexDirection: 'row',
                      //borderBottomLeftRadius:20
                    }}>
                    <View></View>
                    <View style={{width: 100, flexDirection: 'row'}}>
                      <CheckBox
                        status="success"
                        onChange={() => {
                          props.ClickCheckBoxThongSo(i);
                        }}
                        checked={v[1]}
                      />
                      <Text
                        style={{
                          fontSize: 15,
                          fontWeight: 'bold',
                          color: theme.colors.black,
                          marginLeft: 10,
                        }}>
                        {v[0]}
                      </Text>
                    </View>
                  </View>
                );
              })}
            </View>
            <ScrollView
              horizontal={true}
              contentContainerStyle={{flexDirection: 'column'}}
              style={{borderTopRightRadius: 20}}>
              <View style={{flex: 1, flexDirection: 'row', height: 40}}>
                {props.dataHeader.map((v, i) => {
                  return (
                    <View
                      key={i}
                      style={{
                        flex: 1,
                        height: 40,
                        padding: 5,
                        borderBottomWidth: 0.5,
                        backgroundColor: theme.colors.green3,
                      }}>
                      <Text style={styles.textheadergrid}>
                        <MaterialIcons name="access-time"></MaterialIcons> {v}
                      </Text>
                    </View>
                  );
                })}
              </View>
              <View style={{flexDirection: 'row'}}>
                {props.data.map((v, i) => {
                  return (
                    <View style={{flex: 1, flexDirection: 'column'}}>
                      {v.map((x, c) => {
                        return (
                          <TouchableOpacity
                            onPress={() => props.ClickThongSo(x)}>
                            <View
                              key={c}
                              style={{
                                padding: 5,
                                flex: 1,
                                //borderBottomWidth: 0.5,
                                alignItems: 'center',
                              }}>
                              <Text
                                style={{
                                  fontSize: 15,
                                  textAlign: 'center',
                                  color: setColor(x.keyColor).item,

                                  borderRadius: 10,
                                  width: 50,
                                  backgroundColor: setColor(x.keyColor)
                                    .itemBorder,
                                }}>
                                {x.GIATRISO}
                              </Text>
                            </View>
                          </TouchableOpacity>
                        );
                      })}
                    </View>
                  );
                })}
              </View>
            </ScrollView>
          </View>
          {/* :  (
        <Loading />
      )
      } */}
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  textheadergrid: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: theme.colors.white,
  },

  container: {
    flex: 1,
    backgroundColor: '#F0F1F2',
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
    height: 40,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  cardBottomTitle: {
    fontSize: 14,
    marginTop: 5,
  },
  cardGroupIcon: {
    //justifyContent: 'center',
    //alignItems: 'center',
    // borderWidth:2
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
    paddingHorizontal: 15,
    paddingTop: 15,
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
    fontSize: 18,
    color: theme.colors.white,
  },
  textHeaderTime: {
    fontSize: 15,
    color: theme.colors.white,
  },
});
