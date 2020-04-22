import * as theme from '../../constants/theme';
import React, {Component} from 'react';
import {View, StyleSheet, SafeAreaView, ScrollView} from 'react-native';
import {Block, Card, Text, Icon, Label} from '../../components';
import ChartAQI from './ChartAQI';
import DialogAQI from './DialogAQI';
import Entypo from 'react-native-vector-icons/Entypo'
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons'
import * as Animatable from 'react-native-animatable';

const styles = StyleSheet.create({
  overview: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: theme.colors.white,
  },
  margin: {
    marginHorizontal: 25,
  },

  driver: {
    marginBottom: 11,
  },
  footer: {
    flex: 1,
    backgroundColor: theme.colors.green,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  tenTram:{
    fontWeight:'bold',
    paddingHorizontal:40
  }
});

class TodayAQI extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const chiSo = this.props.route.params.chiSo;
    const tenTram = this.props.route.params.tenTram;
    const chatluongMT = this.props.route.params.chatluongMT;
    const NgayTinh = this.props.route.params.NgayTinh;
    const noidungCanhBao = this.props.route.params.noidungCanhBao;
    return (
   
      <SafeAreaView style={styles.overview}>
        <View style={{flex: 2, paddingVertical: 30}}>

          <Card
            row
            middle
            style={{
              marginHorizontal: 25,
              backgroundColor: '#fff123',
              flex: 0.3,
            }}>
            <Block flex={1} center middle style={{marginRight: 20}}>
              <Text light color={'white'} height={43} size={36} spacing={-0.45}>
                {chiSo}
              </Text>
              <Text
                ligth
                color={'white'}
                caption
                center
                style={{paddingHorizontal: 16, marginTop: 3}}>
                AQI
              </Text>
            </Block>
          </Card>
          <Card middle style={[styles.margin, {marginTop: 18, flex: 0.7}]}>
            <ChartAQI></ChartAQI>
          </Card>
        </View>
      
        <Animatable.View animation='fadeInUpBig' duration={1000} delay={0} useNativeDriver style={styles.footer}>
          <Block style={{paddingVertical:20}}>  
          <Text  style={styles.tenTram} bold  size={20}  color="#fff">
               <Entypo name="location"></Entypo> {tenTram}
          </Text> 
         
          <Block row >
            <Block flex={1} center>
              <Text bold color={'white'} height={80} size={60} spacing={-0.45}>
                {chiSo}
              </Text>
              <Text bold color={'white'} caption center>
                AQI
              </Text> 
            </Block>
            <Block flex={2}  >
              <Text  ligth color={theme.colors.gray}  style={{paddingVertical:20}}  >
              <MaterialCommunityIcons name="camera-timer"></MaterialCommunityIcons> 

          {' '}{NgayTinh}
              </Text>
        

              <Text  ligth color={theme.colors.gray} style={{top: -15,}}>
              <Entypo name="emoji-happy"></Entypo> 
              {' '}{chatluongMT}
              </Text>
            </Block>
          </Block>
          </Block>
       
        </Animatable.View>
      </SafeAreaView>
      
    );
  }
}

export default TodayAQI;
