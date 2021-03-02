import { products } from './fakeData';

export function fetchProducts(queryStatements) {
  //   return client.post('api/products', queryStatements);
  return Promise.resolve({ data: products });
}

export function fetchSingleFilteredProduct(id) {
  //   return client.get(`api/products/${id}`);
  const product = products.filter(x => x._id === id)[0];
  return Promise.resolve({ data: product });
}

export function fetchMultipleFilteredProducts(ids) {
  // return client.get(`api/products/by_ids?ids=${ids}`);
  const filteredProducts = products.filter(x => ids.includes(x._id));
  return Promise.resolve({ data: filteredProducts });
}
