import React, { Component } from 'react';
import { fetchProducts } from '../../actions/productActions';

class ProductListPage extends Component {
  render() {
    return <h1>Product List Page</h1>;
  }
}

const loadData = async store => {
  await store.dispatch(fetchProducts());
};

export default {
  component: ProductListPage,
  loadData
};
