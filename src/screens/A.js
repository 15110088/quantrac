import React, { Component } from 'react';
import { View, Text ,Button} from 'react-native';

const  A =({ navigation,route })=> 
{
  console.log(route)
  return (
      <View>
        <Text> Aa </Text>
        <Button title="B" onPress={()=>navigation.push('B')}></Button>
      </View>
    );

}
export default A;
