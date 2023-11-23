import axios from "axios";

const userApi = axios.create({
    baseURL: "http://localhost:7500/api/users",
    headers: {
        "Content-Type": "application/json",
    },
});

const setAuthHeader = () => {
    const token = localStorage.getItem("token");
    if (token) {
        userApi.defaults.headers.common["Authorization"] = `Bearer ${JSON.parse(token)}`;
    } else {
        delete userApi.defaults.headers.common["Authorization"];
    }
};

export function LoginUser(body) {
    return userApi.post("/login", body);
}

export function getDataProfile() {
    setAuthHeader();
    return userApi.get("/profileData");
}

export function updateDataProfile(id, data) {
    setAuthHeader();
    return userApi.put(id, data);
}

export function updatePassword(id, data) {
    setAuthHeader();
    return userApi.put("/updatePassword", data);
}

export default userApi;
