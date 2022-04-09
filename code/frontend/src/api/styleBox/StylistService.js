import axios from 'axios'
import {API_URL} from "../../Constants";

class StylistService {
    getHomepage(){
        return axios.get(`${API_URL}/stylist/profile`, {token: sessionStorage.getItem('token')}, {withCredentials: true})
    }

    updateProfile(myImages, myIdeas, myDeletedId){
        let displays = new FormData();
        displays.append("ideas", myIdeas)
        displays.append("images", myImages)
        displays.append("deletedID", myDeletedId)
        return axios.post(`${API_URL}/stylist/display`, displays)
    }
}
export default new StylistService()