import axios from 'axios'
import { API_URL } from '../../Constants'
import cookie from 'react-cookies'

class AuthenticationService {
    
    // Login 方法传递username, password到后端
    executeJwtAuthenticationService(usernameValue, passwordValue){
        let user = {username: usernameValue, password: passwordValue}
        return axios.post(`${API_URL}/login`, user, {withCredentials: true})
    }

    // Register
    registerUtil(usernameValue, emailValue, passwordValue, role){
        let user = {username: usernameValue, email: emailValue, password: passwordValue}
        return axios.post(`${API_URL}/register`, {user, role}, {withCredentials: true})
    }

    // Login / register successful -> register成功后自动login
    loginSuccessfulRegister(token){
        this.setupAxiosInterceptors(token)
    }

    // 判断用户是否登录，通过cookie
    isUserLoggedIn() {
        let token = cookie.load('jwt')
        if (token === undefined) {
            return false
        }
        return true
    }

    // Create Interceptors
    setupAxiosInterceptors(token){
        axios.interceptors.request.use(
            (config) => {
                if (this.isUserLoggedIn()){
                    config.headers.authorization = token
                }
                return config
            }
        )
    }


}

export default new AuthenticationService()