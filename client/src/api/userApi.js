import axios from "axios";

const userApi = axios.create({
    baseURL: "http://localhost:7500/api/users",
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token") === null ? null : JSON.parse(localStorage.getItem("token"))}`,
    },
});

export function LoginUser(body) {
    return userApi.post("/login", body);
}

export function getDataProfile() {
    return userApi.get("/profileData");
}

export function updateDataProfile(id, data) {
    return userApi.put(id, data);
}

export function updatePassword(id, data) {
    return userApi.put("/updatePassword", data);
}

export default userApi;
