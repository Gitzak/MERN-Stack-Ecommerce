import axios from 'axios'

const api = axios.create({
    baseURL:'http://localhost:7500/api/customers/',
    headers:{
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("token")===null?null:JSON.parse(localStorage.getItem("token"))}`

    }
})

export function RegisterCustomer(body) {
    return api.post('/', body)
}
export function ValidateCustomer(id) {
    return api.put(`/validate/${id}`)
}

export function LoginCustomer(body) {
    return api.post('/login', body)
}



export default api