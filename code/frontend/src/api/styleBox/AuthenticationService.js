import axios from 'axios'
import { API_URL } from '../../Constants'
import data from "bootstrap/js/src/dom/data";
axios.defaults.withCredentials = true;

export const USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser'

class AuthenticationService {

    // Login 方法传递username, password到后端
    executeJwtAuthenticationService(usernameValue, passwordValue){
        // let user = {username: usernameValue, password: passwordValue}
        return axios.post(`${API_URL}/login`, {username: usernameValue, password: passwordValue},{withCredentials: true})
    }

    // 处理前端返回的token方法，代写


}

export default new AuthenticationService()
