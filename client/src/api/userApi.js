import axios from 'axios'

const api = axios.create({
    baseURL:'http://localhost:7500/api/users',
    headers:{
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt_info')===null?null:JSON.parse(localStorage.getItem('jwt_info'))}`

    }
})

export function LoginUser(body) {
    return api.post('/login', body)
}




export default api