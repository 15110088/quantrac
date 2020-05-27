import React, { Component } from 'react';
import { View, Text,StyleSheet,Alert , TextInput,TouchableOpacity} from 'react-native';
import * as theme from '../constants/theme';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import Feather from 'react-native-vector-icons/dist/Feather';
import { RSA } from 'react-native-rsa-native';
import config from '../ultilities/config';
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux';
import {loginAction} from '../reducer/action/LoginAction'

const  PublicKey=`-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAmXVVi3z9APO77sFSqrIg
Z4s38eC43UYuveN29MOGzMmlvIoRdef3zDWZ1Fj/Y65K8DYgcidQhMl6Z5QrSds8
hQZ/tWxosoy5P2uDUmpegQBvd+002wYSFYIMJfBEIUhcZqLxB6OT+jYVaOpGcXUr
lhoeA7cgk6qhDlmWvY+GX0FxPF7wxEhqIE6UmQFpPF5H46+EaDncK5/4Ld2CuM6V
Z8YOntzDYpRzn57dKTgcrZTwq20wStMX1EvdeZiA8O0+mR25earq1nMm35Bpe2vV
UOvbZKFPHM3muyshmX0iT/A8as3sgj+r61tmZgd+TeH3G/U5ic3XhTEaNxkHmuDw
mQIDAQAB
-----END PUBLIC KEY-----`
 
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
        secureTextEntry:true,
        userName:'nghiatt',
        passWord:'ttcntt',
        isAlterLogin:null,
    };
  } 
  componentWillMount(){
     console.log(this.props.dataLogin)
  }
  CheckLogin=async()=>{
    let checkLogin =await  AsyncStorage.getItem('checkLogin')
    var jsoncheckLogin =  JSON.parse(checkLogin)
    
    if(jsoncheckLogin.trangThai=="True")
    {  
        console.log('=============')
        console.log(jsoncheckLogin)
        await this.props.SaveLogin(jsoncheckLogin.tenDangNhap,jsoncheckLogin.matKhau,jsoncheckLogin.trangThai) 
        this.props.navigation.navigate('Duyet',{dataLogin:this.props.dataLogin});
    }
    else{
        Alert.alert(jsoncheckLogin.ketQua)
    }
   
  }
  LoginSubmit=async()=>{
        var dataLogin={
            tenDangNhap:this.state.userName,
            matKhau:this.state.passWord
        }
        let EncodedLogin=""
        await RSA.generateKeys(2048) // set key size
        .then(keys => {
            RSA.encrypt(JSON.stringify(dataLogin),  PublicKey)
            .then(encodedMessage => {
               // console.log(dataLogin)
                EncodedLogin=encodedMessage;
                console.log(`the encoded message is ${encodeURIComponent(encodedMessage)}`);
                fetch(`http://${config.URLIP}/DuLieuQuanTracServices.svc/GetDangNhap?parameter=${encodeURIComponent(encodedMessage)}`)
                            .then((response) => response.json())
                            .then((json) => {
                                 AsyncStorage.setItem('checkLogin', JSON.stringify(json) );
                                this.CheckLogin();
                            })
                            .catch((error) => {
                            console.error(error);
                            });
            });
        });
  }

  render() {
    //console.log(this.props)
    return (
      <View style={styles.container}>
        <Text style={styles.title}> Đăng Nhập </Text>
         <View style={styles.section}>
             <AntDesign name="user" size={20} color={'#fff'}></AntDesign>
             <TextInput style={styles.textInput} onChangeText={(userName)=>this.setState({userName:userName})} placeholder={"user"}></TextInput>
         </View>
         <View style={styles.section}>
             <AntDesign name="lock" size={20} color={'#fff'}></AntDesign>
             <TextInput secureTextEntry={this.state.secureTextEntry}  onChangeText={(passWord)=>this.setState({passWord:passWord})} style={styles.textInput} placeholder={"password"}></TextInput>
             <TouchableOpacity onPress={()=>this.setState({secureTextEntry:!this.state.secureTextEntry})}>
              <Feather name={this.state.secureTextEntry?'eye-off':'eye'} size={20} color={theme.colors.gray}></Feather>
             </TouchableOpacity>
         </View>

         <TouchableOpacity onPress={this.LoginSubmit}>
             <View style={styles.Login}>
             {/* <Text style={styles.textLogin}>LOGIN</Text> */}
             <AntDesign name="login" size={30} color={theme.colors.green}></AntDesign>

             </View>
         </TouchableOpacity>
      </View>
    );
  }
}
const mapStatetoProps=(state)=>{//lay statet tu redux, muoons them state viet vao day
    return {
        dataLogin:state.loginRedux
    }
}
const mapDispatchtoProps=(dispatch,props)=>{ // muon them action viet vao day
    return{
        SaveLogin:(userName,token,islogin)=>dispatch(loginAction(userName,token,islogin))
    }
}
export default connect(mapStatetoProps,mapDispatchtoProps)(Login);

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
        fontSize:18,
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