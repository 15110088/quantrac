let LoginState = {
    data: {
        isLogin:false
    }
};

const LoginReducer=(state=LoginState,action)=>{
  
    console.log("====state redux=======")
    console.log(state)
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
 


