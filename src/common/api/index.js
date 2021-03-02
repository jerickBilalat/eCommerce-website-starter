/* eslint-disable no-underscore-dangle */
/* eslint-disable func-names */
/* eslint-disable one-var */
import axios from 'axios';
import { products } from './fakeData';

const API_BASE_URL = 'https://tcrec-api.herokuapp.com';

const client = axios.create({
  baseURL: API_BASE_URL
});

// eslint-disable-next-line import/no-mutable-exports
let fetchProducts, fetchSingleFilteredProduct, fetchMultipleFilteredProducts;

function fetchProducts1(queryStatements) {
  return client.post('api/products', queryStatements);
}

function fetchSingleFilteredProduct1(id) {
  return client.get(`api/products/${id}`);
}

function fetchMultipleFilteredProducts1(ids) {
  return client.get(`api/products/by_ids?ids=${ids}`);
}

if (process.env.NODE_ENV === 'development') {
  fetchProducts = function(queryStatements) {
    return Promise.resolve({ data: products });
  };
  fetchSingleFilteredProduct = function(id) {
    const product = products.filter(x => x._id === id)[0];
    return Promise.resolve({ data: product });
  };
  fetchMultipleFilteredProducts = function(ids) {
    const filteredProducts = products.filter(x => ids.includes(x._id));
    return Promise.resolve({ data: filteredProducts });
  };
} else {
  fetchProducts = fetchProducts1;
  fetchSingleFilteredProduct = fetchSingleFilteredProduct1;
  fetchMultipleFilteredProducts = fetchMultipleFilteredProducts1;
}

export { fetchProducts, fetchMultipleFilteredProducts, fetchSingleFilteredProduct };
