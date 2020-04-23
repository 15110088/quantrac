import * as theme from '../../constants/theme';
import {Block, Card, Label, Input} from '../../components';
import React, {Component, useState, useEffect} from 'react';

import {
  TouchableWithoutFeedback,
  StyleSheet,
  Dimensions,
  ImageBackground,
  ActivityIndicator,
  View,Text
} from 'react-native';
const LevelAQI = () => {
  return (
    <Block middle row>
      <View style={[styles.level,{borderTopLeftRadius:8,borderBottomLeftRadius:8,backgroundColor:'#00e400'}]}>
        <Text style={styles.lable}>0-50</Text>
      </View>
      <View style={[styles.level,{backgroundColor:'#FFCC00'}]}>
        <Text style={styles.lable}>51-100</Text>
      </View>
      
        <View style={[styles.level,{backgroundColor:'#FF7E00'}]}>
        <Text style={styles.lable}>101-150</Text>
      </View>
       <View style={[styles.level,{backgroundColor:'#EE0000'}]}>
        <Text style={styles.lable}>151-200</Text>
      </View>
       <View style={[styles.level,{backgroundColor:'#8F3F97'}]}>
        <Text style={styles.lable}>201-300</Text>
      </View>
       <View style={[styles.level,{borderBottomRightRadius:8,borderTopRightRadius:8,backgroundColor:'#7E0023'}]}>
        <Text style={styles.lable}>301</Text>
      </View>
    </Block>
  );
};

export default LevelAQI;

const styles = StyleSheet.create({
  lable: {
    fontSize: 10,
    textAlign: 'center',
    color: theme.colors.white,
    fontWeight: 'bold',
  },
  level: {
    width: 50,
    height: 15,
   // backgroundColor: '#FFCC00',
  },
});
