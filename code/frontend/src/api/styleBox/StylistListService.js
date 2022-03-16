
import axios from 'axios'
import { API_URL } from '../../Constants'

class StylistListService {
    // Get order list
    getStylistList(pageValue,styleValue,sortValue,searchValue,limitValue){
        let param = {page: pageValue, style:styleValue,sort: sortValue,search:searchValue,limit:limitValue}
        return axios.get(`${API_URL}/stylists`,param, {withCredentials: true})
    }

    searchInfo(info){
        console.log(info)
        return axios.post(`${API_URL}/stylists`,info,{withCredentials: true})
    }




}

export default new StylistListService()