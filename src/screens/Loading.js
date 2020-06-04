import React, { Component } from 'react';
import { View, Text,ActivityIndicator } from 'react-native';

class Loading extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={{flex:1,justifyContent:"center",alignItems:'center'}}>
<ActivityIndicator size="large" color="#0000fr" />
   
      </View>
         );
  }
}

export default Loading;
