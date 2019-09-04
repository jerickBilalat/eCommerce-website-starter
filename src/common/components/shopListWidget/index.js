import React from 'react';
import { Link } from 'react-router-dom';
import WidgetShopListCard from './widgetShopListCard';

const shopListWidget = ({ shopListItems, doRemoveItem, subTotal }) => {
  return (
    <div className="widget">
      <div className="headline no-margin">
        <h4>Shopping List</h4>
      </div>
      <div id="cart">
        {shopListItems.length ? (
          shopListItems.map(item => (
            <WidgetShopListCard key={item.id} {...item} doRemoveItem={doRemoveItem} />
          ))
        ) : (
          <p>No list items</p>
        )}
        <span className="cart-subtotal">
          {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
          Subtotal: <strong>${subTotal}</strong>
        </span>
        <Link to="/shop_list" className="button gray">
          View List
        </Link>
      </div>
    </div>
  );
};
export default shopListWidget;
