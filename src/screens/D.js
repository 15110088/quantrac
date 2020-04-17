import React, { Component } from 'react';
import {TouchableWithoutFeedback,StyleSheet,Dimensions} from 'react-native';
import MapView, { PROVIDER_GOOGLE ,Polyline} from 'react-native-maps';
import { Image, Button,Overlay } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import { Block, Card, Label ,Input} from '../components';
import * as theme from '../constants/theme';
import { Autocomplete, AutocompleteItem } from '@ui-kitten/components';

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
import {Icon} from 'react-native-elements';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';


const { width, height } = Dimensions.get("window");

const COORDINATES = [
  { latitude: 37.8025259, longitude: -122.4351431 },
  { latitude: 37.7896386, longitude: -122.421646 },
  { latitude: 37.7665248, longitude: -122.4161628 },
  { latitude: 37.7734153, longitude: -122.4577787 },
  { latitude: 37.7948605, longitude: -122.4596065 },
  { latitude: 37.8025259, longitude: -122.4351431 },
];
const region={
  latitude: 37.78825,
  longitude: -122.4324,
  latitudeDelta: 0.09,
  longitudeDelta: 0.09,
}
const region2={
  latitude: 10.9597071,
  longitude: 106.8559846,
  latitudeDelta: 0.01,
  longitudeDelta: 0.01,
}
class D extends Component {
  constructor(props) {
    super(props);
    this.SCROLL_TYPE = {
      NONE: 'none',
      VERTICAL: 'vertical',
      HORIZONTAL: 'horizontal',
    };
    this.state = {
      isVisible:true,
      isShow: false,
      //dialog
      panDirection: PanningProvider.Directions.UP,
      position: 'center',
      scroll: this.SCROLL_TYPE.NONE,
      showHeader: true,
      isRounded: true,
      showDialog: false,
      showDialogType: false,
      typeMonitoring:this.props.route.params.typeMonitoring,
      colorPoint:'#ffffff',
      PH:0,
      DO:0,
      active:null,
      Movies:[
        { title: 'Star Wars' },
        { title: 'Back to the Future' },
        { title: 'The Matrix' },
        { title: 'Inception' },
        { title: 'Interstellar' },
      ],
      value:null
    };
  }
  xulysolieu()
  {
    this.props.data.map((value,index)=>{
      this.props.xacdinhmau(index,value)
    })
  }
  componentDidMount(){
    this.xulysolieu()
    console.log(this.props.route.params.typeMonitoring)
    
  }
  showDialog = (data) => {
   
    this.setState({
      showDialog: !this.state.showDialog,
      colorPoint: data.colorHerder,
      PH:data.PH,
      DO:data.DO
    });

  };

  showDialogTypeMonitoring = (data) => {
    this.setState({
      showDialogType: !this.state.showDialogType,
    });

  };




  // getDialogKey = (height) => {//warning
  //   const {position} = this.state;
  //   return `dialog-key-${position}-${height}`;
  // };
  renderPannableHeader = (props) => {
    const {title} = props;
    return (
      <View>
        <View margin-20>
          <Text>{title}</Text>
        </View>
        <View height={1} bg-dark70 />
      </View>
    );
  };



  renderHeader() {
    return (
      <View style={styles.header}>
        <Block animated middle  style={styles.search}>
        <Input
          placeholder="Search"
          // placeholderTextColor={theme.colors.gray2}
          // style={styles.searchInput}
          // onFocus={() => this.handleSearchFocus(true)}
          // onBlur={() => this.handleSearchFocus(false)}
          // onChangeText={text => this.setState({ searchString: text })}
          // value={searchString}
          // onRightPress={() =>
          //   isEditing ? this.setState({ searchString: null }) : null
          // }
          // rightStyle={styles.searchRight}
       
        />
      </Block>
      <TouchableWithoutFeedback onPress={()=>this.showDialogTypeMonitoring('1')} >
      
         <Icon name="wrench" type="foundation" color="#517fa4" />
      </TouchableWithoutFeedback>
      </View>
    );
  }
  renderDialog = () => {
    const {
      showDialog,
      panDirection,
      position,
      scroll,
      showHeader,
      isRounded,
      colorPoint,
      PH,
      DO,
   
    } = this.state;
    const renderPannableHeader = showHeader
      ? this.renderPannableHeader
      : undefined;
    const height = scroll !== this.SCROLL_TYPE.NONE ? '70%' : '20%';
    return (
      <Dialog
        migrate
        useSafeArea
        //key={this.getDialogKey(height)}
        top={position === 'top'}
        bottom={position === 'bottom'}
        height={height}
        width={'52%'}
        panDirection={panDirection}
        containerStyle={{backgroundColor: Colors.white,
          marginBottom: Constants.isIphoneX ? 0 : 20,
          borderRadius: 12,
      
          borderBottomWidth: 10,
          borderBottomColor: colorPoint,}}
        visible={showDialog}
        onDismiss={this.showDialog}
        // renderPannableHeader={renderPannableHeader}
        pannableHeaderProps={this.pannableTitle}
        //supportedOrientations={this.supportedOrientations}
      >
        <TouchableWithoutFeedback onPress={()=>this.props.navigation.push('Today',{colorPoint:colorPoint})} >
        <View>
          <View style={{backgroundColor: colorPoint}}>
            <Text
              style={{
                color: '#fff',
                alignSelf: 'center',
                fontWeight: 'bold',
                fontSize: 20,
              }}>
              {' '}
              Hà Nội
            </Text>
          </View>
          <View height={2} bg-dark70 />

          <View row>
            <View flex-1 style={styles.shadown}>
              <View style={{ width: 40,
    height: 40,
    backgroundColor: colorPoint,
    borderRadius: 20,
    top: 5,

    alignSelf: 'center',}}></View>
              <View centerH style={{top: 5}}>
                <Text style={{color: colorPoint}}>GOOD</Text>
              </View>
            </View>

            <View flex-2>
              <View row marginL-0>
                <Icon name="clock" type="evilicon" color="#517fa4" />
                <Text text90>10:30 02/04/2020</Text>
              </View>

              <View row>
                <View flex-1>
                  <View centerH style={{top: 10}}>
                    <Text
                      style={{
                        top: -10,
                        color: 'gray',
                        fontSize: 30,
                        fontWeight: 'bold',
                      }}>
                      {PH}
                    </Text>
                    <Text style={{color: 'gray', top: -15, left: 5}}>PH </Text>
                  </View>
                </View>
                <View flex-1>
                  <View centerH style={{top: 10}}>
                    <Text
                      style={{
                        top: -10,
                        color: 'gray',
                        fontSize: 30,
                        fontWeight: 'bold',
                      }}>
                      {DO}
                    </Text>
                    <Text style={{color: 'gray', top: -15, left: 5}}>DO </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
        </TouchableWithoutFeedback>
      </Dialog>
     
    );
  };

  handleType = id => {
    const { active } = this.state;
    console.log(id)
    this.setState({ active: active === id ? null : id
                    ,showDialogType:!this.state.showDialogType,
                    typeMonitoring: id=='Air'?2:1
                   });
  }
  renderDialogTypeMonitoring = () => {
    const {
      showDialogType,
      panDirection,
      position,
      scroll,
      showHeader,
      colorPoint,
      PH,
      DO,
      active
    } = this.state;
    const renderPannableHeader = showHeader
      ? this.renderPannableHeader
      : undefined;
    const height = scroll !== this.SCROLL_TYPE.NONE ? '70%' : '20%';
    const adminIcon = (
      <Image
        source={require('../assets/images/icons/water.png')}
        style={{ height: 30, width: 30 }}
      /> 
    );

    const operatorIcon = (
      <Image
        source={require('../assets/images/icons/air.png')}
        style={{ height: 30, width: 30 }}
      />
    );

    const checkIcon = (
      <Image
        source={require('../assets/images/icons/check.png')}
        style={{ height: 18, width: 18 }}
      />
    );
    
    return (
      <Dialog
        migrate
        useSafeArea
       // key={this.getDialogKey(height)}
        top={position === 'top'}
        bottom={position === 'bottom'}
        height={height}
        width={'50%'}
        panDirection={panDirection}
        containerStyle={{backgroundColor: Colors.white,
          marginBottom: Constants.isIphoneX ? 0 : 20,
          borderRadius: 12,
          borderBottomWidth: 10,
          borderBottomColor: '#fff',}}
        visible={showDialogType}
        onDismiss={this.showDialogTypeMonitoring}
        // renderPannableHeader={renderPannableHeader}
        pannableHeaderProps={this.pannableTitle}
        //supportedOrientations={this.supportedOrientations}
      >
        <View style={{backgroundColor: '#fff123'}}>
            <Text
              style={{
                color: '#fff',
                alignSelf: 'center',
                fontWeight: 'bold',
                fontSize: 20,
              }}>
              {' '}
              Type
            </Text>
          </View>
       <Block row style={{ marginHorizontal: 20, marginTop: 5, }}>
            <TouchableWithoutFeedback
              onPress={() => this.handleType('Water')}
              style={active === 'Water' ? styles.activeBorder : null}
            >
              <Block
                center
                middle
                style={[
                  styles.card,
                  { marginRight: 20},
                  active === 'Water' ? styles.active : null
                ]}
              >
                {
                  active === 'Water' ? (
                    <Block center middle style={styles.check}>
                      {checkIcon}
                    </Block>
                  ) : null
                }
                <Block center middle style={styles.icon}>
                  {adminIcon}
                </Block>
                
              </Block>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback
              onPress={() => this.handleType('Air')}
              style={active === 'Air' ? styles.activeBorder : null}
            >
              <Block
                center
                middle
                style={[
                  styles.card,
                  active === 'Air' ? styles.active : null
                ]}
              >
                {
                  active === 'Air' ? (
                    <Block center middle style={styles.check}>
                      {checkIcon}
                    </Block>
                  ) : null
                }
                <Block center middle style={styles.icon}>
                  {operatorIcon}
                </Block>
                
              </Block>
            </TouchableWithoutFeedback>

          </Block>

        
      </Dialog>
     
    );
  }; onChangeText = (query) => {
     console.log(query)
    //setValue(query);
    //setData(movies.filter(item => filter(item, query)));
  };
  renderOption = (item, index) => (
    <AutocompleteItem
      key={index}
      title={item.title}
      //accessoryLeft={StarIcon}
    />
  );
  onSelect = (index) => {

    this.setState({
      title:this.state.Movies[index].title
    })

  };
  render() {
    var {data} = this.props.data
    var {addNumber,subNumber,xacdinhmau,navigation} = this.props
    const {typeMonitoring }=this.state
   
    return (
//       <>
//       {this.renderHeader()}
//       <MapView
//       //provider={PROVIDER_GOOGLE} // remove if not using Google Maps
//       style={{flex:1}}
//       region={region2}
//     >
//       {
//         this.props.data.filter(n=>n.Loai==typeMonitoring).map((marker,index)=>{
//           console.log('=====')
//           console.log(marker.PH) 
//           return (
        
//                 <MapView.Marker onPress={() => this.showDialog(marker)} key={marker.id} coordinate={marker.COORDINATES[0]} >
//                <TouchableWithoutFeedback >

//                       <View style={{  alignItems: "center",
//                               justifyContent: "center",
//                               width: 40,
//                               height: 40,
//                               borderRadius: 20,
//                               backgroundColor: marker.colorHerder,
//                             //  position: "absolute",
//                             //  marginTop: -60,
//                                 shadowColor: "#7F58FF",
//                                 shadowRadius: 5,
//                                 shadowOffset: { height: 10 },
//                                 shadowOpacity: 0.3,
//                                 borderWidth: 3,
//                                 borderColor: "#FFFFFF"}}>
//                       <Text style={{ fontWeight:'bold',fontSize:18 ,color:'white' }}>{marker.PH}</Text>
//                   </View>
                
//                 </TouchableWithoutFeedback>
//                 </MapView.Marker>
          
//           ); 
//         })
//       }
    
//     </MapView>
//     {this.renderDialog()}
//     {this.renderDialogTypeMonitoring()}
// </>


    <>
    {this.renderHeader()}
    <Text>D</Text>
    <Autocomplete
          placeholder='Place your Text'
          value={this.state.value}
          //accessoryRight={renderCloseIcon}
          //onChangeText={onChangeText}
          onSelect={this.onSelect}>
          {this.state.Movies.map((item,index)=>{this.renderOption(item,index)})}
        </Autocomplete>
    <Button  onPress={()=>subNumber(0)} title='sub'></Button>
      <Text>Counter:{this.props.data[0].PH}</Text>
      <Button onPress={()=>addNumber(0,10)} title='add' ></Button>
      {
          this.props.data.filter(n=>n.Loai==typeMonitoring).map((marker,index)=>{
         
          //console.log(marker.id)
          //console.log(marker.COORDINATES[0])
          return (
            
            <TouchableWithoutFeedback key={index}  onPress={() => this.showDialog(marker)}>
            <View style={{  alignItems: "center",
                        justifyContent: "center",
                        width: 40,
                        height: 40,  
                        borderRadius: 20,
                        backgroundColor: marker.colorHerder,
                      //  position: "absolute",
                      //  marginTop: -60,
                          shadowColor: "#7F58FF",
                          shadowRadius: 5,
                          shadowOffset: { height: 10 },
                          shadowOpacity: 0.3,
                          borderWidth: 3,
                          borderColor: "#FFFFFF"}}>
                <Text style={{ fontWeight:'bold',fontSize:18 ,color:'white' }}>{marker.PH}</Text>
               
            </View>
           
          </TouchableWithoutFeedback>
     
         
          );
        })
     }

     {this.renderDialog()}
     {this.renderDialogTypeMonitoring()}
        <Button title="B" onPress={()=>this.props.navigation.navigate('History')}></Button>
        <Button title="Setting" onPress={()=>this.showDialogTypeMonitoring('1')}></Button>
      
     </>
    );
   
  }
}

export default D;



const styles=StyleSheet.create({
  marker:{
        alignItems: "center",
        justifyContent: "center",
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#7F58FF',
      //  position: "absolute",
      //  marginTop: -60,
          shadowColor: "#7F58FF",
          shadowRadius: 5,
          shadowOffset: { height: 10 },
          shadowOpacity: 0.3,
          borderWidth: 3,
          borderColor: "#FFFFFF"
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
    shadowOffset: { width: 0, height: 0 },
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
    backgroundColor: theme.colors.white
  },
  check: {
    position: 'absolute',
    right: -9,
    top: -9,
  },
  header: {
    flexDirection: "row",
    justifyContent: "flex-end",
  
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 10*1.5,
  },
  headerTitle: {
    color: theme.colors.gray
  },
  headerLocation: {
    
  },
  search: {
    height: theme.sizes.base * 2,
    width: width - theme.sizes.base * 2
  },
  searchInput: {
    fontSize: theme.sizes.caption,
    height: theme.sizes.base * 2,
    backgroundColor: "rgba(142, 142, 147, 0.06)",
    borderColor: "rgba(142, 142, 147, 0.06)",
    paddingLeft: theme.sizes.base / 1.333,
    paddingRight: theme.sizes.base * 1.5
  },
  searchRight: {
    top: 0,
    marginVertical: 0,
    backgroundColor: "transparent"
  },
  searchIcon: {
    position: "absolute",
    right: theme.sizes.base / 1.333,
    top: theme.sizes.base / 1.6
  },
  
})