import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Menu from '../../screens/Menu';
import { connect } from 'react-redux';

class menuContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { data } = this.props.data;
    return (
        <Menu data={data}></Menu>
    );
  }
}

export default connect( 
    state => {
      return {
        data : state.loginRedux// KHAI BAO tên redux ở ngoài APP.js -- data là biến trong state
      }
    },
    dispatch => {
      return {
        CheckLogin: (check) => dispatch(CheckLogin(check)),
      }
    }
  
  )(menuContainer);