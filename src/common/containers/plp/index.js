import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchProducts } from '../../actions/productActions';
import { addLocalShopListItem } from '../../actions/shopListActions';

import ProductList from './productList';
import PageSideWidget from '../psw';
import Header from '../header';

class ProductListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      limit: 6,
      skip: 0,
      filters: {}
    };
  }

  componentDidMount() {
    const { skip, limit, filters } = this.state;
    const { dispatch } = this.props;
    /* eslint-disable no-underscore-dangle */
    if (
      window.__PRELOADED_STATE__ &&
      window.__PRELOADED_STATE__.products.toShop &&
      window.__PRELOADED_STATE__.products.toShop !== null &&
      window.__PRELOADED_STATE__.products.toShop !== undefined
    ) {
      delete window.__PRELOADED_STATE__;
      /* eslint-enable no-underscore-dangle */
    } else {
      dispatch(fetchProducts(skip, limit, filters));
    }
  }

  doLoadMoreProducts = () => {
    const { skip, limit, filters } = this.state;
    const { products, dispatch } = this.props;
    const newSkip = skip + limit;
    dispatch(fetchProducts(newSkip, limit, filters, products.toShop));

    // todo: refactor to use thunks instead of promises
    this.setState({
      skip: newSkip
    });
  };

  doIncreaseShopListItemQuantity = (id, name, price, quantity) => {
    const { dispatch } = this.props;
    return dispatch(addLocalShopListItem({ id, name, price }, quantity));
  };

  render() {
    const { products } = this.props;
    const { limit } = this.state;
    return (
      <React.Fragment>
        <Header />
        <div className="row">
          <div id="titlebar">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <h2>Shop</h2>

                  <nav id="breadcrumbs">
                    <ul>
                      <li>
                        <Link to="/">Home</Link>
                      </li>
                      <li>Shop</li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-9 col-sm-7">
            <div className="row extra-gutter-right">
              {products.toShop && products.toShop.length ? (
                <ProductList
                  toShop={products.toShop}
                  toShopSize={products.toShopSize}
                  limit={limit}
                  doIncreaseShopListItemQuantity={this.doIncreaseShopListItemQuantity}
                />
              ) : (
                // todo handle no prdoucts available
                <h4>Loading Product List...</h4>
              )}
            </div>
            {products.toShop &&
            products.toShop.length &&
            products.toShopSize > 0 &&
            products.toShopSize >= limit ? (
              <div className="row">
                <div className="col-md-12 extra-gutter-right text-center">
                  <div className="with-btn margin-bottom-20">
                    <button
                      type="button"
                      onClick={() => this.doLoadMoreProducts()}
                      className="button border medium"
                    >
                      More
                    </button>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
          <div className="col-md-3 col-sm-5">
            <PageSideWidget />
            <div className="clearfix" />
            <div className="margin-bottom-40" />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const loadData = async store => {
  await store.dispatch(fetchProducts(0, 6));
};

const mapStateToProps = state => {
  return {
    products: { ...state.products }
  };
};

export default {
  component: connect(mapStateToProps)(ProductListPage),
  loadData
};
