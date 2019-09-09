import { toast } from 'react-toastify';
import * as api from '../api';
import localShopList from '../../client/utils/localShopList';
import {
  MODIFY_SHOPLIST_SUCCEEDED,
  FLASH_MESSAGE,
  DELETE_SHOPLIST_ITEM,
  ADD_ITEM_TO_SHOPLIST
} from './types';

export function flashMessage(message) {
  return {
    type: FLASH_MESSAGE,
    payload: message
  };
}

function modifyShopListSucceeded(shopList) {
  return {
    type: MODIFY_SHOPLIST_SUCCEEDED,
    payload: shopList
  };
}

export function clearShopList() {
  localShopList.clearShopList();
  return modifyShopListSucceeded([]);
}
export function deleteLocalShopListItem(id) {
  localShopList.deleteItem(id);
  toast.success('Item removed from shopList');
  return {
    type: DELETE_SHOPLIST_ITEM,
    payload: id
  };
}

export function addLocalShopListItem(productDetails) {
  return dispatch => {
    const { id, name, price } = productDetails;
    const isItemInListAlready = localShopList.addItem(id, name);
    const updatedItem = {
      id,
      name,
      price
    };

    if (isItemInListAlready) {
      toast.success('Item is already in the list');
    } else {
      dispatch({
        type: ADD_ITEM_TO_SHOPLIST,
        payload: updatedItem
      });
      toast.success('Item added to list');
    }
  };
}
export function getLocalShopListToStore() {
  return dispatch => {
    const shopList = localShopList.getShopList() || [];
    const updatedShopListForStore = [];

    if (Array.isArray(shopList) && shopList.length <= 0) {
      return dispatch(modifyShopListSucceeded(shopList));
    }

    const shopListItemIds = shopList.map(item => item.id);
    return api.fetchMultipleFilteredProducts(shopListItemIds).then(res => {
      const inStock = res.data;
      const inStockIds = inStock.map(item => item._id); // eslint-disable-line no-underscore-dangle

      const flashMessageTexts = [];

      shopList.forEach(shopListItem => {
        if (inStockIds.includes(shopListItem.id)) {
          const inStockItem = inStock.filter(item => item._id === shopListItem.id)[0]; // eslint-disable-line no-underscore-dangle
          const { _id: inStockId, name, price, quantity: inStockQty } = inStockItem;

          updatedShopListForStore.push({
            id: inStockId,
            name,
            price,
            inStockQty
          });
        } else {
          localShopList.deleteItem(shopListItem.id);
          flashMessageTexts.push(`Shopping list is modified. ${shopListItem.name} is out of stock`);
        }
      });

      if (flashMessageTexts.length) {
        toast.warn('Shopping list is modified.', {
          position: toast.POSITION.BOTTOM_LEFT
        });
        dispatch(
          flashMessage({
            status: 'notice',
            title: 'Shopping list is modified.',
            texts: flashMessageTexts
          })
        );
      }
      return dispatch(modifyShopListSucceeded(updatedShopListForStore));
    });
  };
}
