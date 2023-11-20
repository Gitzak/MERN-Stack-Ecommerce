import axios from 'axios'

const api = axios.create({
    baseURL:'http://localhost:7500/api/orders/',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem("token")
          ? `Bearer ${JSON.parse(localStorage.getItem("token"))}`
          : undefined,
    }
})

export function createNewOrder(body) {
    return api.post('/', body)
}



export default api