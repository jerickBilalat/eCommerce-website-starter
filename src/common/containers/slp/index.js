import React, { Component } from 'react';
import {
  clearShopList,
  flashMessage,
  syncShopList,
  deleteShopListItem,
  increaseShopListItemQuantity,
  decreaseShopListItemQuantity
} from '../../actions/shopListActions';

class ShoppingListPage extends Component {
  render() {
    return <h1>Shopping List Page</h1>
  }
}

const MockPromise = new Promise((resolve, reject) => {
  return resolve('Shopping List page Data');
})

const loadData = async store => await store.dispatch(syncShopList()); // eslint-disable-line no-return-await


export default {
  component: ShoppingListPage,
  loadData
};
