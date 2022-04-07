import axios from 'axios'
import {API_URL} from "../../Constants";

class StylistService {
    getHomepage(){
        return axios.get(`${API_URL}/stylist/profile`, {token: sessionStorage.getItem('token')}, {withCredentials: true})
    }

    updateProfile(myImages, myIdeas, myDeletedId){
        return axios.post(`${API_URL}/stylist/display`, {params: {images: myImages, ideas: myIdeas, deletedId: myDeletedId}})
    }
}
export default new StylistService()