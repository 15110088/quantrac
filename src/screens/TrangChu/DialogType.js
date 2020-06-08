import React, {Component} from 'react';
import {View, Text, StyleSheet, Dimensions,TouchableOpacity} from 'react-native';
import * as theme from '../../constants/theme';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Octicons from 'react-native-vector-icons/Octicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
const DialogType = (props) => {
    console.log(props)
  return (
    <View style={styles.modalType}>
        <View style={{height:6,width:50,backgroundColor:theme.colors.gray,marginTop:5,borderRadius:3,alignSelf:'center'}}></View>
      <Text style={styles.title}>Chọn loại bản đồ</Text>
      <TouchableOpacity onPress={()=>props.chonloai(1)}>
      <View style={styles.row}>
        <View
          style={[styles.radiusIcon, {backgroundColor: theme.colors.green}]}>
          <Entypo name="water" color={theme.colors.white} size={20}></Entypo>
        </View>
        <View style={styles.viewItem}>
            <Text style={styles.textItem}>Bản đồ Nước</Text>
            {props.type==1&&<Entypo name="check" size={20} color={theme.colors.green} />}
        </View>
      </View>
      </TouchableOpacity>
      

      <TouchableOpacity  onPress={()=>props.chonloai(2)}>
      <View style={styles.row}>
        <View
          style={[styles.radiusIcon, {backgroundColor: theme.colors.blue}]}>
          <Entypo name="air" color={theme.colors.white} size={20}></Entypo>
        </View>
        <View style={styles.viewItem}>
            <Text style={styles.textItem}>Bản đồ không khí</Text>
            {props.type==2&&<Entypo name="check" size={20} color={theme.colors.green} />}
        </View>
      </View>
      </TouchableOpacity>

    </View>
  );
};

export default DialogType;

const {width, height} = Dimensions.get('window');

var screen = Dimensions.get('window');
const styles = StyleSheet.create({
  modalType: {
    height: 250,
    width: screen.width,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderWidth: 2,
    paddingHorizontal: 15,
   
  },
  title: {
    fontSize: 20,
    color: theme.colors.black,
    fontWeight: 'bold',
    marginTop:15
  },
  row: {
    flexDirection: 'row',
  },
  radiusIcon: {
    width: 40,
    height: 40,
    alignItems: 'center',
    borderWidth: 2,
    backgroundColor: theme.colors.green,
    borderRadius: 20,
    justifyContent: 'center',
    borderColor: theme.colors.white,
    marginVertical:10,
    shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 2,
},
shadowOpacity: 0.23,
shadowRadius: 2.62,

elevation: 4,

  },
  textItem:{
    color:theme.colors.black2,fontSize:16,fontWeight:'bold'
  },
  viewItem:{
    flex:1,justifyContent:"space-between",paddingHorizontal:20,alignItems:'center',flexDirection:'row',
  }

});
