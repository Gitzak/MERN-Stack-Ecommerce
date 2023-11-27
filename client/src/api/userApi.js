
import axios from 'axios'

const api = axios.create({
    baseURL:'http://localhost:7500/api/users',
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token") === null ? null : JSON.parse(localStorage.getItem("token"))}`,
    },
})

export function LoginUser(body) {
    return api.post('/login', body)
}
export function getAllUsers() {
    return api.get("/")
}
export function getUsers(id) {
    return api.get(`/${id}`);
}

export function createUsers(data) {
    // return api.post("/", data, { headers: { "Content-Type": "multipart/form-data" } });
    return api.post("/", data);
}

export function updateUsers(id, data) {
    return api.put(`/${id}`, data);
}

export function deleteUsers(id) {
    return api.delete(`/${id}`);
}




export default api


