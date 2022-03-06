import axios from 'axios'
import {API_URL} from "../../Constants";

class QuizService {
    executeQuizService(info){
        console.log(info)
        axios.post(`${API_URL}/customer/profile`, info, {withCredentials: true})
            .then(response=>{
                console.log(response.data)
            })
    }
}
export default new QuizService()