



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


const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;

export const setColor = (data) => {
    if (data == '_BlackStyle') {
      return '#000';
    }
    if (data == '_SilverStyle') {
      return theme.colors.gray;
    }
    if (data == '_RedStyle') {
      return '#de2302';
    }
    if (data == '_BlueStyle') {
      return '#0a9dff';
    }
    console.log(data);
  };

export  const GridThongSo = (props) => {
    return (
      <View style={styles.cardContainer}>
        <View style={styles.cardHeaderContaner}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              flex: 1,
            }}>
            <TouchableOpacity onPress={props.ClickTime}>

            <View style={{flexDirection: 'row'}}>
              <MaterialIcons name="date-range" size={18}></MaterialIcons>
              <Text style={styles.textHeaderDate}>
                {props.dateFrom.toLocaleDateString('en-GB')}-
                {props.dateTo.toLocaleDateString('en-GB')}
              </Text>
            </View>
            </TouchableOpacity>
            <View style={{flexDirection: 'row'}}>
              <MaterialIcons name="access-time" size={18}></MaterialIcons>
              <Text style={styles.textHeaderTime}>
                {props.timeFrom} - {props.timeTo}
              </Text>
            </View>
          </View>
        </View>
  
        <View style={styles.cardBody}>
          {props.isDataNull ?<Text style={styles.cardGroupIcon}>Không có dữ liệu</Text>:!props.isLoadingGird?
           (
            <View style={styles.cardBodyTop}>
              <ScrollView style={{flex: 1,borderBottomRightRadius:20,borderTopLeftRadius:20,borderColor:theme.colors.green,borderWidth:2}}>
                <View style={{flex: 1, flexDirection: 'row'}}>
                  <View style={{}}>
                    <View
                      style={{
                        backgroundColor: theme.colors.green,
                        width: 100,
                        borderTopLeftRadius:20,
                      }}>
                      <View style={{width: 100}}>
                        <Text style={{fontSize: 16,textAlign:'center',color:theme.colors.white}}>Thông Số</Text>
                      </View>
                    </View>
                    {props.dataHeaderLeft.map((v, i) => {
                      return (
                        <View
                          key={i}
                          style={{
                            backgroundColor: '#e4e6eb',
                            width: 100,
                            padding: 5,
                            borderBottomWidth: 0.5,
                            borderBottomColor:'#e4e6eb',
                            //borderBottomLeftRadius:20
                          }}>
                          <View style={{width: 100}}>
                            <Text
                              style={{
                                fontSize: 15,
                                fontWeight: 'bold',
                                color: theme.colors.black,
                                marginLeft:10
                              }}>
                              {v}
                            </Text>
                          </View>
                        </View>
                      );
                    })}
                  </View>
                  <ScrollView horizontal={true} style={{borderTopRightRadius:20}}>
                    <View style={{flexDirection: 'column'}}>
                      <View style={{flexDirection: 'row',borderTopRightRadius:20}}>
                        {props.dataHeader.map((v, i) => { 
                          return (
                            <View
                              key={i}
                              style={{
                                width: 100,
                                borderBottomWidth: 0.5,
                                backgroundColor: theme.colors.green,
                              }}>
                              <Text
                                style={{
                                  fontSize: 16,
                                  color: theme.colors.white,
                                  textAlign: 'center',
                                }}>
                                <MaterialIcons name="access-time"></MaterialIcons>{' '}
                                {v}
                              </Text>
                            </View>
                          );
                        })}
                      </View>
                      <View style={{flexDirection: 'row'}}>
                        {props.data.map((v, i) => {
                          return (
                            <View style={{flexDirection: 'column', width: 100}}>
                              {v.map((x, c) => {
                                return (
                                  <TouchableOpacity onPress={()=>props.ClickThongSo(x)}>
                                  <View
                                    key={c}
                                    style={{
                                      width: 100,
                                      padding: 5,
                                      borderBottomWidth: 0.5,
                                    }}>
                                    <Text 
                                      style={{
                                        fontSize: 15,
                                        textAlign: 'center',
                                        color: setColor(x.keyColor),
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
                    </View>
                  </ScrollView>
                </View>
              </ScrollView>
            </View>
          ) :  (
            <Loading />
          )
          }
        </View>
  
        <View style={styles.cardBodyBottom}>
          <View style={styles.cardGroupIcon}>
            <MaterialIcons name="first-page" size={32} />
            <Text style={styles.cardBottomTitle}></Text>
          </View>
  
          <TouchableWithoutFeedback onPress={props.Previous}>
            <View style={styles.cardGroupIcon}>
              <MaterialIcons name="keyboard-arrow-left" size={32} />
              <Text style={styles.cardBottomTitle}></Text>
            </View>
          </TouchableWithoutFeedback>
  
          <TouchableWithoutFeedback onPress={props.Next}>
            <View style={styles.cardGroupIcon}>
              <MaterialIcons name="keyboard-arrow-right" size={32} />
              <Text style={styles.cardBottomTitle}></Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => console.log('press')}>
            <View style={styles.cardGroupIcon}>
              <MaterialIcons name="last-page" size={32} />
              <Text style={styles.cardBottomTitle}></Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    );
  };

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
 
    select: {
      width: 200,
      margin: 2,
    },
  
    title: {
      fontSize: 20,
      flex: 1,
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
  