import React, { Component } from 'react';
import { connect } from 'react-redux';
import ShopListWidget from '../../components/shopListWidget';
import CartWidget from '../../components/cartWidget';
import { deleteShopListItem } from '../../actions/shopListActions';
import { deleteCartItem } from '../../actions/cartActions';
import { getSubTotal } from '../../reducers/cartReducer';

class Widgets extends Component {
  doRemoveLocalShopListItem = id => {
    const { dispatch } = this.props;
    dispatch(deleteShopListItem(id));
  };

  doRemoveLocalCartItem = id => {
    const { dispatch } = this.props;
    dispatch(deleteCartItem(id));
  };

  render() {
    const { shopList, cartSubTotal, cart } = this.props;
    return (
      <React.Fragment>
        <CartWidget
          cartItems={cart.cartItems}
          doRemoveItem={this.doRemoveLocalCartItem}
          subTotal={cartSubTotal}
        />
        <ShopListWidget
          shopListItems={shopList.listItems}
          doRemoveItem={this.doRemoveLocalShopListItem}
        />
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    shopList: { ...state.shopList },
    cart: { ...state.cart },
    cartSubTotal: getSubTotal({ ...state })
  };
}

export default connect(mapStateToProps)(Widgets);
