import axios from 'axios'
import {FLASK_API_URL} from '../../Constants'
axios.defaults.withCredentials=true

class TryonService {
    
    getTryon(info) {
        return axios.post(`${FLASK_API_URL}/tryon`, info)
    }

}

export default new TryonService()
