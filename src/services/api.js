import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080"
});

export default api;
export const searchProducts = (keyword) => {
  return api.get(`/products/search/${keyword}`);
};