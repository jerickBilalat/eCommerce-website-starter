import React from 'react';
import { Link } from 'react-router-dom';
import DefaultImageSrc from './shop-widget-02.jpg';

const shopListCardMobile = ({
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
          .map(item => ({ id: item._id, images: item.images })) // eslint-disable-line no-underscore-dangle
          .filter(item => item.id === id)[0]
      : null;
  const images = shopListItem && shopListItem.images;
  const imageLink = images && images.length ? images[2] : `${DefaultImageSrc}`;
  return (
    <React.Fragment>
      <tr className="st-space">
        <td></td>
        <td></td>
      </tr>
      <tr className="st-new-item">
        <td className="st-key"></td>
        <td className="st-val st-head-row">
          <img src={`${imageLink}`} alt="" />
        </td>
      </tr>
      <tr>
        <td className="st-key">Name</td>
        <td className="st-val">
          <Link to={`/product_detail/${id}`}>{name}</Link>
        </td>
      </tr>
      <tr>
        <td className="st-key">Price</td>
        <td className="st-val">${price}</td>
      </tr>
      <tr>
        <td className="st-key"></td>
        <td className="st-val">
          <button
            type="button"
            className="button"
            onClick={() => doAddToCart({ id, name, price }, 1)}
          >
            Add to Cart
          </button>
        </td>
      </tr>
      <tr>
        <td className="st-key"></td>
        <td className="st-val">
          <button
            type="button"
            className="cart-remove"
            onClick={() => deleteShopListItem(id)}
          ></button>
        </td>
      </tr>
    </React.Fragment>
  );
};

export default shopListCardMobile;
