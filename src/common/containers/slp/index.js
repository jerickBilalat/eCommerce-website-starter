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
    return <h1>Shopping List Page</h1>;
  }
}

const loadData = async store => {
  await store.dispatch(syncShopList());
};

export default {
  component: ShoppingListPage,
  loadData
};
