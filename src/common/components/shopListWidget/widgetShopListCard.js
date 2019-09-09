import React from 'react';
import { Link } from 'react-router-dom';

const widgetShopListCard = ({ id, name, doRemoveItem }) => {
  return (
    <ul className="cart-items">
      <li>
        <span className="cart-item-amount">
          <button
            type="button"
            style={{ margin: 0, border: 'none' }}
            className="item-remove pull-right"
            onClick={() => doRemoveItem(id)}
          >
            <i className="fa fa-remove" />
          </button>
        </span>
        <Link className="cart-item-title" to={`/product_detail/${id}`}>
          {name}
        </Link>
      </li>
    </ul>
  );
};

export default widgetShopListCard;
