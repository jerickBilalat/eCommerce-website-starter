import React from 'react';
import { Link } from 'react-router-dom';
import DefaultImageSrc from '../../assets/images/default_400x340.png';

const productCard = ({ productItem, doIncreaseShopListItemQuantity }) => {
  const { _id: id } = productItem;
  const imageLink =
    productItem.images && productItem.images.length ? productItem.images[0] : DefaultImageSrc;

  function renderProductName() {
    switch (productItem.productType) {
      case 'pool_table':
        if (productItem.used && productItem.provider === 'tcrec')
          return `Refurbished ${productItem.name} ${productItem.poolTableSize}" Billiard Table + Free Install and more`;
        if (productItem.provider === 'allamerican')
          return `${productItem.name} ${productItem.poolTableSize}" Billiard table by American Classic`;
        if (productItem.provider === 'impire')
          return `Refurbished ${productItem.name} ${productItem.poolTableSize}" Billiard Table`;
        return `${productItem.name} ${productItem.poolTableSize}" Billiard table`;
      case 'swimming_pool':
        return `${productItem.name} Swimming Pool`;
      default:
        return `${productItem.name}`;
    }
  }

  return (
    <div className="col-md-4 col-xs-12">
      <div className="shop-item">
        <figure>
          <Link to={`/product_detail/${id}`}>
            <img src={`${imageLink}`} alt="" />
          </Link>
          <figcaption className="item-description">
            <Link to={`/product_detail/${id}`}>
              <div style={{ minHeight: 85 }}>
                <h5>{renderProductName()}</h5>
              </div>
            </Link>
            <span className="sale">
              <mark>
                {productItem.productType === 'swimming_pool'
                  ? `Starting at $${productItem.price}`
                  : `$${productItem.price}`}{' '}
              </mark>
            </span>
            <button
              type="button"
              onClick={() =>
                doIncreaseShopListItemQuantity(id, productItem.name, productItem.price, 1)
              }
              className="button gray"
            >
              Add to List
            </button>
          </figcaption>
        </figure>
      </div>
    </div>
  );
};

export default productCard;
