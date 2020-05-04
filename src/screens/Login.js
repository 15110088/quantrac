import React, { Component } from 'react';
import { View, Text,StyleSheet , TextInput,TouchableOpacity} from 'react-native';
import * as theme from '../constants/theme';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import Feather from 'react-native-vector-icons/dist/Feather';
import { RSA } from 'react-native-rsa-native';
import config from '../ultilities/config';
import AsyncStorage from '@react-native-community/async-storage';

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
        userName:'',
        passWord:'',
    };
  }
  componentWillMount(){
     console.log(this.props)
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
                //console.log(`the encoded message is ${encodedMessage}`);
            });
        });
    //    fetch(`http://127.0.0.1:12679/DuLieuQuanTracServices.svc/GetDangNhap?parameter=V9oFgSWxltSxnqPlJiscbtoUGzR00pae6PpiCTBfZ2vjvlWmkyR4eUhnPPLffOlRcuYGD7rFpDdSW3fN0Xd5fG%2BQLF%2F06pjqXtbdyTCS2HZXFeC5CbI5nK53AtpRwWU5wkeX%2FbSbd1uz5ibNd7Ax4a0Zew%2BGtNPG9XDbdcT%2BgydNtT23tYUz%2B%2B%2FAFTm4xXg22MgbiariiVGW%2FoeUAydeV7zG3vPKdl%2FxI%2FnRG790oqMoSBx6FDQ6IHJQ7VRmkJluv%2F7ifHayjyavFm4C%2BXHqjO1VXdPpyMoYdxJ%2B9X6mzQdcfLkH%2B4q2R9sbmCHW0xbsbK8S%2F%2F51Lw9nM6Qyyh127w%3D%3D`)
    //                         .then((response) => response.json())
    //                         .then((json) => {
    //                              console.log(json)
    //                         })
    //                         .catch((error) => {
    //                         console.error(error);
    //                         });
        if(this.state.userName==this.state.passWord)
        {
            var data={islogin:true}
            await AsyncStorage.setItem('checkLogin', JSON.stringify(data) );
            let checkLogin = await AsyncStorage.getItem('checkLogin')
            await console.log(checkLogin)
            await this.props.navigation.openDrawer();
            await this.props.navigation.closeDrawer();
            await this.props.navigation.navigate('Duyet');
        }
        else{
           
          console.log("========login False=======")
         
        }
      
      
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}> Login </Text>
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