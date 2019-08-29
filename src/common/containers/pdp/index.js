import React, { Component } from 'react';
import { getProductDetail } from '../../actions/productActions';

class ProductDetailPage extends Component {
  render() {
    return <h1>Product Detail Page</h1>;
  }
}

const loadData = async (store, id) => {
  await store.dispatch(getProductDetail(id));
};

export default {
  component: ProductDetailPage,
  loadData
};
