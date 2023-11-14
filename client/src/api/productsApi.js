import axios from "axios";

const productApi = axios.create({
    baseURL: "http://localhost:7500/api/products",
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token") === null ? null : JSON.parse(localStorage.getItem("token"))}`,
    },
});

export function getAllProducts() {
    return productApi.get("/");
}

export default productApi;
