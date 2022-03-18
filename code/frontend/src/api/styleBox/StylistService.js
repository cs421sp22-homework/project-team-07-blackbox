import axios from 'axios'
import {API_URL} from "../../Constants";

class StylistService {
    getHomepage(){
        return axios.get(`${API_URL}/stylist/profile`, {token: sessionStorage.getItem('token')}, {withCredentials: true})
    }
}
export default new StylistService()