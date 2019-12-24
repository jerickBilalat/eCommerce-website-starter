import axios from 'axios';

const API_BASE_URL = 'https://shop-mock-api.herokuapp.com/';

const client = axios.create({
  baseURL: API_BASE_URL
});

export function fetchProducts(queryStatements) {
  return client.post('api/product/shop', queryStatements);
}

export function fetchSingleFilteredProduct(id) {
  return client.get(`api/product/articles_by_id?id=${id}&type=single`);
}

export function fetchMultipleFilteredProducts(ids) {
  return client.get(`api/product/articles_by_id?id=${ids}&type=array`);
}
