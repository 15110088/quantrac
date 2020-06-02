import React, { Component } from 'react';
import {
    View,
    Text,
    StatusBar,
    Button,
    Image,
    FlatList,
    ListRenderItem,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    Dimensions,
  } from 'react-native';
  import BackgroundHeader from '../../components/BackgroundHeader';
  import * as theme from '../../constants/theme';
  import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
  import Entypo from 'react-native-vector-icons/Entypo';
  import Octicons from 'react-native-vector-icons/Octicons';
  import AntDesign from 'react-native-vector-icons/AntDesign';
  import Feather from 'react-native-vector-icons/Feather';
  import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
  import {connect, useDispatch, useSelector} from 'react-redux';
  import {SearchBar, Input, ListItem,Card} from 'react-native-elements';
import config from '../../ultilities/config';

class DanhSachNguoiDung extends Component {
  constructor(props) {
    super(props);
    this.state = {
        lstNguoiDung :this.fecthDanhSachNguoiDung(),
        isLoadingListUser:false
    };
    
  }

  fecthDanhSachNguoiDung= async()=>{
        var URL = ''; 
        URL = `http://${config.URLIP_API}/api/CanhBao/GetDanhSachNguoiDung`
        this.setState({
            isLoadingListUser: true,
        });
        let response = await fetch(URL);
        const reponseJson  = await response.json()
        console.log(reponseJson)
        this.setState({  
            isLoadingListUser: false,
            lstNguoiDung:reponseJson
        }); 
  }
  SelectUser=(data)=>{
    this.props.navigation.navigate('Tabs', {
        screen: 'DanhSachTramCanhBao',
      });
  }
  renderItem = ({item, index}) => { 
      return (
        <ListItem
          onPress={() => this.SelectUser(item)}
          title={item.TEN}
          titleStyle={{fontSize: 16, fontWeight: 'bold', color: '#5D5D5D'}}
          subtitle={item.EMAIL_CB}
          rightIcon={
            <Entypo name="chevron-right" size={25} color="#5D5D5D"></Entypo>
          }
          leftIcon={
            <Entypo name="user" size={25} color="#5D5D5D"></Entypo>
          }
          bottomDivider
        />
      );
    
  };
 
  render() {
    return (
        <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView style={styles.container}>
          <BackgroundHeader style={[styles.bg, {}]} />
          <View style={styles.header}>
            <View style={styles.headerBody}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Map')}>
                <Entypo name="chevron-left" size={32} color="#fff" />
              </TouchableOpacity>
              <Text style={styles.headerText}>Danh Sách Người Dùng</Text>
              <TouchableOpacity>
                <MaterialIcons name="notifications" size={32} color="#fff" />
              </TouchableOpacity>
            </View>
                <View style={styles.cardBody}>
                    <FlatList 
                     scrollEnabled={true}
                     data={this.state.lstNguoiDung}
                     keyExtractor={item => item.ID}
                     renderItem={this.renderItem}
                    >

                    </FlatList>
                    </View>
          </View>
          </SafeAreaView>
        </>
    );
  }
}

export default DanhSachNguoiDung;
const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F0F1F2',
    },
    body: {
      width: windowWidth,
      height: windowHeight * 0.39,
      backgroundColor: theme.colors.white,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      padding: 10,
    },
    bg: {
      position: 'absolute',
      width: Dimensions.get('window').width,
      height: 200,
      borderBottomRightRadius: 0,
      borderBottomLeftRadius: 0,
    },
    bg1: {
      position: 'absolute',
      width: Dimensions.get('window').width,
      height: 50,
      borderBottomRightRadius: 10,
      borderBottomLeftRadius: 10,
    },
    image: {
      width: 100,
      height: 100,
      borderRadius: 50,
      backgroundColor: theme.colors.green,
    },
    header: {
      marginTop: 0,
      padding: 5,
    },
    headerBody: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    headerText: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#fff',
    },
    UserNameText: {
      fontSize: 30,
      fontWeight: 'bold',
      color: '#231b12',
    },
    cardBody: {
        paddingHorizontal: 15,
        paddingTop: 15,
        backgroundColor: '#fff',
        marginTop: 15,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.2,
        shadowRadius: 4,
        marginHorizontal:5
       // height:windowHeight/2
      },
    iconMenu: {
      width: 40,
      justifyContent: 'center',
      alignItems: 'center',
      height: 40,
      borderRadius: 10,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 5,
      },
      shadowOpacity: 0.36,
      shadowRadius: 6.68,
  
      elevation: 11,
    },
  });