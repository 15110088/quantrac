import React, { PureComponent } from 'react';
import {TouchableWithoutFeedback, StyleSheet, Dimensions,ImageBackground} from 'react-native';
const {width, height} = Dimensions.get('window');
import * as theme from '../../constants/theme';
import {
  Text,
  View,
  Dialog,
  Colors,
  PanningProvider,
  RadioGroup,
  RadioButton,
  Switch,
  Constants,
} from 'react-native-ui-lib'; // eslint-disable-line


const  DialogAQI=(props) =>  {
    console.log(props)
   
    return (
      // <TouchableWithoutFeedback
      // onPress={this.showToday}>
        <View flex-1>
        <View style={styles.destinationHeader}>
        <Text style={{ fontSize: theme.sizes.font * 1.25, textAlign:'center',color: theme.colors.white}}>
       {props.NgayTinh}
          </Text>
        </View>
        <ImageBackground
              style={[{flex: 0}, styles.destination, styles.shadow]}
              imageStyle={{ borderBottomLeftRadius: theme.sizes.radius,borderBottomRightRadius:theme.sizes.radius }}
              source={{ uri:'https://images.unsplash.com/photo-1507501336603-6e31db2be093?auto=format&fit=crop&w=800&q=80'}}>
                  <View row flex-1>
                    <View flex-1>
                    <View
                    style={{
                      width: 40,
                      height: 40,
                      backgroundColor: '#fff123',
                      borderRadius: 25,
                      marginTop:42,
                      alignSelf: 'center',
                    }}></View>
                    <Text style={{fontFamily:'Rubik', fontSize: 12, fontWeight: '600', paddingTop: 10,position: 'relative',textAlign: 'center',color:theme.colors.white}}>
                    {props.chatluongMT}
                    </Text>
                    </View>
                    <View flex-1>
                    <Text style={{fontFamily:'Rubik', fontSize: 70, fontWeight: '600',position: 'relative',textAlign: 'center',color:theme.colors.white}}>
                       {props.chiSo}
                    </Text>
                    <Text style={{fontFamily:'Rubik', fontSize: 12, fontWeight: '600',position: 'relative',textAlign: 'center',color:theme.colors.white}}>
                    AQI
                    </Text>
                    </View>
                    <View flex-1>
                    <Text style={{fontFamily:'Rubik', fontSize: 12, fontWeight: '600',position: 'relative',marginTop:40,color:theme.colors.white}}>
                    Cảnh Báo:
                    </Text>
                    <Text style={{fontFamily:'Rubik', fontSize: 12, fontWeight: '600', paddingBottom: 8,position: 'relative',textAlign: 'center',color:theme.colors.white}}>
                    {props.noidungCanhBao}
                    </Text>
                    </View>

                  </View>
              
        </ImageBackground>
        <View style={[{flexDirection: 'column'}, styles.destinationInfo, styles.shadow]}>
        <Text style={{fontFamily:'Rubik', fontSize: 12, fontWeight: '600', paddingBottom: 8,position: 'relative',textAlign: 'center'}}>
        {props.tenTram}
          </Text>
          <Text style={{fontFamily:'Rubik', fontSize: 12, fontWeight: '600', paddingBottom: 8,position: 'relative',textAlign: 'center'}}>
                    {props.tenTram}
          </Text>
          
        </View>
        </View>
       // </TouchableWithoutFeedback>
    );
  
}

export default  DialogAQI
const styles = StyleSheet.create({
    marker: {
      alignItems: 'center',
      justifyContent: 'center',
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: '#7F58FF',
      //  position: "absolute",
      //  marginTop: -60,
      shadowColor: '#7F58FF',
      shadowRadius: 5,
      shadowOffset: {height: 10},
      shadowOpacity: 0.3,
      borderWidth: 3,
      borderColor: '#FFFFFF',
    },
    dialog: {
      backgroundColor: Colors.white,
    },
    roundedDialog: {
      backgroundColor: Colors.white,
      marginBottom: Constants.isIphoneX ? 0 : 20,
      borderRadius: 12,
  
      borderBottomWidth: 10,
      borderBottomColor: '#fff123',
    },
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
      borderWidth:1,
  
      elevation: 14,
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
      justifyContent: 'flex-end',
  
      paddingHorizontal: 20,
      paddingTop: 10,
      paddingBottom: 10 * 1.5,
    },
    headerTitle: {
      color: theme.colors.gray,
    },
    headerLocation: {},
    search: {
      height: theme.sizes.base * 2,
      width: width - theme.sizes.base * 2,
    },
    searchInput: {
      fontSize: theme.sizes.caption,
      height: theme.sizes.base * 2,
      backgroundColor: 'rgba(142, 142, 147, 0.06)',
      borderColor: 'rgba(142, 142, 147, 0.06)',
      paddingLeft: theme.sizes.base / 1.333,
      paddingRight: theme.sizes.base * 1.5,
    },
    searchRight: {
      top: 0,
      marginVertical: 0,
      backgroundColor: 'transparent',
    },
    searchIcon: {
      position: 'absolute',
      right: theme.sizes.base / 1.333,
      top: theme.sizes.base / 1.6,
    },
  
  
    //style hiển thị dialog thông số
    destinations: {
      flex: 1,
      justifyContent: 'space-between',
      paddingBottom: 30,
    },
    destination: {
      width: width - (theme.sizes.padding * 2),
      height: width * 0.5-30,
      marginHorizontal: theme.sizes.margin,
      paddingHorizontal: 25,
      paddingVertical: 0,
     // borderRadius: theme.sizes.radius,
    },
    destinationInfo: {
      position: 'absolute',
      borderRadius: theme.sizes.radius,
      paddingHorizontal: 25,
      paddingVertical: theme.sizes.padding / 2,
      bottom: 40,
      left: (width-50 - (theme.sizes.padding * 4)) / (Platform.OS === 'ios' ? 3.2 : 3),
      backgroundColor: theme.colors.white,
      width: width - (theme.sizes.padding * 4),
    },
    destinationHeader:{
      marginHorizontal: theme.sizes.margin,
      paddingHorizontal: theme.sizes.padding,
      borderTopLeftRadius: theme.sizes.radius,
      borderTopRightRadius: theme.sizes.radius,
      width: width - (theme.sizes.padding * 2), height:30,
      backgroundColor:theme.colors.green,
    }
  });
  