import axios from "axios";

const oerderApi = axios.create({
    baseURL: "http://localhost:7500/api/orders",
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token") === null ? null : JSON.parse(localStorage.getItem("token"))}`,
    },
});

export function getAllOrders() {
    return oerderApi.get("/");
}

export function getOrder(id) {
    return oerderApi.get(`/${id}`);
}

export function updateOrders(id, data) {
    return oerderApi.put(`/${id}`, data);
}

export default oerderApi;
