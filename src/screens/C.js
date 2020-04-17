import React, { Component } from 'react';
import { View, Text,Button,SafeAreaView } from 'react-native';

const C= ({ navigation }) => (
    <SafeAreaView>
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
 