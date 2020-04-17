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
    console.log(colorPiont)
    return (
        <SafeAreaView style={styles.overview}>
        <ScrollView contentContainerStyle={{ paddingVertical: 25} }>
            <Card  row middle style={{ marginHorizontal: 25, backgroundColor:colorPiont} }>
                <Block flex={1} center middle style={{ marginRight: 20 }}>
                    <Text light  color={'white'} height={43} size={36} spacing={-0.45}>0</Text>
                    <Text ligth color={'white'} caption center style={{ paddingHorizontal: 16, marginTop: 3 }}>
                        WQI
                    </Text>
                </Block>
                <Block flex={2}  center middle  >
                    <Text  size={22} paragraph ligth color="white">
                    Hà Nội
                    </Text>
                    <Text   paragraph ligth color="white">
                    10h30 20/20/2020
                    </Text>
                </Block>
            </Card>

            <Block row style={[styles.margin, { marginTop: 18 }]}>
            <Card middle style={{ marginRight: 7 }}>
             
              <Text h3  style={{ marginTop: 0 }}>8.75</Text>
     
              <Block row center >
                <Label purple />
                <Text paragraph color="gray">PH</Text>
              </Block>
            </Card>
            <Card middle style={{ marginLeft: 7 }}>
              <Text h3  style={{ marginTop: 0 }}>3.85</Text>
            

              <Block row center >
                <Label blue />
                <Text paragraph color="gray">DO</Text>
              </Block>
              
            </Card>
          </Block>


          <Card  middle style={[styles.margin, { marginTop: 18 }]}>
        
         <Chart></Chart>
              
        
          
        </Card>
         



        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default Today;
