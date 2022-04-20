import axios from 'axios'
import {API_URL} from '../../Constants'
axios.defaults.withCredentials=true

class TryonService {
    
    getTryon(info) {
        return axios.post(`${API_URL}/tryon`, info)
    }

}

export default new TryonService()
