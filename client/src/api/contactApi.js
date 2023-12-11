import axios from "axios";

const contactApi = axios.create({
    baseURL: "http://localhost:7500/api/contact",
    headers: {
        "Content-Type": "application/json",
    },
});

// const setAuthHeader = () => {
//     const token = localStorage.getItem("token");
//     if (token) {
//         contactApi.defaults.headers.common["Authorization"] = `Bearer ${JSON.parse(token)}`;
//     } else {
//         delete contactApi.defaults.headers.common["Authorization"];
//     }
// };


export function submitContact(body) {
    return contactApi.post('/submit', body)
}


export default contactApi;
