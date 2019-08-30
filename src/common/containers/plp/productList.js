import React from 'react';
import ProductCard from './productCard';

const ProductList = ({ toShop, doIncreaseShopListItemQuantity }) => {
  const renderCards = () =>
    toShop
      ? toShop.map(item => (
          <ProductCard
            key={`${item._id}`} // eslint-disable-line no-underscore-dangle
            productItem={{ ...item }}
            doIncreaseShopListItemQuantity={doIncreaseShopListItemQuantity}
          />
        ))
      : null;

  return <React.Fragment>{renderCards()}</React.Fragment>;
};

export default ProductList;
