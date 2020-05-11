import * as theme from '../../constants/theme';
import React, {Component} from 'react';
import {View, StyleSheet, SafeAreaView, ScrollView,ActivityIndicator} from 'react-native';
import {Block, Card, Text, Icon, Label} from '../../components';
import ChartAQI from './ChartAQI';
import DialogAQI from './DialogAQI';
import Entypo from 'react-native-vector-icons/Entypo'
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons'
import * as Animatable from 'react-native-animatable';
import Loading from '../Loading';
import config from '../../ultilities/config';
import { CheckBox } from 'react-native-elements'

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
// load chart sử dụng feech data 2 lần . lần 1 hiển thị  lần 2 dợi load xong
class TodayAQI extends Component {
  fetchDataOneHour = async () => {
    try {
      var URL = `http://${config.URLIP}/DuLieuQuanTracServices.svc/GetDataHistoryNowKhiTuDong?maTram=${this.props.route.params.maTram}`
      let response = await fetch(URL);
      await this.setState({
        isLoading: true,
      });
      let reponseJson = await response.json();
      reponseJson.map((value,index)=>{
        var  Ngay=value.NgayTinh.substring(0,5)+value.NgayTinh.substring(9,11);
         this.setState({
          xChart: [...this.state.xChart,value.chiSo],
          yChart: [...this.state.yChart,Ngay],
          xChartHour: [...this.state.xChartHour,value.chiSo],
          yChartHour: [...this.state.yChartHour,Ngay],
        });
      })
      await this.setState({
        isLoading: false,
      });

    } catch (error) {
      console.error(error);
    }
  };

  fetchDataOneDay = async () => {
    try {
      var URL = `http://${config.URLIP}/DuLieuQuanTracServices.svc/GetDataHistoryDayKhiTuDong?maTram=${this.props.route.params.maTram}`
      let response = await fetch(URL);
      await this.setState({
        isLoading: true,
      });
      let reponseJson = await response.json();
      reponseJson.map((value,index)=>{
        var  Ngay=value.NgayTinh.substring(13);
         this.setState({
          xChartDay: [...this.state.xChartDay,value.chiSo],
          yChartDay: [...this.state.yChartDay,Ngay],
        });
      })
      await this.setState({
        isLoading: false,
      });
    } catch (error) {
      console.error(error);
    }
  };


  componentWillMount(){
    this.fetchDataOneHour();
   
  }
  componentDidMount(){
    this.fetchDataOneDay();
  }
  constructor(props) {
    super(props);
    this.state = {
        xChart:[],
        yChart:[],
        xChartDay:[],
        yChartDay:[],
        xChartHour:[],
        yChartHour:[],
        isLoading:true,
        isCheckDay:true,
        timeDayorHour:1 //1 gio 2 ngay
    };
  }
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
  render() {
    const chiSo = this.props.route.params.chiSo;
    const tenTram = this.props.route.params.tenTram;
    const chatluongMT = this.props.route.params.chatluongMT;
    const NgayTinh = this.props.route.params.NgayTinh;
    const noidungCanhBao = this.props.route.params.noidungCanhBao;
    const maTram = this.props.route.params.maTram;
    const {xChart,yChart,xChartDay,yChartDay,xChartHour,yChartHour} = this.state
     

    return (
   
      <SafeAreaView style={styles.overview}>
        <View style={{flex: 2, paddingVertical: 30}}>
          <Card
            row
            middle
            style={{
              marginHorizontal: 25,
              backgroundColor: '#fff',
              flex: 0.2,
            }}>
            <Block flex={1} center middle style={{marginRight: 20}}>
              <Text light color={'green'} height={43} size={36} spacing={-0.45}>
                {maTram}
              </Text>
            </Block>
          </Card>
          <Card middle style={[styles.margin, {marginTop: 9, flex: 0.8}]}>
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
            {this.state.timeDayorHour==1?<ChartAQI xChart={xChartHour} yChart={yChartHour} ></ChartAQI>:null }
            {this.state.timeDayorHour==2?<ChartAQI xChart={xChartDay} yChart={yChartDay}  ></ChartAQI>:null }

             </>
             }
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
