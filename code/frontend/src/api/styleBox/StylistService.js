import axios from 'axios'
import {API_URL} from "../../Constants";

class StylistService {
    getHomepage(){
        return axios.get(`${API_URL}/stylist/profile`, {token: sessionStorage.getItem('token')}, {withCredentials: true})
    }

    updateProfile(myImages, myIdeas, myDeletedId){
        let displays = new FormData();
        for(var key in myImages){
            displays.append("images", myImages[key])
            displays.append("ideas", myIdeas[key])
        }
        for(var key in myDeletedId){
            displays.append("deletedID", myDeletedId[key])
        }
        
        return axios.post(`${API_URL}/stylist/display`, displays, {
            headers: {
                "Content-Type": "multipart/form-data"
        }})
    }
}
export default new StylistService()