import axios from 'axios'
import {API_URL} from "../../Constants";

class HelloWorldService{
    executeHelloWorldService(){
        return axios.get(`${API_URL}/index`)
    }
}
export default new HelloWorldService()