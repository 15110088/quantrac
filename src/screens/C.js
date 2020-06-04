import React, { Component } from 'react';
import { View,StyleSheet, Text,Button,SafeAreaView ,TouchableOpacity} from 'react-native';

const C= ({ navigation }) => (
    <SafeAreaView style={styles.container}>
      <Button title="Toggle Drawer" onPress={() => navigation.toggleDrawer()} />
      <Button
        title="To Actions"
        onPress={() => {
          navigation.navigate('Tabs', { // tên create tab
            screen: 'A',
            params:{id:1}
         
          }); 
        }}
      />
 
    </SafeAreaView>

  );

export default C
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  actionView: {
    marginBottom: 10,
    padding: 10,
    borderRadius: 4,
    backgroundColor: '#6574CD'
  },
  actionText: {
    fontSize: 20,
    color: '#fff'
  }
})