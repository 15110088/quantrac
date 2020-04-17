import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import B from '../screens/B';
import addNumber, { subNumber } from './action/Action';


const addVal =(val)=>{
  return{
      type:'add',
      val:val
  }
}

const subVal =(val)=>{
  return{
      type:'sub',
      val:val
  }
}
class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  
  render() {
   
    return (
     <B ></B>
    );
  }
}

export default connect( 
    state => {
      return {
        
      }
    },
    dispatch => {
      return {
      
      }
    }
  
  )(Container);
