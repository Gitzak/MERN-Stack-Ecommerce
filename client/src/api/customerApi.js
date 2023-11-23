import axios from "axios";

const customerApi = axios.create({
  baseURL: "http://localhost:7500/api/customers",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${
      localStorage.getItem("token") === null
        ? null
        : JSON.parse(localStorage.getItem("token"))
    }`,
  },
});

export function getAllCustomers() {
  return customerApi.get("/");
}

export function getCustomerById(id) {
  return customerApi.get(`customer/${id}`);
}
export function updateCustomer(id, data) {
  return customerApi.patch(`customer/${id}`, data);
}

export default { customerApi };
