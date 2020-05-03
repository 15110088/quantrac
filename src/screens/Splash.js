import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Swiper from 'react-native-swiper';
import * as Animatable from 'react-native-animatable';
import * as theme from '../constants/theme';


class Splash extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animation_signin: null,
      animation_signup: null,
      show:false,
      isAQI:false,
      isWQI:true,
    };
  }
  clickAQI=()=>{
  
    this.setState({
      isAQI:true,
      isWQI:false
    })
    this.props.navigation.navigate('MapStack',{
       screen:'Map', 
       params:{
         typeMonitoring:2,
         keySearch:'se ne'
      }
    })
    
  }
  clickWQI=()=>{
    this.setState({
      isAQI:false,
      isWQI:true
    })
    this.props.navigation.navigate('MapStack',{
      screen:'Map', 
      params:{typeMonitoring:1}
   })
  }
  render() {
    onIndexChanged=(index)=>{
        if(index==1)
        {
           this.setState({
            animation_signin: 'bounceInLeft',
            animation_signup: 'bounceInRight',
            show:true
           })
        }
        else{
            this.setState({              
                animation_signin: null,
                animation_signup: null,
                show:false,
               })
        }
    }
   
    return (
      
      <Swiper
        loop={false}
        dot={<View style={styles.dot}></View>}
        activeDot={<View style={styles.activeDot}></View>}
        onIndexChanged={(index)=>{onIndexChanged(index)}}
        >
        <View style={styles.silde}>
          <View style={styles.header}>
            {/* <Image
              source={require('../assets/image/logo.png')}
              style={styles.image}></Image> */}
          </View>
          <View style={styles.footer}>
            <Text style={styles.title}>TRUNG TÂM CÔNG NGHỆ THÔNG TIN</Text>
          </View>
        </View>
        <View style={styles.silde}>
          <View style={styles.header}>
            {/* <Image
               source={require('../assets/image/logo.png')}
              style={styles.image}></Image> */}
          </View>

          <View style={styles.footer}>
            <Text style={styles.title}>THÔNG TIN QUAN TRẮC</Text>
            {this.state.show?
            <View style={{flexDirection: 'row'}}>
              <Animatable.View animation={this.state.animation_signin} duration={1500} delay={0} useNativeDriver>
                <TouchableOpacity onPress={this.clickWQI}
                  style={[
                    styles.button,
                    {
                      borderColor: this.state.isWQI?theme.colors.green:theme.colors.white,
                      borderRadius: 50,
                      borderWidth: 1,
                      marginTop: 15,
                      backgroundColor: this.state.isWQI?theme.colors.white:theme.colors.green,
                    },
                  ]}>
                  <Text style={{color: this.state.isWQI?theme.colors.green:theme.colors.white}}>WQI</Text>
                </TouchableOpacity>
              </Animatable.View>
              <Animatable.View animation={this.state.animation_signup} duration={1500} delay={0} useNativeDriver>
                <TouchableOpacity onPress={this.clickAQI}
                  style={[
                    styles.button,
                    {
                      borderColor: this.state.isAQI?theme.colors.green:theme.colors.white,
                      borderRadius: 50,
                      borderWidth: 1,
                      marginTop: 15,
                      marginLeft: 20,
                      backgroundColor: this.state.isAQI?theme.colors.white:theme.colors.green,
                    },
                  ]}>
                  <Text style={{color: this.state.isAQI?theme.colors.green:theme.colors.white}}>AQI</Text>
                </TouchableOpacity>
              </Animatable.View>
            
            </View>
            :null}
          </View>
        </View>
      </Swiper>
    );
  }
}

export default Splash;

const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;

const heightImage = windowWidth * 0.6 * 0.9;
const weightImage = heightImage * 1;

const widthButton = windowHeight * 0.2;

const styles = StyleSheet.create({
  silde: {
    flex: 1,
    backgroundColor: theme.colors.green,
  },
  header: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: 20,
    top:-70
 
  },
  image: {
    width: weightImage,
    height: heightImage,
    color:theme.colors.white
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: theme.colors.white,
    textAlign: 'center',
  },
  dot: {
    backgroundColor: theme.colors.white,
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 5,
    marginVertical: 3,
  },
  activeDot: {
    backgroundColor: theme.colors.white,
    width: 20,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 5,
    marginVertical: 3,
  },
  button: {
    width: widthButton,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});



