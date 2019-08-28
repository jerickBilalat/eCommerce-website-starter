import React, { Component } from 'react';
import { fetchProducts } from '../../actions/productActions';

class ProductListPage extends Component {
  render() {
    return <h1>Product List Page</h1>
  }
}

const MockPromise = new Promise((resolve, reject) => {
  return resolve('Product LIST page Data');
})

const loadData = async store => {
  return await store.dispatch(fetchProducts());
};

export default {
  component: ProductListPage,
  loadData
};
