import axios from 'axios'
import {API_URL} from "../../Constants";
import cookie from "react-cookies"

class OrderService{
    createOrder(stylistId, info){
        console.log("here!");
        console.log(stylistId);
        return axios.post(`${API_URL}/order/${stylistId}`, info, {withCredentials: true})
    }

}
export default new OrderService()