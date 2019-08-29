import currency from 'currency.js';
import { toast } from 'react-toastify';
import * as api from '../api';
import localShopList from '../../client/utils/localShopList';
import { MODIFY_SHOPLIST_SUCCEEDED, FLASH_MESSAGE } from './types';

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
export function deleteShopListItem(id) {
  localShopList.deleteItem(id);
  toast.success('Item removed from shopList');
  return {
    type: 'DELETE_ITEM',
    payload: id
  };
}

export function increaseShopListItemQuantity(productDetails, differential) {
  const { id, name, price } = productDetails;
  const updatedShopListQuantity = localShopList.increaseItemQuantity(id, differential);
  const shopListItemValue = getItemValue(price, updatedShopListQuantity);
  const updatedItem = {
    id,
    name,
    price,
    quantity: updatedShopListQuantity,
    value: shopListItemValue
  };
  if (updatedShopListQuantity > 1) {
    toast.success('Item quantity increased');
  } else {
    toast.success('Item added to shopList');
  }
  return {
    type: 'MODIFY_ITEM_QNTY',
    payload: updatedItem
  };
}

export function decreaseShopListItemQuantity(productDetails, differential) {
  const { id, name, price } = productDetails;
  const updatedShopListQuantity = localShopList.decreaseItemQuantity(id, differential);
  if (updatedShopListQuantity === 0) return deleteShopListItem(id);
  const shopListItemValue = getItemValue(price, updatedShopListQuantity);
  const updatedItem = {
    id,
    name,
    price,
    quantity: updatedShopListQuantity,
    value: shopListItemValue
  };
  toast.success('Item quantity decreased');
  return {
    type: 'MODIFY_ITEM_QNTY',
    payload: updatedItem
  };
}

// to do: utilty function, refactor to a module
function getItemValue(price, quantity) {
  return currency(price)
    .multiply(quantity.toString())
    .format();
}
export function syncShopList() {
  return dispatch => {
    const shopList = localShopList.getShopList();
    const updatedShopList = [];

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
          const { _id: inStockId, name, price, quantity } = inStockItem;

          if (inStockItem.quantity < shopListItem.quantity) {
            localShopList.quantitySync(shopListItem.id, inStockItem.quantity);
            flashMessageTexts.push(`${inStockItem.name} has ${inStockItem.quantity} in stock`);
            updatedShopList.push({
              id: inStockId,
              name,
              price,
              quantity,
              value: getItemValue(inStockItem.price, inStockItem.quantity)
            });
          } else {
            dispatch(flashMessage(null));
            updatedShopList.push({
              id: inStockId,
              name,
              price,
              quantity: shopListItem.quantity,
              value: getItemValue(inStockItem.price, shopListItem.quantity)
            });
          }
        } else {
          flashMessageTexts.push(`Our product with an ID of ${shopListItem.id} is out of stock`);
          localShopList.deleteItem(shopListItem.id);
        }
      });

      if (flashMessageTexts.length) {
        toast.warn('shopList is modified.', {
          position: toast.POSITION.BOTTOM_LEFT
        });
        dispatch(
          flashMessage({
            status: 'notice',
            title: 'shopList is modified',
            texts: flashMessageTexts
          })
        );
      }
      return dispatch(modifyShopListSucceeded(updatedShopList));
    });
  };
}
