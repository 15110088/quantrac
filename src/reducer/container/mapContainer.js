import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import D from '../../screens/D';
import addPH, { subPH,xacdinhmau, getDataKhiTuDong } from '../action/mapAction';



class mapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  
  render() {
    console.log("=========")
    console.log(this.props)
    const { data } = this.props.data;
    const {addNumber,subNumber,xacdinhmau,navigation,route,getDataKhiTuDong}=this.props
  
    return (
     <D data={data} addNumber={addNumber} subNumber={subNumber} xacdinhmau={xacdinhmau} navigation={navigation} route={route}  getDataKhiTuDong={getDataKhiTuDong}></D>
    );
  }
}

export default connect( 
    state => {
      return {
        data : state.mapRedux// KHIA BAO NUMBER O DAY
      }
    },
    dispatch => {
      return {
        addNumber: (index,num) => dispatch( addPH(index,num)),
        subNumber: (index) => dispatch( subPH(index) ),
        xacdinhmau:(index,value)=>dispatch(xacdinhmau(index,value)),
        getDataKhiTuDong:(index,value)=>dispatch(getDataKhiTuDong(index,value))
      }
    }
  
  )(mapContainer);
