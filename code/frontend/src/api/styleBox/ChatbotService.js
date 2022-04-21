import axios from 'axios'
import { FLASK_API_URL } from '../../Constants'
axios.defaults.withCredentials=true

class ChatbotService {
    getAnswer(ques){
        return axios.post(`${FLASK_API_URL}/chatbot`, ques)
    }
}

export default new ChatbotService()