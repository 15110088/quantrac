import React, {Component, PureComponent} from 'react';
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
  VirtualizedList,
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
import {SearchBar, Input, ListItem, Card} from 'react-native-elements';
import config from '../../ultilities/config';
import Accordian from '../../components/Accordian';
import { ScrollView } from 'react-native-gesture-handler';
import { Layout, Toggle } from '@ui-kitten/components';


class DanhSachTramCanhBao extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lstTram:[],
      isLoadingListTram: false,
    };
  
  }
  UNSAFE_componentWillMount(){
    this.fetchDataTram()  
  }
  
  fetchDataTram = async () => {
    var URL = '';
    URL = `http://${config.URLIP_API}/api/CanhBao/GetDanhSachTram?idnguoidung=${this.props.route.params.idnguoidung}`;
    console.log(URL);
    await this.setState({
      isLoadingListTram: true,
    });
    let response = await fetch(URL);
    const reponseJson = await response.json();
    //console.log(reponseJson);
    this.setState({
      lstTram: reponseJson,
      isLoadingListTram: false,
    }); 
  };
  clickAll = (id) => {
    const newTram = this.state.lstTram;
    this.state.lstTram.map((v, i) => {
      if (v.ID != id) {
        newTram[i].isActive = false;
      } else {
        if(newTram[i].isActive==true)
        {
          newTram[i].isActive = false;
        }
        else{
          newTram[i].isActive = true;
        }
      }
    });
    this.setState({
      lstTram: newTram,
    });
  };
  
//    renderAccordians1=()=> {
//     const items = [];
//     this.state.menu.forEach(element => {
//         items.push(
//             <Accordian 
//                 clickAll={this.clickAll}
//                 isActive={element.isActive}
//                 title = {element.title}
//                 data = {element.data}
//                 id={element.id}
//             />
//         );
//     })
//     return items;
// }
 getItemCount = (data) => {
  return 50;
}
 getItem = (data, index) => {
  return {
    id: data.ID,
    TEN: data.TEN
  }
}
renderItemTram=({item})=>
{
  return(
    <ListItem
     title={item.TEN}
     titleStyle={{fontSize: 16, fontWeight: 'bold', color: '#5D5D5D'}}
     leftIcon={
      <FontAwesome5 name="broadcast-tower" size={25} color="#5D5D5D"></FontAwesome5>
    }
    rightElement={
      <Toggle
              //style={styles.toggle}
              onChange={()=>this.XuLyThongBao(item)}
              status='success'
              checked={item.CBVN2}>
            </Toggle>
    }
     bottomDivider
    >
    </ListItem>
  )
} 
XuLyThongBao= async(dataTram)=>{
 

  const newLstTram = this.state.lstTram;
  let CBVN2Old=null;
  await this.state.lstTram.map((v, i) => {
       if(v.ID===dataTram.ID)
       {
        CBVN2Old=v.CBVN2
        newLstTram[i].CBVN2=!v.CBVN2

       }
  })
  this.setState({
      lstTram:newLstTram
  })

  const data={
    tramCanhBao:dataTram,
    CBVN2Old:CBVN2Old
  }
  const requestOption = {
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify(data)
  }
  fetch(`http://${config.URLIP_API}/api/CanhBao/LuuThongBao`,requestOption).then((response) => response.json())
  .then((data) => console.log(data));
  console.log(this.state.lstTram)
}
  render() {
    console.log(this.state.isLoadingListTram);
    console.log(this.props.route.params.Phong)
    console.log(this.props.route.params.Ten)
    console.log(this.props.route.params.idnguoidung)

    const {idnguoidung,Ten,Phong} =this.props.route.params 
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView style={styles.container}>
          <BackgroundHeader style={[styles.bg, {}]} />
          <View style={styles.header}>
            <View style={styles.headerBody}>
              <TouchableOpacity
                onPress={() => this.props.navigation.goBack()}>
                <Entypo name="chevron-left" size={32} color="#fff" />
              </TouchableOpacity>
              <Text style={styles.headerText}>Danh Sách Trạm</Text>
              <TouchableOpacity>
                <MaterialIcons name="notifications" size={32} color="#fff" />
              </TouchableOpacity>
            </View>
            <View style={{flexDirection:'row'}}>
            <Image
              source={require('../../assets/image/logo.png')}
              style={[styles.image]}></Image>
              <View style={{flex:1,justifyContent:'space-around',marginHorizontal:20}}> 
               <Text style={{fontSize:20,color:theme.colors.white,}}>{Ten}</Text>
                <Text style={{color:theme.colors.gray2}}>Phòng : {Phong} </Text>
              </View>
             
            </View>
           
            {/* <Button title="OK" onPress={() => this.clickAll(3)}></Button> */}
            {/* <View style={styles.cardBody}><ScrollView>{!this.state.isLoadingListTram && this.renderAccordians()}</ScrollView></View> */}
          <View style={styles.cardBody}>
            {/* <ScrollView> */}
              {/* { this.renderAccordians()} */}
            {/* </ScrollView> */}


            {/* <VirtualizedList 
            data={this.state.lstTram} 
            keyExtractor={item => item.ID} 
            getItemCount={this.getItemCount}
            getItem={this.getItem}
            renderItem={this.renderItemTram}>

              </VirtualizedList> */}


              <FlatList 
                data={this.state.lstTram} 
               keyExtractor={(item) => {item.ID}} 
                renderItem={this.renderItemTram}>
              </FlatList>
            </View>

          </View>
        </SafeAreaView>
      </>
    );
  }
}

export default DanhSachTramCanhBao;
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
    marginHorizontal:10,
    backgroundColor: theme.colors.green,
  },
  header: {
    marginTop: 0,
    padding: 5,
    flex:1,
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
    marginHorizontal: 5,
    marginBottom:15,
    flex:1
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
  title:{
    fontSize: 14,
    fontWeight:'bold',
    color: '#231b12',
    width:'90%',
    borderWidth:2
},
row:{
    flexDirection: 'row',
    justifyContent:'space-between',
    height:56,
    paddingLeft:25,
    paddingRight:18,
    alignItems:'center',
    backgroundColor: theme.colors.white,
    borderBottomWidth:0.5
},
parentHr:{
    height:1,
    color: theme.colors.white,
    width:'100%',
  
},
child:{
    backgroundColor: theme.colors.gray2,
    padding:16,
}
});
