import axios from 'axios'
import { API_URL } from '../../Constants'

class OrderService {
    // Get order list
    getOrderList(pageNum, sortValue){
        let param = {page: pageNum, sort: sortValue}
        return axios.get(`${API_URL}/orders`, param, {withCredentials: true})
    }

}

export default new OrderService()