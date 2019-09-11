import React from 'react';
import { Link } from 'react-router-dom';

import Header from '../header';

const Home = props => {
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
                  <a href="http://www.vasterad.com/themes/reneva/">Revena</a> Html and CSS template
                  built with Bootstrap
                </li>
              </ul>
              <p>Features</p>
              <ul>
                <li>React Server Side Rendering built on top of <a href="https://github.com/jaredpalmer/razzle">Razzle</a> Framework</li>
                <li>Single Page Applicaton</li>
                <li>Product Listing</li>
                <li>Shopping List</li>
                <li>Guest Cart</li>
                <li>Checkout</li>
              </ul>
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
              <p>See also the <a href="http://shop-admin.surge.sh/">Administration Panel</a> Web app that complements this project</p>
            </div>
            <a className="button border" href="http://shop-admin.surge.sh/">Go to Admin Panel</a>
            <div className="clearfix" />
          </div>
        </div>
      </div>
    </>
  );
};

export default {
  component: Home
};
