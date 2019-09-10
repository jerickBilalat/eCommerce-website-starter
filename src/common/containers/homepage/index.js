import React from 'react';
import { Link } from 'react-router-dom';

const Home = props => {
  return (
    <div className="row">
      <div className="col-md-12">
        <div className="info-banner">
          <div className="info-content">
            <h3>Ecommerce App Starter</h3>
            <p>
              Built with React and Redux and the awesome{' '}
              <a href="http://www.vasterad.com/themes/reneva/">Revena</a> Html template by{' '}
              <a href="http://www.vasterad.com/themes/">Vasterad</a>
            </p>
          </div>
          <Link to="/shop" className="button border">
            Browse Shop
          </Link>
          <div className="clearfix" />
        </div>
      </div>
    </div>
  );
};

export default {
  component: Home
};
