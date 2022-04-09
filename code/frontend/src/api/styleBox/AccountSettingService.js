import axios from 'axios'
import {API_URL} from "../../Constants";
import cookie from "react-cookies"

class AccountSettingService{
    getHomepage(){
        return axios.get(`${API_URL}/account`,{withCredentials: true})
    }
    modifyAccount(info){
        return axios.post(`${API_URL}/account`,info,{withCredentials: true})
    }
    modifyAvatar(file) {
        return axios.post(`${API_URL}/avatar`, file, {withCredentials: true})
    }
}
export default new AccountSettingService()
