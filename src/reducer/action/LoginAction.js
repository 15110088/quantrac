const CheckLogin = (check) => {
    return {
      type: "checkLogin",
      isCheck:check
    }
  }

export const loginAction = (username,token,isLogin) => {
  console.log(username + ' ' + token )
    return {
        type: 'LOGIN',
        payload: {
            username: username,
            token: token,
            isLogin:isLogin
        }
    }
}
  
  export default CheckLogin;