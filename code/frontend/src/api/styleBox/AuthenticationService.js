import axios from 'axios'
// import cookie from 'react-cookie';
import { API_URL } from '../../Constants'
// import { useCookies } from 'react-cookie';
// import { withCookies } from "react-cookie";

export const USER_NAME_SESSION_ATTRIBUTE_NAME = 'token'
axios.defaults.withCredentials = true



class AuthenticationService {
    
    // Login 方法传递username, password到后端
    executeJwtAuthenticationService(username, password){
        const data = {
            username: username,
            password: password
          };
        console.log("here!")
        return axios.post(`${API_URL}/login`,
            data
        )
    }

    // 处理前端返回的token方法，代写
    registerSuccessfulLoginForJwt(token){
        sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, token)
    }

    isUserLoggedIn(){
        let token = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
        if(token===null) return false
        return true
    }

    deleteAuthentication(){
        sessionStorage.removeItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
        return axios.get(`${API_URL}/user/logout`)
    }


}

export default new AuthenticationService()