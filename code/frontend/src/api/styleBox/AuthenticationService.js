import axios from 'axios'
import { API_URL } from '../../Constants'

export const USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser'

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
    registerSuccessfulLoginForJwt(username, token){
        sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username)
        this.setupAxiosInterceptors(this.createJWTToken(token))
    }


}

export default new AuthenticationService()