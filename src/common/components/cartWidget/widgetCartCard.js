import React from 'react';
import { Link } from 'react-router-dom';

const widgetCartCard = ({ id, name, quantity, doRemoveItem }) => {
  return (
    <ul className="cart-items">
      <li>
        <Link className="cart-item-title" to={`/product_detail/${id}`}>
          {name}
        </Link>
        <span className="cart-item-amount">
          <button
            type="button"
            style={{ margin: 0, border: 'none' }}
            className="item-remove"
            onClick={() => doRemoveItem(id)}
          >
            <i className="fa fa-remove" />
          </button>
          qty:
          {quantity}
        </span>
      </li>
    </ul>
  );
};

export default widgetCartCard;
