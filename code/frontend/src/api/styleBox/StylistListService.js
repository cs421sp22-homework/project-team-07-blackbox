
import axios from 'axios'
import { API_URL } from '../../Constants'
axios.defaults.withCredentials = true

axios.defaults.withCredentials=true
class StylistListService {
    // Get order
    getStylistList(pageValue,styleValue,sortValue,searchValue,limitValue){
<<<<<<< HEAD
        let param = {page: pageValue, style:styleValue,sort: sortValue,search:searchValue,limit:limitValue}
        return axios.get(`${API_URL}/stylists`,param)
    }

    searchInfo(info){
        console.log(info)
        return axios.get(`${API_URL}/stylists`,info)
=======
        let params = {page: pageValue, style:styleValue,sort: sortValue,search:searchValue,limit:limitValue}
        console.log(params)
        return axios.get(`${API_URL}/stylists`,
            {params:{page: pageValue, style:styleValue,sort: sortValue,search:searchValue,limit:limitValue}})
    }

    searchInfo(params){
        console.log(params)
        return axios.get(`${API_URL}/stylists`,params)
>>>>>>> cab571dd1eb3f352428bbfac7c15c9f9d0de4c79
    }




}

export default new StylistListService()