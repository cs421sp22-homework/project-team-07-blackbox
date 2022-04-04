import axios from 'axios'
import {API_URL} from '../../Constants'
axios.defaults.withCredentials=true

class ReportService {
    
    createReport(orderId, info) {
        return axios.post(`${API_URL}/stylist/styleReport/${orderId}`, info)
    }

    viewReport(orderId){
        return axios.get(`${API_URL}/order/styleReport/${orderId}`)
    }

}

export default new ReportService()
