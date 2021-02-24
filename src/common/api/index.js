import axios from 'axios';

const API_BASE_URL = 'https://tcrec-api.herokuapp.com';

const client = axios.create({
  baseURL: API_BASE_URL
});

export function fetchProducts(queryStatements) {
  return client.post('api/products', queryStatements);
}

export function fetchSingleFilteredProduct(id) {
  return client.get(`api/products/${id}`);
}

export function fetchMultipleFilteredProducts(ids) {
  return client.get(`api/products/by_ids?ids=${ids}`);
}
