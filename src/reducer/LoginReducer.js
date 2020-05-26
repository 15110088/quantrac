// let LoginState = {
//     data: {

//         isLogin:false
//     }
// };

const LoginState={
    isLogin:false,
    userName:'test',
    token:'ok'
}

const LoginReducer=(state=LoginState,action)=>{
    switch(action.type){
        case 'checkLogin':
         state={
             isLogin:action.isCheck
         }
         break;
         case 'LOGIN':
         state={
            userName:action.payload.username,
            token:action.payload.token,
            isLogin:action.payload.isLogin
         } 
         break;
    }
    return state
}
export default LoginReducer;
 


