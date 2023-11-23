import axios from "axios";

const customerApi = axios.create({
    baseURL: "http://localhost:7500/api/customers",
    headers: {
        "Content-Type": "application/json",
    },
});

const setAuthHeader = () => {
    const token = localStorage.getItem("token");
    if (token) {
        customerApi.defaults.headers.common["Authorization"] = `Bearer ${JSON.parse(token)}`;
    } else {
        delete customerApi.defaults.headers.common["Authorization"];
    }
};

export function getAllCustomers() {
    setAuthHeader();
    return customerApi.get("/");
}

export function getCustomerById(id) {
    setAuthHeader();
    return customerApi.get(`customer/${id}`);
}

export function updateCustomer(id, data) {
    setAuthHeader();
    return customerApi.put(`${id}`, data);
}

export default customerApi;
