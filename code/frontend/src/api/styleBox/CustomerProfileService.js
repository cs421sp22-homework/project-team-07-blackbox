import axios from 'axios'
import {API_URL} from "../../Constants";
import cookie from "react-cookies"

class CustomerProfileService{
    getHomepage(){
        return axios.get(`${API_URL}/customer/profile`, {withCredentials: true})
    }
    modifyProfile(info){
        return axios.post(`${API_URL}/customer/profile`,info,{withCredentials: true})
    }
}
export default new CustomerProfileService()
