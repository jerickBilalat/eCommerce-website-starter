import React, { Component } from 'react';
import { connect } from 'react-redux';
import ShopListWidget from '../../components/shopListWidget';
import { deleteShopListItem } from '../../actions/shopListActions';
import { getSubTotal } from '../../reducers/shopListReducer';

class Widgets extends Component {
  doRemoveLocalShopListItem = id => {
    const { dispatch } = this.props;
    dispatch(deleteShopListItem(id));
  };

  render() {
    const { shopList, subTotal } = this.props;
    return (
      <React.Fragment>
        <ShopListWidget
          shopListItems={shopList.listItems}
          doRemoveItem={this.doRemoveLocalShopListItem}
          subTotal={subTotal}
        />
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    shopList: { ...state.shopList },
    subTotal: getSubTotal({ ...state })
  };
}

export default connect(mapStateToProps)(Widgets);
