import React, { Component, version } from 'react';
import { View ,StyleSheet,SafeAreaView} from 'react-native';
import { Layout, Tab, TabView, Text,Datepicker } from '@ui-kitten/components';
import { ScrollView } from 'react-native-gesture-handler';
import { SearchBar } from 'react-native-elements';
import {DateTimePicker} from 'react-native-ui-lib'; // eslint-disable-line



class Duyet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex:0,
      search: '',
    };
  }
  updateSearch = search => {
    this.setState({ search });
  };
  setSelectedIndex=(index)=>{
    this.setState({
      selectedIndex:index
    })
  }
  renderHeader() {
    return (
      <View
      style={{height: 45, width: '100%', backgroundColor: 'transparent'}}>
         
      <View
        style={{
          backgroundColor: '#fff',
          marginLeft: 50,
          marginRight: 10,
          marginVertical: 10,
          borderRadius: 60,
        }}>
       
      </View>
     
    </View>
    );
  }
  
  render() {


    return (
      <SafeAreaView style={styles.container}>
          <ScrollView style={styles.container}>
              <View style={{height:50,width:'100%'}}>
              <SearchBar
        placeholder="Type Here..."
        onChangeText={this.updateSearch}
        value={this.state.search}

      />
              </View>
              <TabView
              selectedIndex={this.state.selectedIndex}
              onSelect={index => this.setSelectedIndex(index)}>
              <Tab title='Trạm'>
                <Layout style={styles.tabContainer}>
                <Text category='h5'>123</Text>
                </Layout>
              </Tab>
              <Tab title='Thời Gian'>
                <Layout style={{borderWidth:1,flexDirection:'row',height: 200,}}>
                 <View style={{flex:1}}>
                 <DateTimePicker 
                        title={'Từ Ngày'}
                        placeholder={''} 
                         dateFormat={'DD MM YYYY'}
                         value={new Date('October 13, 2014')} 
                  
                    />
                     <DateTimePicker 
                        title={'Từ Ngày'}
                        placeholder={''} 
                         dateFormat={'DD MM YYYY'}
                         value={new Date('October 13, 2014')} 
                  
                    />
                 </View>
   
                  </Layout>
              </Tab>
              <Tab title='Khác'>
                <Layout style={styles.tabContainer}>
                  <Text category='h5'>TRANSACTIONS</Text>
                </Layout>
              </Tab>
            </TabView>
            <View style={{flex:1,backgroundColor:'red'}}>
                <View style={{height:500,width:100}}>

                </View>
              
            </View>
        </ScrollView>

         
      </SafeAreaView>

    
    );
  }
}

const styles = StyleSheet.create({
  tabContainer: {
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container:{
    flex:1
  },
  picker: {
    flex: 1,
    margin: 2,
  },
});

export default Duyet;
