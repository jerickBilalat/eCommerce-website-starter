import React from 'react';
import { Link } from 'react-router-dom';
import ShopListCard from './ShopListCard';
import ShopListCardMobile from './ShopListCardMobile';

const ShopList = ({
  shopListItems,
  products,
  formFields,
  updateFormState,
  formErrors,
  submitForm,
  deleteShopListItem,
  doAddToCart
}) => {
  return (
    <React.Fragment>
      <div className="row">
        <div className="col-md-12">
          <table className="stacktable small-only">
            <tbody>
              {shopListItems.length ? (
                shopListItems.map(item => (
                  <ShopListCardMobile
                    key={item.id}
                    {...item}
                    products={products}
                    deleteShopListItem={deleteShopListItem}
                    doAddToCart={doAddToCart}
                  />
                ))
              ) : (
                <tr>
                  <td>
                    No items in ShopList. Click <Link to="/">Here</Link> to browse our products
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          <table className="cart-table responsive-table stacktable large-only">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Price</th>
                <th></th>
                <th></th>
                <th />
              </tr>
            </thead>

            <tbody>
              {shopListItems.length ? (
                shopListItems.map(item => (
                  <ShopListCard
                    key={item.id}
                    {...item}
                    products={products}
                    deleteShopListItem={deleteShopListItem}
                    doAddToCart={doAddToCart}
                  />
                ))
              ) : (
                <tr>
                  <td>
                    No items in ShopList. Click <Link to="/">Here</Link> to browse our products
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ShopList;
