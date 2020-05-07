import React, { Component } from 'react';
import { View,StyleSheet,SafeAreaView,ScrollView } from 'react-native';

import { Block, Card, Text, Icon, Label } from '../components';
import * as theme from '../constants/theme';

import Chart from './Chart';

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
    avatar: {
      width: 48,
      height: 48,
      borderRadius: 24,
    }
  });

class Today extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  
  
  render() {
    const colorPiont = this.props.route.params.colorPoint
    const PH = this.props.route.params.PH
    const DO = this.props.route.params.DO
    const NgayTinh = this.props.route.params.NgayTinh
    const tenTram = this.props.route.params.tenTram
    const maTram = this.props.route.params.maTram



    console.log(colorPiont)
    return (
        <SafeAreaView style={styles.overview}>
              <View style={{flex: 1, paddingVertical: 30}}>

            <Card  row middle style={{ marginHorizontal: 25, backgroundColor:colorPiont,flex:0.2} } >
                {/* <Block flex={1} center middle style={{ marginRight: 20 }}>
                    <Text light  color={'white'} height={43} size={36} spacing={-0.45}>0</Text>
                    <Text ligth color={'white'} caption center style={{ paddingHorizontal: 16, marginTop: 3 }}>
                        WQI
                    </Text>
                </Block> */}
                <Block flex={2}  center middle  >
                    <Text  size={22} paragraph ligth color="white">
                    {tenTram}
                    </Text>
                    <Text   paragraph ligth color="white">
                    {NgayTinh}
                    </Text>
                </Block>
            </Card>

            <Block row style={[styles.margin, { marginTop: 5 ,flex:0.35}]}>
            <Card middle style={{ marginRight: 7 }}>
             
    <Text h3  style={{ marginTop: 0 }}>{PH}</Text>
     
              <Block row center style={{marginTop:5}} >
                <Label purple />
                <Text paragraph color="gray">PH</Text>
              </Block>
            </Card>
            <Card middle style={{ marginLeft: 7 }}>
    <Text h3  style={{ marginTop: 0 }}>{DO}</Text>
          
              <Block row center style={{marginTop:5}} >
                <Label blue />
                <Text paragraph color="gray">DO</Text>
              </Block>
              
            </Card>
          </Block>


        <Card  middle style={[styles.margin, { marginTop: 18 }]}>
        
         <Chart></Chart>
              
        
          
        </Card>
         



        </View>
      </SafeAreaView>
    );
  }
}

export default Today;
