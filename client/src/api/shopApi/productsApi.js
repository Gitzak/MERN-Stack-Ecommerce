import axios from 'axios'

const api = axios.create({
    baseURL:'http://localhost:7500/api/products',
    headers:{
        'Content-Type': 'application/json',

    }
})

export function getProduct() {
    return api.get('/')
}
export function getProductById(id) {
    return api.get('/:id', id)
}



export default api