import React, { Component } from 'react';
import {  StyleSheet } from 'react-native';
import {
    Text,
    View,
    Dialog,
    Colors,
    PanningProvider,
    RadioGroup,
    RadioButton,
    Switch,
    Constants,
  } from 'react-native-ui-lib'; 
  import {Icon} from 'react-native-elements';

  import * as theme from '../../constants/theme';


 const DialogWQI =(props)=>{
    return (
        <View>
        <View style={{backgroundColor: props.colorPoint}}>
          <Text
            style={{
              color: '#fff',
              alignSelf: 'center',
              fontWeight: 'bold',
              fontSize: 20,
            }}>
            {' '}
            {props.maTram}
          </Text>
        </View>
        <View height={2} bg-dark70 />

        <View row>
          <View flex-1 style={styles.shadown}>
            <View
              style={{
                width: 40,
                height: 40,
                backgroundColor: props.colorPoint,
                borderRadius: 20,
                top: 5,
                alignSelf: 'center',
              }}></View>
            <View centerH style={{top: 5}}>
              <Text style={{color: props.colorPoint}}>GOOD</Text>
            </View>
          </View>
          <View flex-2>
            <View row marginL-0>
              <Icon name="clock" type="evilicon" color="#517fa4" />
            <Text text90>{props.NgayTinh}</Text>
            </View>

            <View row>
              <View flex-1>
                <View centerH style={{top: 10}}>
                  <Text
                    style={{
                      top: -10,
                      color: 'gray',
                      fontSize: 30,
                      fontWeight: 'bold',
                    }}>
                    {props.PH}
                  </Text>
                  <Text style={{color: 'gray', top: -15, left: 5}}>
                    PH{' '}
                  </Text>
                </View>
              </View>
              <View flex-1>
                <View centerH style={{top: 10}}>
                  <Text
                    style={{
                      top: -10,
                      color: 'gray',
                      fontSize: 30,
                      fontWeight: 'bold',
                    }}>
                    {props.DO}
                  </Text>
                  <Text style={{color: 'gray', top: -15, left: 5}}>
                    DO{' '}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
      );
 }

  
    
  


export default DialogWQI;


const styles = StyleSheet.create({
    container: {flex: 1},
    dialog: {
      backgroundColor: Colors.white,
    },
    roundedDialog: {
      backgroundColor: Colors.white,
      marginBottom: Constants.isIphoneX ? 0 : 20,
      borderRadius: 12,
      borderBottomWidth: 10,
      borderBottomColor: '#fff123',
    },
    button: {
      margin: 5,
      alignSelf: 'flex-start',
    },
    verticalScroll: {
      marginTop: 20,
    },
    horizontalTextContainer: {
      alignSelf: 'center',
      position: 'absolute',
      top: 10,
    },
    statusIcon: {
      width: 40,
      height: 40,
      backgroundColor: '#DD0000',
      borderRadius: 20,
      top: 5,
  
      alignSelf: 'center',
    },
    shadown: {
      backgroundColor: '#fff',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 7,
      },
      shadowOpacity: 0.41,
      shadowRadius: 9.11,
      borderWidth: 1,
  
      elevation: 14,
    },
    card: {
      padding: 20,
      borderWidth: 1,
      borderColor: theme.colors.border,
      borderRadius: 5,
      backgroundColor: theme.colors.white,
    },
    active: {
      borderColor: theme.colors.blue,
      shadowOffset: {width: 0, height: 0},
      shadowColor: theme.colors.lightblue,
      shadowRadius: 3,
      shadowOpacity: 1,
    },
    icon: {
      flex: 0,
      height: 48,
      width: 48,
      borderRadius: 48,
      marginBottom: 5,
      backgroundColor: theme.colors.white,
    },
    check: {
      position: 'absolute',
      right: -9,
      top: -9,
    },
    header: {
      flexDirection: 'row',
      // justifyContent: 'flex-end',
      flex: 0.1,
      paddingHorizontal: 20,
      paddingTop: 10,
      paddingBottom: 10 * 1.5,
      // backgroundColor:theme.colors.green
    },
    headerTitle: {
      color: theme.colors.gray,
    },
   
    
  });
  