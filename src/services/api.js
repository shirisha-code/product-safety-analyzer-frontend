import axios from "axios";

const api = axios.create({
  baseURL: "https://product-safety-analyzer-backend-production.up.railway.app"
});

export default api;

export const searchProducts = (keyword) => {
  return api.get(`/products/search/${keyword}`);
};