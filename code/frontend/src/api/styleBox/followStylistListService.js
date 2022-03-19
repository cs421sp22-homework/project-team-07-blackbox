
import axios from 'axios'
import { API_URL } from '../../Constants'

axios.defaults.withCredentials=true
class followStylistListService {
    // Get order list
    getStylistList(pageValue,styleValue,sortValue,searchValue,limitValue){
        let params = {page: pageValue, style:styleValue,sort: sortValue,search:searchValue,limit:limitValue}
        console.log(params)
        return axios.get(`${API_URL}/followStylist`,
            {params:{page: pageValue, style:styleValue,sort: sortValue,search:searchValue,limit:limitValue}})
    }

    searchInfo(params){
        console.log(params)
        return axios.get(`${API_URL}/followStylist`,params)
    }




}

export default new followStylistListService()