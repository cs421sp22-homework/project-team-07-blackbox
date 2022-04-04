import axios from 'axios'
import {API_URL} from '../../Constants'
axios.defaults.withCredentials=true

class ReportService {
    
    createReport(orderId, info) {
        return axios.post(`${API_URL}/stylist/styleReport/${orderId}`, info)
    }

}

export default new ReportService()
