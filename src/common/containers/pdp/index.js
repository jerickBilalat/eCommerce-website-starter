import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import ProductDetail from './productDetail';
import Widgets from '../psw';

import { getProductDetail, clearProductDetail } from '../../actions/productActions';
import { increaseShopListItemQuantity, syncShopList } from '../../actions/shopListActions';

class productDetailPage extends Component {
  componentDidMount() {
    const { match, dispatch, products, history } = this.props;
    /* eslint-disable no-underscore-dangle */
    if (
      window.__PRELOADED_STATE__ &&
      window.__PRELOADED_STATE__.products.prodDetail &&
      window.__PRELOADED_STATE__.products.prodDetail !== null &&
      window.__PRELOADED_STATE__.products.prodDetail !== undefined
    ) {
      delete window.__PRELOADED_STATE__;
      /* eslint-enable no-underscore-dangle */
    } else {
      const { id } = match.params;
      dispatch(getProductDetail(id)).catch(() => {
        if (!products.prodDetail) {
          // todo: include notification, go to product not found page and no in "/"
          history.push('/');
        }
      });
    }

    dispatch(syncShopList());
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch(clearProductDetail());
  }

  doIncreaseShopListItemQuantity = (prodDetail, differential) => {
    const { dispatch } = this.props;
    dispatch(increaseShopListItemQuantity(prodDetail, differential));
  };

  render() {
    const {
      products: { prodDetail }
    } = this.props;
    return (
      <React.Fragment>
        {prodDetail && (
          <div className="row">
            <div id="titlebar">
              <div className="container">
                <div className="row">
                  <div className="col-md-12">
                    <h1 style={{ fontSize: 14 }}>{prodDetail.name}</h1>

                    <nav id="breadcrumbs">
                      <ul>
                        <li>
                          <Link to="/">Home</Link>
                        </li>
                        <li>
                          <Link to="/">Shop</Link>
                        </li>
                        <li>Product Detail</li>
                      </ul>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="row">
          {prodDetail ? (
            <ProductDetail
              prodDetail={prodDetail}
              increaseQuantity={this.doIncreaseShopListItemQuantity}
            />
          ) : (
            // todo handle product not available
            <h4>Loading Product Detail...</h4>
          )}
          <div className="col-md-3 col-sm-5">
            <Widgets />
            <div className="clearfix" />
            <div className="margin-bottom-40" />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    products: { ...state.products }
  };
};

const loadData = async (store, id) => {
  await store.dispatch(getProductDetail(id));
};

export default {
  component: connect(mapStateToProps)(productDetailPage),
  loadData
};
