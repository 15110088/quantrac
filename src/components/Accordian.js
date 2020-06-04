
import React, {Component} from 'react';
import { View, TouchableOpacity, Text, StyleSheet, LayoutAnimation, Platform, UIManager} from "react-native";
import * as theme from '../constants/theme';
import Icon from "react-native-vector-icons/MaterialIcons";

export default class Accordian extends Component{

    constructor(props) {
        super(props);
        this.state = { 
          data: props.data,
          idGolble: 1 ,
        }

        if (Platform.OS === 'android') {
           UIManager.setLayoutAnimationEnabledExperimental(true);
        }
    }
  
  render() {
      console.log("refresh "+this.props.isActive + this.props.id)
    return (
       <View>
            <TouchableOpacity ref={this.accordian} style={styles.row} onPress={()=>this.toggleExpand(this.props.id)}>
                <Text style={[styles.title, styles.font]}>{this.props.title}</Text>
                <Icon name={this.state.expanded ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} size={30} color={theme.colors.gray3} />
            </TouchableOpacity>
            <View style={styles.parentHr}/>
            {
                this.props.isActive ?
                <View style={styles.child}>
                    <Text>{this.props.data}</Text>     
                </View>:null
            }

       </View>
    )
  }

  toggleExpand=async(id)=>{
    this.props.clickAll(id);
    // await this.setState({isActive : !active})
    // this.setState({expanded : !this.state.expanded})
    // LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

  }

}

const styles = StyleSheet.create({
    title:{
        fontSize: 14,
        fontWeight:'bold',
        color: theme.colors.gray3,
    },
    row:{
        flexDirection: 'row',
        justifyContent:'space-between',
        height:56,
        paddingLeft:25,
        paddingRight:18,
        alignItems:'center',
        backgroundColor: theme.colors.gray,
    },
    parentHr:{
        height:1,
        color: theme.colors.white,
        width:'100%'
    },
    child:{
        backgroundColor: theme.colors.gray2,
        padding:16,
    }
    
});
