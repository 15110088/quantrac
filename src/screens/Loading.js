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
        <ActivityIndicator size="large" color="#0000fr" />
    );
  }
}

export default Loading;
