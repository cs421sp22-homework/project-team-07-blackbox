import axios from 'axios'
import {API_URL} from "../../Constants";
import cookie from "react-cookies"

class AccountSettingService{
    getHomepage(){
<<<<<<< HEAD
        return axios.get(`${API_URL}/account`, {withCredentials: true})
=======
        return axios.get(`${API_URL}/account`,{withCredentials: true})
>>>>>>> cab571dd1eb3f352428bbfac7c15c9f9d0de4c79
    }
    modifyAccount(info){
        return axios.post(`${API_URL}/account`,info,{withCredentials: true})
    }
}
export default new AccountSettingService()
