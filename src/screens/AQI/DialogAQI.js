import React, {PureComponent, Component} from 'react';
import {
  TouchableWithoutFeedback,
  View,
  StyleSheet,
  Dimensions,
  ImageBackground,
  Text,
} from 'react-native';
const {width, height} = Dimensions.get('window');
import * as theme from '../../constants/theme';

import Modal from 'react-native-modalbox';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
var screen = Dimensions.get('window');

class DialogAQI extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  setColorChiSo=(color)=>{
      if(color=="#FFFF00")
      {
        return "#f0f002"
      }
      if(color=="#00BFFF"){
        return "#0ab9f5"
      }
      else{
        return "white"

      }
  }
  setIcon=(color)=>{
    if(color=="#FFFF00")
    {
      return  <MaterialCommunityIcons
      size={50}
      color="#5A6801"
      style={{paddingVertical: 20, paddingLeft: 20}}
      name="emoticon-neutral"></MaterialCommunityIcons>
    }
    if(color=="#00BFFF")
    {
      return  <MaterialCommunityIcons
      size={50}
      color="white"
      style={{paddingVertical: 20, paddingLeft: 20}}
      name="emoticon"></MaterialCommunityIcons>
    }
    else{
      return <MaterialCommunityIcons
      size={50}
      color="#5A6801"
      style={{paddingVertical: 20, paddingLeft: 20}}
      name="emoticon-neutral"></MaterialCommunityIcons>
    }
  }
  render() {
    const {
      chiSo,
      NgayTinh,
      noidungCanhBao,
      chatluongMT,
      tenTram,
      maTram,keyColor
    } = this.props;
    return (
      <>
        <View style={{height: 50, flexDirection: 'row'}}>
    <MaterialCommunityIcons
      size={25}
      style={{padding: 12}}
      name="air-filter"></MaterialCommunityIcons>
    
          <View style={{padding: 7,flex:1}}>
            <Text style={{fontSize: 16, fontWeight: 'bold'}}>{tenTram}</Text>
            <Text style={{color: 'gray'}}>{maTram}</Text>
          </View>
        </View>
        <View
          style={{
            height: 100,
            //width:screen.width - 50,
            flex: 1,
            borderRadius: 20,
            backgroundColor: keyColor,//'#27e726',
            flexDirection: 'row',
          }}>
          {/* <View style={[styles.shadow,{backgroundColor:this.setColorChiSo(keyColor)}]}>
            {this.setIcon(keyColor)} */}
            <View style={[styles.shadow,{backgroundColor:this.setColorChiSo(keyColor)}]}>
             {this.setIcon(keyColor)} 
            <View style={{paddingLeft: 5}}>
              <Text
                style={{
                  fontSize: 30,
                  color: keyColor=="#FFFF00"?'#5A6801':'white',
                  fontWeight: 'bold',
                  paddingTop: 20,
                  paddingLeft: 5,
                }}>
                {chiSo}
              </Text>
              <View style={{flex: 1, alignItems: 'center'}}>
                <Text style={{fontSize: 10, color: keyColor=="#FFFF00"?'#5A6801':'white'}}>
                  {chatluongMT}
                </Text>
              </View>
            </View>
          </View>

          <View style={{flex: 0.6}}>
            <Text style={{fontSize: 15, padding: 20, color: keyColor=="#FFFF00"?'#5A6801':'white'}}>
              {noidungCanhBao}
            </Text>
          </View>
        </View>
      </>
    );
  }
}

export default DialogAQI;

const styles = StyleSheet.create({
  modal3: {
    height: 150,
    width: screen.width - 50,
    borderRadius: 20,
  },
  shadow: {
    flex: 0.4,
    flexDirection: 'row',
   // backgroundColor: '#10d60f',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,

    elevation: 15,
  },
});
