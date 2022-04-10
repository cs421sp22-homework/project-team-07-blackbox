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
    modifyAvatar(avatar) {
        console.log("pass avatar: ", avatar)
        return axios.post(`${API_URL}/avatar`, avatar, {withCredentials: true})
            // , headers: {'Content-Type': 'multipart/form-data'}
    }
}
export default new AccountSettingService()
