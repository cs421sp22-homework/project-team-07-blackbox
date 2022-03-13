import axios from 'axios'
import {API_URL} from "../../Constants";
import cookie from "react-cookies"

class CustomerBrowseStylistService{
    getHomepage(stylistId){
        console.log("my gethome")
        return axios.get(`${API_URL}/stylist/profile/${stylistId}`, {withCredentials: true})
    }

    followStylist(stylistId){
        return axios.post(`${API_URL}/follow/${stylistId}`, {withCredentials: true})
    }
    
    unfollowStylist(stylistId){
        return axios.delete(`${API_URL}/unfollow/${stylistId}`, {withCredentials: true})
    }
}
export default new CustomerBrowseStylistService()