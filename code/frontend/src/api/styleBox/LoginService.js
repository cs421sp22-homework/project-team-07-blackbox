import axios from 'axios'
import {API_URL} from "../../Constants";

class LoginService{
    executeLoginService(){
        return axios.get(`${API_URL}/login`)
    }
}
export default new LoginService()