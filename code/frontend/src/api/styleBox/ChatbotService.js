import axios from 'axios'
import { FLASK_API_URL } from '../../Constants'
axios.defaults.withCredentials=true

class ChatbotService {
    getAnswer(ques){
        console.log(ques)
        return axios.get(`${FLASK_API_URL}/chatbot`, {params:ques})
    }
}

export default new ChatbotService()