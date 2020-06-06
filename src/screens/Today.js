import React, {Component} from 'react';
import {View, StyleSheet, SafeAreaView, ScrollView} from 'react-native';
import config from '../ultilities/config'
import {Block, Card, Text, Icon, Label} from '../components';
import * as theme from '../constants/theme';

import Chart from './Chart';
import Loading from './Loading';

import { CheckBox } from 'react-native-elements'


class Today extends Component {

  
  constructor(props) {
    super(props);
    this.state = {
      // Day
      xChartDayPH:[],
      yChartDayPH:[],
      xChartDayDO:[],
      yChartDayDO:[],
      // giờ
      xChartHourPH:[],
      yChartHourPH:[],
      xChartHourDO:[],
      yChartHourDO:[],

      isLoading:true,
      isCheckDay:true,
      timeDayorHour:1 //1 gio 2 ngay
    };
  }

  fetchDataOneHour = async () => {
    try {
      var URL = `http://${config.URLIP}/DuLieuQuanTracServices.svc/GetDataHistoryNowNuocTuDong?maTram=${this.props.route.params.maTram}`
      let response = await fetch(URL);
      await this.setState({
        isLoading: true,
      });
      let reponseJson = await response.json();

      await reponseJson.map((value,index)=>{
        console.log(value)
        var  Ngay=value.NgayTinh.substring(0,5)+value.NgayTinh.substring(9,11);
         this.setState({ 
          xChartHourPH: [...this.state.xChartHourPH,value.PH],
          yChartHourPH: [...this.state.yChartHourPH,Ngay],
          xChartHourDO: [...this.state.xChartHourDO,value.DO],
          yChartHourDO: [...this.state.yChartHourDO,Ngay],
        });
      })
      await console.log(this.state.xChartHourPH)
      await console.log(this.state.xChartHourDO)
      await  console.log(this.state.yChartHourPH)
      await this.setState({
        isLoading: false,
      });

    } catch (error) {
      console.error(error);
    }
  };
  CheckSelectDay=(time)=>{
   
    //1 giờ  -  2 ngày
    if(time==1 && !this.state.isCheckDay)
    {
      this.setState({
        isCheckDay:!this.state.isCheckDay,
        xChart:this.state.xChartHour,
        yChart:this.state.yChartHour,
        timeDayorHour:1
      })
     
    }
    if(time==2 && this.state.isCheckDay)
    {
      this.setState({
        isCheckDay:!this.state.isCheckDay,
        xChart:this.state.xChartDay,
        yChart:this.state.yChartDay,
        timeDayorHour:2
      })
    
    }
  }
  componentWillMount(){
    this.fetchDataOneHour();
   
  }
  
  render() {
    const colorPiont = this.props.route.params.colorPoint;
    const {xChart,yChart,xChartDay,yChartDay,xChartHourPH,yChartHourPH,xChartHourDO} = this.state

    const {tenTram,maTram,NgayTinh,DO,PH} = this.props.route.params;
    return (
      <SafeAreaView style={styles.overview}>
        <View style={{flex: 1, paddingVertical: 30}}>
          <Card
            row
            middle
            style={{
              marginHorizontal: 25,
              backgroundColor: colorPiont,
              flex: 0.2,
            }}>
           
            <Block flex={2} center middle>
              <Text size={22} paragraph ligth color="white">
                {tenTram}
              </Text>
              <Text paragraph ligth color="white">
                {NgayTinh}
              </Text>
            </Block>
          </Card>

          <Block row style={[styles.margin, {marginTop: 5, flex: 0.35}]}>
            <Card middle style={{marginRight: 7}}>
              <Text h3 style={{marginTop: 0}}>
                {PH.GiaTri}
              </Text>
              <Block row center style={{marginTop: 5}}>
                <Label purple />
                <Text paragraph color="gray">
                  PH
                </Text>
              </Block>
            </Card>
            <Card middle style={{marginLeft: 7}}>
              <Text h3 style={{marginTop: 0}}>
                {DO.GiaTri}
              </Text>

              <Block row center style={{marginTop: 5}}>
                <Label blue />
                <Text paragraph color="gray">
                  DO
                </Text>
              </Block>
            </Card>
          </Block>

          <Card middle style={[styles.margin, {marginTop: 18}]}>
          {
           this.state.isLoading?  
        
            <Loading></Loading>:
            <>
            <View style={{flexDirection:'row'}}>
            <CheckBox
              title='Giờ'
              checked={this.state.isCheckDay}
              checkedColor={theme.colors.green}
              onPress={()=>this.CheckSelectDay(1)}
            />
            <CheckBox
              title='Ngày'
              checked={!this.state.isCheckDay}
              checkedColor={theme.colors.green}
              onPress={()=>this.CheckSelectDay(2)}
            />
            </View>
            {this.state.timeDayorHour==1?<Chart xChartPH={xChartHourPH} xChartDO={xChartHourDO} yChartPH={yChartHourPH} ></Chart>:null }
            {this.state.timeDayorHour==2?<Chart xChart={xChartDay} yChart={yChartDay}  ></Chart>:null }
             </>
             }
          </Card>  
        </View>
      </SafeAreaView>
    );
  }
}

export default Today;
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
  },
});