import axios from 'axios'
import {API_URL} from "../../Constants";
import cookie from "react-cookies"

class OrderService{
    createOrder(orderDetail){
        return axios.get(`${API_URL}/stylist/profile/${orderDetail}`, {withCredentials: true})
    }

}
export default new OrderService()