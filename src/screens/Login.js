import React, { Component } from 'react';
import { View, Text,StyleSheet , TextInput,TouchableOpacity} from 'react-native';
import * as theme from '../constants/theme';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import Feather from 'react-native-vector-icons/dist/Feather';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
        secureTextEntry:true,
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}> Login </Text>
         <View style={styles.section}>
             <AntDesign name="user" size={20} color={'#fff'}></AntDesign>
             <TextInput style={styles.textInput} placeholder={"user"}></TextInput>
         </View>
         <View style={styles.section}>
             <AntDesign name="lock" size={20} color={'#fff'}></AntDesign>
             <TextInput secureTextEntry={this.state.secureTextEntry} style={styles.textInput} placeholder={"password"}></TextInput>
             <TouchableOpacity onPress={()=>this.setState({secureTextEntry:!this.state.secureTextEntry})}>
              <Feather name={this.state.secureTextEntry?'eye-off':'eye'} size={20} color={theme.colors.gray}></Feather>
             </TouchableOpacity>
         </View>

         <TouchableOpacity>
             <View style={styles.Login}>
             <Text style={styles.textLogin}>LOGIN</Text>
             </View>
         </TouchableOpacity>
      </View>
    );
  }
}

export default Login;

const styles=StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        backgroundColor:theme.colors.green,
        paddingHorizontal:30,
        paddingVertical:100

    },
    title:{
        color:theme.colors.white,
        fontSize:50,
        fontWeight:'bold'
    },
    section:{
        flexDirection:"row",
        borderRadius:5,
        borderWidth:2,
        borderColor:theme.colors.white,
        paddingVertical:2,
        paddingHorizontal:15,
        alignItems:'center',
        marginTop:10,
        //borderColor:'#3456e9'
    },
    textInput:{
        flex:1,
        color:theme.colors.white,
      
    },
    textLogin:{
        justifyContent:'center',
        color:theme.colors.green,
        fontWeight:'bold',
    },
    Login:{
        width: '100%',
        height:40,
        justifyContent:'center',
        backgroundColor:theme.colors.white,
        alignItems:'center',
        marginTop:25,
        borderRadius:50
    }
})