import axios from "axios";

const orderApi = axios.create({
    baseURL: "http://localhost:7500/api/orders",
    headers: {
        "Content-Type": "application/json",
    },
});

const setAuthHeader = () => {
    const token = localStorage.getItem("token");
    if (token) {
        orderApi.defaults.headers.common["Authorization"] = `Bearer ${JSON.parse(token)}`;
    } else {
        delete orderApi.defaults.headers.common["Authorization"];
    }
};

export function getAllOrders() {
    setAuthHeader();
    return orderApi.get("/");
}

export function getTopFiveProducts() {
    setAuthHeader();
    return orderApi.get("/top_five_products");
}

export function getSalesChartData() {
    setAuthHeader();
    return orderApi.get("/get_sales_chart_data");
}

export function getOrder(id) {
    setAuthHeader();
    return orderApi.get(`/${id}`);
}

export function updateOrders(id, data) {
    setAuthHeader();
    return orderApi.put(`/${id}`, data);
}

export default orderApi;
