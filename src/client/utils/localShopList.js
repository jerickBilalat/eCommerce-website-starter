/* NOTE: localStorage Browser Compatibility
localStorage my not be present in all browsers. Go to https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Local_storage for a polyfill or google other alternatives.
*/
// todo polyfill localstorage

function clearShopList() {
  localStorage.setItem('shopList', '[]');
}

function decreaseItemQuantity(id, differential) {
  const shopList = getShopList();
  const updatedShopList = [];
  let newShopListItemQuantity;

  if (
    shopList.length !== 0 &&
    shopList.map(item => item.id).includes(id) &&
    shopList.filter(item => item.id === id)[0].quantity > 0
  ) {
    shopList.forEach(item => {
      if (item.id === id) {
        // eslint-disable-next-line
        item.quantity += differential;
        newShopListItemQuantity = item.quantity;
        if (newShopListItemQuantity !== 0) {
          updatedShopList.push(item);
        }
      } else {
        updatedShopList.push(item);
      }
    });

    updateLocalShopList(updatedShopList);
    return newShopListItemQuantity;
  }
  throw new Error('shopList is empty or item is not in shopList');
}

function increaseItemQuantity(id, differential) {
  const shopList = getShopList();

  const updatedShopList = [...shopList];
  let newShopListItemQuantity;

  // local shopList is empty OR newItem being added is not in local shopList
  if (updatedShopList.length === 0 || updatedShopList.filter(shopListItem => shopListItem.id === id).length === 0) {
    updatedShopList.push({ id, quantity: differential });
    updateLocalShopList(updatedShopList);
    newShopListItemQuantity = differential;
    return newShopListItemQuantity;
  }

  updatedShopList.forEach(shopListItem => {
    if (shopListItem.id === id) {
      // eslint-disable-next-line
      shopListItem.quantity += differential;
      newShopListItemQuantity = shopListItem.quantity;
    }
  });

  updateLocalShopList(updatedShopList);
  return newShopListItemQuantity;
}

function modifyItemQuantity(id, differential) {
  const shopList = getShopList();
  const updatedShopList = [];

  // local shopList is empty OR item being added is not in local shopList
  if ((shopList && shopList.length <= 0) || shopList.filter(item => item.id === id).length === 0) {
    shopList.push({ id, quantity: 1 });
    updateLocalShopList(shopList);
    return shopList;
  }

  // push each item in updatedShopList if quantity is not zero
  shopList.forEach(item => {
    if (item.id === id) {
      // eslint-disable-next-line
      item.quantity += differential;
      if (item.quantity !== 0) {
        updatedShopList.push(item);
      }
    } else {
      updatedShopList.push(item);
    }
  });

  updateLocalShopList(updatedShopList);
  return updatedShopList;
}

function quantitySync(id, int) {
  let shopList = getShopList();
  let updatedItem;

  shopList = shopList.map(item => {
    if (item.id === id) {
      // eslint-disable-next-line
      item.quantity = int;
      updatedItem = item;
      return item;
    }

    return item;
  });

  updateLocalShopList(shopList);
  return updatedItem;
}

function deleteItem(id) {
  let shopList = getShopList();

  shopList = shopList.filter(item => item.id !== id);
  updateLocalShopList(shopList);
  return shopList;
}

function getItemQuantity(id) {
  const shopList = getShopList();

  if (shopList.length === 0) return 0;

  const items = shopList.filter(item => item.id === id);

  if (items.length === 0) return 0;

  return items[0].quantity;
}

function getShopList() {
  return JSON.parse(localStorage.getItem('shopList')) || [];
}

function updateLocalShopList(newShopList) {
  return localStorage.setItem('shopList', JSON.stringify(newShopList));
}

export default {
  decreaseItemQuantity,
  increaseItemQuantity,
  quantitySync,
  modifyItemQuantity,
  deleteItem,
  getItemQuantity,
  getShopList,
  clearShopList
};
