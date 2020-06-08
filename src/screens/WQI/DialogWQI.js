import React, {Component} from 'react';
import {StyleSheet,Text,View} from 'react-native';

import {Icon} from 'react-native-elements';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as theme from '../../constants/theme';

const DialogWQI = (props) => {
  console.log(props)
  return (
    <>
      <View style={{height: 50, flexDirection: 'row' }}>
        <MaterialCommunityIcons
          size={25}
          style={{padding: 12}}
          name="air-filter"></MaterialCommunityIcons>
        <View style={{padding: 7, flex: 1}}>
            <Text style={{fontSize: 16, fontWeight: 'bold'}}>{props.tenTram}</Text>
            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
            <Text style={{color: 'gray'}}>{props.maTram}</Text>
            <Text style={{color: 'gray'}}>{props.NgayTinh.substr(13)}</Text>

            </View>

        </View>
      
      </View>
     
      <View
        style={{
          height: 100,
          flex: 1,
          borderRadius: 20,
          flexDirection: 'row',
          backgroundColor:'transform',
          paddingBottom:10,
        }}>
        <View style={[styles.shadow]}>
        <MaterialCommunityIcons
            size={50}
            color={ props.PH.VuotNguong?theme.colors.redPH:theme.colors.blueDO}
            name= {props.PH.VuotNguong?"emoticon-sad":"emoticon-excited"}>
            </MaterialCommunityIcons>
            <Text style={{marginTop:50,marginLeft:-35,color:'#2A2123',fontWeight:'bold',color:props.PH.VuotNguong?theme.colors.redPH:theme.colors.blueDO}}>PH </Text>
      <Text style={{alignSelf:'center',marginTop:15,marginLeft:20,fontSize:28,fontWeight:'bold',color:props.PH.VuotNguong?theme.colors.redPH:theme.colors.blueDO}}>{props.PH.GiaTri}</Text>
        </View>
        <View style={([styles.shadow])}>
        <MaterialCommunityIcons
            size={50}
            color={ props.DO.VuotNguong?theme.colors.redPH:theme.colors.blueDO}
            name= {props.DO.VuotNguong?"emoticon-sad":"emoticon-excited"}></MaterialCommunityIcons>
             <Text style={{marginTop:50,marginLeft:-30,color:'#2A2123',fontWeight:'bold',color:props.DO.VuotNguong?theme.colors.redPH:theme.colors.blueDO}}>D0 </Text>
      <Text style={{alignSelf:'center',marginTop:15,marginLeft:20,fontSize:28,fontWeight:'bold',color:props.DO.VuotNguong?theme.colors.redPH:theme.colors.blueDO}}>{props.DO.GiaTri}</Text>
        </View>

        
      </View>
    </>
  );
};

export default DialogWQI;

const styles = StyleSheet.create({
  container: {flex: 1},
 

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
  shadow: {
    flex: 1,
   // borderWidth:2,
    flexDirection: 'row',
   // backgroundColor: '#10d60f',
    borderRadius: 20,
    shadowColor: '#000',
    // shadowOffset: {
    //   width: 100,
    //   height: 50,
    // },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,
   
    elevation: 15,
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
