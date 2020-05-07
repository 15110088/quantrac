let LoginState = {
    data: {
        isLogin:false
    }
};

const LoginReducer=(state=LoginState,action)=>{
    switch(action.type){
        case 'checkLogin':
         state.data={
             isLogin:action.isCheck
         }
         break;
    }
    return state
}
export default LoginReducer;
 


