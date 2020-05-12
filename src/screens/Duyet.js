import React, {Component, version} from 'react';
import {View, StyleSheet, SafeAreaView,Button,Dimensions} from 'react-native';
import {Layout, Tab, TabView, Text,IndexPath, Select, SelectGroup, SelectItem} from '@ui-kitten/components';
import {ScrollView} from 'react-native-gesture-handler';
import {SearchBar} from 'react-native-elements';
import {DateTimePicker} from 'react-native-ui-lib'; // eslint-disable-line
import DatePicker from 'react-native-datepicker';
import * as Animatable from 'react-native-animatable';

class Duyet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0,
      selectedIndexLoaiTram: 1,
      search: '',
      dateFrom: '',
      dateTo:'',
      dataLoaiTram:[
        {id:1,tenLoaiTram:"Nước Mặc Tự Động"}
      ],
      animate_LoaiTam:'fadeInUpBig'
    };
  }
  updateSearch = (search) => {
    this.setState({search});
  };
  setSelectedIndex = (index) => {
    this.setState({
      selectedIndex: index,
    });
  };
  renderHeader() {
    return (
      <View style={{height: 45, width: '100%', backgroundColor: 'transparent'}}>
        <View
          style={{
            backgroundColor: '#fff',
            marginLeft: 50,
            marginRight: 10,
            marginVertical: 10,
            borderRadius: 60,
          }}></View>
      </View>
    );
  }
  SetSelectedIndexLoaiTram=(index)=>{

    // this.setState({
    //   selectedIndexLoaiTram: index,
    // });
     console.log(index);
  }
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          <View style={{height: 50, width: '100%'}}>
            <SearchBar
              placeholder="Type Here..."
              onChangeText={this.updateSearch}
              value={this.state.search}
            />
          </View>
          <TabView
            selectedIndex={this.state.selectedIndex}
            onSelect={(index) => this.setSelectedIndex(index)}>
            <Tab title="Trạm">
              <Layout style={styles.tabContainer}>
                        <Picker
                  selectedValue={3}
                  style={{ height: 50, width: 150 }}
                  onValueChange={(itemValue) => this.SetSelectedIndexLoaiTram(itemValue)}
                >
                  <Picker.Item label="Java" value="1" />
                  <Picker.Item label="JavaScript" value="2" />
                  <Picker.Item label="c#" value="3" />

                </Picker>
              </Layout>
            </Tab>
            <Tab title="Thời Gian">
              <Layout
                style={{borderWidth: 1, height: 64,flexDirection: 'row'}}>
                <View style={{flex: 1 }}>
                  <DatePicker 
                    style={{width: 150}}
                    date={this.state.dateFrom}
                    mode="date"
                    placeholder="select date"
                    format="DD-MM-YYYY"
                    androidMode="calendar"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{
                      dateIcon: {
                        position: 'absolute',
                        left: 0,
                        top: 4,
                        marginLeft: 0,
                      },
                      dateInput: {
                        marginLeft: 36,
                        height: 20,
                        borderRadius: 5,
                      },
                      // ... You can check the source to find the other keys.
                    }}
                    onDateChange={(date) => {
                      this.setState({dateFrom: date});
                    }}
                  />
                </View>

                <View style={{flex: 1 }}>
                <DatePicker
                    style={{width: 150 }}
                    date={this.state.dateTo}
                    mode="date"
                    placeholder="select date"
                    format="DD-MM-YYYY"
                    androidMode="calendar"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{
                      dateIcon: {
                        position: 'absolute',
                        left: 0,
                        top: 4,
                        marginLeft: 0,
                      },
                      dateInput: {
                        marginLeft: 36,
                        height: 20,
                        borderRadius: 5,
                      },
                      // ... You can check the source to find the other keys.
                    }}
                    onDateChange={(date) => {
                      this.setState({dateTo: date});
                    }}
                  />
                </View>
              </Layout>
            </Tab>
            <Tab title="Khác">
              <Layout style={styles.tabContainer}>
                <Text category="h5">TRANSACTIONS</Text>
              </Layout>
            </Tab>
          </TabView>
          <View style={{flex: 1, backgroundColor: 'red'}}>
            <View style={{flex:1,borderWidth:2}}>
           
            <Animatable.View animation={this.state.animate_LoaiTam} duration={1500} delay={0} useNativeDriver>          
            <Layout style={styles.container1} level='1'>
                        <Button title="ok" onPress={()=>this.setState({animate_LoaiTam:'fadeOutDown'})}></Button>
              </Layout>
              </Animatable.View>

            </View>
            
          </View>
         
        
        </View>
      </SafeAreaView>
    );
  }
}
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  tabContainer: {
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container1: {
    
    width:windowWidth,
    height:100,
    backgroundColor:'green',
    position:'absolute',
    borderWidth:2
  },
  container: {
    flex: 1,
  },
  picker: {
    flex: 1,
    margin: 2,
  },
  select: {
    width:200,
    margin: 2,
  },
});

export default Duyet;
