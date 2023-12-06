import axios from "axios";

const orderApi = axios.create({
    baseURL: "http://localhost:7500/api/orders",
    headers: {
        "Content-Type": "application/json",
    },
});

const setAuthHeader = () => {
    const token = localStorage.getItem("tokenC");
    if (token) {
        orderApi.defaults.headers.common["Authorization"] = `Bearer ${JSON.parse(token)}`;
    } else {
        delete orderApi.defaults.headers.common["Authorization"];
    }
};

export function createNewOrder(body) {
    setAuthHeader();
    return orderApi.post("/", body);
}

export default orderApi;
