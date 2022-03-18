import axios from 'axios'
import {API_URL} from '../../Constants'
axios.defaults.withCredentials=true

class OrderService {
    // Get order list
    getOrderList(pageNum, sortValue) {
        return axios.get(`${API_URL}/orders`, {params: {page: pageNum, sort: sortValue}})
    }

    // Get order detail
    getOrderDetail(id) {
        return axios.get(`${API_URL}/orderDetail/${id}`, {withCredentials: true})
    }

    createOrder(stylistId, info) {
        console.log("here!");
        console.log(stylistId);
        return axios.post(`${API_URL}/order/${stylistId}`, info, {withCredentials: true})
    }

}

export default new OrderService()
