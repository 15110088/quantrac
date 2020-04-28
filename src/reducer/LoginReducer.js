let LoginState = {
    data: {
        isLogin:false
    }
};

const LoginReducer=(state=LoginState,action)=>{
    switch(action.type){
        case 'checkLogin':
            return {...state,isLogin:action.isCheck};
    }
    return state
}
export default LoginReducer;



