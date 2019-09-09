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
  doAddToCart
}) => {
  const shopListItem =
    products && products.length
      ? products
          .map(item => ({ id: item._id, name: item.name, images: item.images })) // eslint-disable-line no-underscore-dangle
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
        <button
          type="button"
          className="button"
          onClick={() => doAddToCart({ id, name, price }, 1)}
        >
          Add to Cart
        </button>
      </td>
      <td></td>
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
