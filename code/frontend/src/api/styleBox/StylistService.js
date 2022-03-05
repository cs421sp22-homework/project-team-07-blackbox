import axios from 'axios'
import {API_URL} from "../../Constants";

class StylistService {
    getHomepage(){
        return axios.get(`${API_URL}/stylist/profile`, {withCredentials: true})
    }
}
export default new StylistService()