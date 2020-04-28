import React, { Component } from 'react';
import { View, Text } from 'react-native';
import CheckLogin from '../action/LoginAction';
import Login from '../../screens/Login';
import { connect } from 'react-redux';

class loginContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
        
    };
  }
  
  render() {
    const { data } = this.props.data;
    const {CheckLogin}=this.props
    return (
      <Login data={data} CheckLogin={CheckLogin}></Login>
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
  
  )(loginContainer);

