/* NOTE: localStorage Browser Compatibility
localStorage my not be present in all browsers. Go to https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Local_storage for a polyfill or google other alternatives.
*/
// todo polyfill localstorage

function clearShopList() {
  localStorage.setItem('shopList', '[]');
}

function addItem(id, name) {
  const shopList = getShopList();

  const updatedShopList = [...shopList];

  // local shopList is empty OR newItem being added is not in local shopList
  if (
    updatedShopList.length === 0 ||
    updatedShopList.filter(shopListItem => shopListItem.id === id).length === 0
  ) {
    updatedShopList.push({ id, name });
    updateLocalShopList(updatedShopList);
    return false;
  }

  updateLocalShopList(updatedShopList);
  return true;
}

function deleteItem(id) {
  let shopList = getShopList();

  shopList = shopList.filter(item => item.id !== id);
  updateLocalShopList(shopList);
  return shopList;
}

function getShopList() {
  return JSON.parse(localStorage.getItem('shopList')) || [];
}

function updateLocalShopList(newShopList) {
  return localStorage.setItem('shopList', JSON.stringify(newShopList));
}

export default {
  addItem,
  deleteItem,
  getShopList,
  clearShopList
};
