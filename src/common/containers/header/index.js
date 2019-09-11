import React, { Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { syncCart } from '../../actions/cartActions';

class Header extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(syncCart());
  }

  render() {
    const navigationLinks = [{ name: 'Home', path: '/' }, { name: 'Shop', path: '/shop' }];
    const { match, cartItems } = this.props;
    return (
      <Fragment>
        <div className="row">
          <div className="header">
            <div className="col-md-3 col-sm-12">
              <div id="logo">
                <h1>JRK POOLS</h1>
              </div>
            </div>
            <div className="clearfix" />
          </div>
        </div>
        <div className="row">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <nav id="navigation">
                  <ul className="menu">
                    {navigationLinks.map(item => (
                      <li key={item.name}>
                        <Link
                          className={(match.path === item.path && 'current') || ' '}
                          to={item.path}
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                    <li className={(match.path === '/cart' && 'current cart-icon') || 'cart-icon'}>
                      <Link to="/cart">
                        <i className="fa fa-shopping-cart" />
                        {cartItems ? (
                          <span className="cart-counter">{cartItems.length}</span>
                        ) : null}
                      </Link>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
          <div className="clearfix" />
        </div>
      </Fragment>
    );
  }
}

function mapStateToProps(store) {
  return {
    cartItems: [...store.cart.cartItems]
  };
}

export default withRouter(connect(mapStateToProps)(Header));
