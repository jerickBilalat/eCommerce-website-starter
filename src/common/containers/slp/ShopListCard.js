import React from 'react';
import { Link } from 'react-router-dom';
import DefaultImageSrc from './shop-widget-02.jpg';

const shopListCard = ({
  id,
  name,
  price,
  quantity,
  value,
  products,
  deleteShopListItem,
  increaseQuantity,
  decreaseQuantity
}) => {
  const shopListItem =
    products && products.length
      ? products
          .map(item => ({ id: item._id, images: item.images })) // eslint-disable-line no-underscore-dangle
          .filter(item => item.id === id)[0]
      : null;
  const images = shopListItem && shopListItem.images;
  const imageLink = images && images.length ? images[2] : `${DefaultImageSrc}`;
  return (
    <tr>
      <td>
        <img src={`${imageLink}`} alt="" />
      </td>
      <td className="cart-title">
        <Link to={`/product_detail/${id}`}>{name}</Link>
      </td>
      <td>${price}</td>
      <td>
        <form className="qty-btns">
          {/* todo handle keypress event for a11y */}
          <div
            role="button"
            tabIndex={0}
            className="qtyminus"
            onClick={() => decreaseQuantity({ id, name, price }, -1)}
            onKeyPress={() => null}
          ></div>
          <input type="text" name="quantity" value={quantity} className="qty" readOnly />
          <div
            role="button"
            tabIndex={-1}
            className="qtyplus"
            onClick={() => increaseQuantity({ id, name, price }, 1)}
            onKeyPress={() => null}
          ></div>
        </form>
      </td>
      <td className="cart-total">${value}</td>
      <td>
        <button
          type="button"
          tabIndex={-2}
          className="cart-remove"
          onClick={() => deleteShopListItem(id)}
          onKeyPress={() => null}
        ></button>
      </td>
    </tr>
  );
};

export default shopListCard;
