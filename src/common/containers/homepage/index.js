import React from 'react';
import { Link } from 'react-router-dom';

import Header from '../header';

class Home extends React.Component {
  componentDidMount() {
    window.__PRELOADED_STATE__ ? delete window.__PRELOADED_STATE__ : null; // eslint-disable-line no-unused-expressions, no-underscore-dangle
  }

  render() {
    return (
      <>
        <Header />
        <div className="row">
          <div className="col-md-12">
            <div className="info-banner">
              <div className="info-content">
                <h3>eCommerce Website Starter</h3>
                <p>Main Web Technologies that are used</p>
                <ul>
                  <li>React</li>
                  <li>React-Router 4</li>
                  <li>Redux</li>
                  <li>
                    <a
                      href="http://www.vasterad.com/themes/reneva/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Revena
                    </a>{' '}
                    Html and CSS template built with Bootstrap
                  </li>
                </ul>
                <p>Features</p>
                <ul>
                  <li>
                    React Server Side Rendering built on top of{' '}
                    <a
                      href="https://github.com/jaredpalmer/razzle"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Razzle
                    </a>{' '}
                    Framework
                  </li>
                  <li>Single Page Applicaton</li>
                  <li>Product Listing</li>
                  <li>Shopping List</li>
                  <li>Guest Cart</li>
                  <li>Checkout</li>
                </ul>
                <p>
                  Source Code:{' '}
                  <a
                    href="https://github.com/jerickBilalat/eCommerce-website-starter.git"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub
                  </a>
                </p>
              </div>
              <Link to="/shop" className="button border">
                Go to Shop
              </Link>
              <div className="clearfix" />
            </div>
          </div>

          <div className="col-md-12">
            <div className="info-banner">
              <div className="info-content">
                <h3>Administration Panel</h3>
                <p>
                  See also the{' '}
                  <a href="http://shop-admin.surge.sh/" target="_blank" rel="noopener noreferrer">
                    Administration Panel
                  </a>{' '}
                  Web app that complements this project
                </p>
              </div>
              <a
                className="button border"
                href="http://shop-admin.surge.sh/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Go to Admin Panel
              </a>
              <div className="clearfix" />
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default {
  component: Home
};
