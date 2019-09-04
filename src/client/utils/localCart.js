/* NOTE: localStorage Browser Compatibility
todo localStorage my not be present in all browsers. Go to https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Local_storage for a polyfill or google other alternatives.
*/

function clearCart() {
  localStorage.setItem('cart', '[]');
}

function decreaseItemQuantity(id, differential) {
  const cart = getCart();
  const updatedCart = [];
  let newCartItemQuantity;

  if (
    cart.length !== 0 &&
    cart.map(item => item.id).includes(id) &&
    cart.filter(item => item.id === id)[0].quantity > 0
  ) {
    cart.forEach(item => {
      if (item.id === id) {
        // eslint-disable-next-line
        item.quantity += differential;
        newCartItemQuantity = item.quantity;
        if (newCartItemQuantity !== 0) {
          updatedCart.push(item);
        }
      } else {
        updatedCart.push(item);
      }
    });

    updateLocalCart(updatedCart);
    return newCartItemQuantity;
  }
  throw new Error('Cart is empty or item is not in cart');
}

function increaseItemQuantity(id, differential) {
  const cart = getCart();

  const updatedCart = [...cart];
  let newCartItemQuantity;

  // local cart is empty OR newItem being added is not in local cart
  if (updatedCart.length === 0 || updatedCart.filter(cartItem => cartItem.id === id).length === 0) {
    updatedCart.push({ id, quantity: differential });
    updateLocalCart(updatedCart);
    newCartItemQuantity = differential;
    return newCartItemQuantity;
  }

  updatedCart.forEach(cartItem => {
    if (cartItem.id === id) {
      // eslint-disable-next-line
      cartItem.quantity += differential;
      newCartItemQuantity = cartItem.quantity;
    }
  });

  updateLocalCart(updatedCart);
  return newCartItemQuantity;
}

function modifyItemQuantity(id, differential) {
  const cart = getCart();
  const updatedCart = [];

  // local cart is empty OR item being added is not in local cart
  if ((cart && cart.length <= 0) || cart.filter(item => item.id === id).length === 0) {
    cart.push({ id, quantity: 1 });
    updateLocalCart(cart);
    return cart;
  }

  // push each item in updatedCart if quantity is not zero
  cart.forEach(item => {
    if (item.id === id) {
      // eslint-disable-next-line
      item.quantity += differential;
      if (item.quantity !== 0) {
        updatedCart.push(item);
      }
    } else {
      updatedCart.push(item);
    }
  });

  updateLocalCart(updatedCart);
  return updatedCart;
}

function quantitySync(id, int) {
  let cart = getCart();
  let updatedItem;

  cart = cart.map(item => {
    if (item.id === id) {
      // eslint-disable-next-line
      item.quantity = int;
      updatedItem = item;
      return item;
    }

    return item;
  });

  updateLocalCart(cart);
  return updatedItem;
}

function deleteItem(id) {
  let cart = getCart();

  cart = cart.filter(item => item.id !== id);
  updateLocalCart(cart);
  return cart;
}

function getItemQuantity(id) {
  const cart = getCart();

  if (cart.length === 0) return 0;

  const items = cart.filter(item => item.id === id);

  if (items.length === 0) return 0;

  return items[0].quantity;
}

function getCart() {
  return JSON.parse(localStorage.getItem('cart')) || [];
}

function updateLocalCart(newCart) {
  return localStorage.setItem('cart', JSON.stringify(newCart));
}

export default {
  decreaseItemQuantity,
  increaseItemQuantity,
  quantitySync,
  modifyItemQuantity,
  deleteItem,
  getItemQuantity,
  getCart,
  clearCart
};
