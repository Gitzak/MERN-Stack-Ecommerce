import axios from 'axios'

const api = axios.create({
    baseURL:'http://localhost:7500/api/users',
    headers:{
        'Content-Type': 'application/json'
    }
})

export function LoginUser(body) {
    return api.post('/login', body)
}




export default api