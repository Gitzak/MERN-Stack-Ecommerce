import axios from "axios";

const CategoryApi = axios.create({
  baseURL: "http://localhost:7500/api/categories",
  headers: {
    "Content-Type": "application/json",
  },
});

const setAuthHeader = () => {
  const token = localStorage.getItem("token");
  if (token) {
    CategoryApi.defaults.headers.common["Authorization"] = `Bearer ${JSON.parse(
      token
    )}`;
  } else {
    delete CategoryApi.defaults.headers.common["Authorization"];
  }
};

export function getAllCategories() {
  return CategoryApi.get("/");
}

export function getCategory(id) {
  return CategoryApi.get(`/${id}`);
}

export function createCategory(data) {
  setAuthHeader();
  return CategoryApi.post("/", data);
}

export function updateCategory(id, data) {
  setAuthHeader();
  return CategoryApi.put(`/${id}`, data);
}

export function deleteCategory(id) {
  setAuthHeader();
  return CategoryApi.delete(`/${id}`);
}

export default CategoryApi;
