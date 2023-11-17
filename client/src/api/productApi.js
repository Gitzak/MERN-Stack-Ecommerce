import axios from 'axios'

const api = axios.create({
    baseURL:'http://localhost:7500/api/products/',
    headers:{
        'Content-Type': 'application/json',

    }
})

export function GetAllProducts() {
    return api.get('/', )
}




export default api