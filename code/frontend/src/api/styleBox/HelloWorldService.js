import axios from 'axios'
import {API_URL} from "../../Constants";
axios.defaults.withCredentials = true;

class HelloWorldService{
    executeHelloWorldService(){
        return axios.get(`${API_URL}/index`)
    }
}
export default new HelloWorldService()
