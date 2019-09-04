import React from 'react';
import { Link } from 'react-router-dom';
import WidgetCartCard from './widgetCartCard';

const cartWidget = ({ cartItems, doRemoveItem, subTotal }) => {
  return (
    <div className="widget">
      <div className="headline no-margin">
        <h4>Cart</h4>
      </div>
      <div id="cart">
        {cartItems.length ? (
          cartItems.map(item => (
            <WidgetCartCard key={item.id} {...item} doRemoveItem={doRemoveItem} />
          ))
        ) : (
          <p>No cart items</p>
        )}
        <span className="cart-subtotal">
          {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
          Subtotal: <strong>${subTotal}</strong>
        </span>
        <Link to="/cart" className="button gray">
          View Cart
        </Link>
      </div>
    </div>
  );
};
export default cartWidget;
