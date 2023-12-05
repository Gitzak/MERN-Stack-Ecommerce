import axios from "axios";

const dataApi = axios.create({
    baseURL: "http://localhost:7500/api",
    headers: {
        "Content-Type": "application/json",
    },
});

const setAuthHeader = () => {
    const token = localStorage.getItem("token");
    if (token) {
        dataApi.defaults.headers.common["Authorization"] = `Bearer ${JSON.parse(token)}`;
    } else {
        delete dataApi.defaults.headers.common["Authorization"];
    }
};

export function getAllOrders() {
    setAuthHeader();
    return dataApi.get("/orders");
}

export function getAllNewOrders() {
    setAuthHeader();
    return dataApi.get("/orders/newOrders");
}

export function getAllCustomers() {
    setAuthHeader();
    return dataApi.get("/customers");
}

export default dataApi;
