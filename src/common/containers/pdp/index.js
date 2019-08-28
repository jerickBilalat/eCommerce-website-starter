import React, { Component } from 'react';
import { getProductDetail, clearProductDetail } from '../../actions/productActions';
class ProductDetailPage extends Component {
  render() {
    return <h1>Product Detail Page</h1>
  }
}

const MockPromise = new Promise((resolve, reject) => {
  return resolve('Product detail page Data');
})

const loadData = async (store, id) => {
  return await store.dispatch(getProductDetail(id));
};

export default {
  component: ProductDetailPage,
  loadData
};
