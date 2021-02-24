import React from 'react';
import { Link } from 'react-router-dom';

const footer = () => {
  return (
    <div id="footer">
      <div className="container">
        <div className="row">
          <div className="col-md-5 col-sm-6 col-xs-12">
            <h4>About</h4>
            <p>
              Morbi convallis bibendum urna ut viverra. Maecenas quis consequat libero, a feugiat
              eros. Nunc ut lacinia tortor morbi ultricies laoreet ullamcorper phasellus semper.
            </p>
            <a href="facebook.com" className="button social-btn">
              <i className="fa fa-facebook-official" />
              Like Us on Facebook
            </a>
          </div>

          <div className="col-md-4  col-sm-6 col-xs-12">
            <h4>Helpful Links</h4>
            <ul className="footer-links">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/shop">Shop</Link>
              </li>
              <li>
                <Link to="/cart">Cart</Link>
              </li>
            </ul>

            <ul className="footer-links">
              <li>
                <a href="http://www.jbilalat.com">Portfolio</a>
              </li>
              <li>
                <a href="http://www.jbilalat.com">Blog</a>
              </li>
              <li>
                <a href="http://www.jbilalat.com">Contact</a>
              </li>
            </ul>
          </div>

          <div className="col-md-3  col-sm-12 col-xs-12">
            <h4>Contact Us</h4>
            <div className="text-widget">
              <span>12345 Little Lonsdale St, Melbourne</span>
              <br />
              Phone:
              <span>(123) 123-456 </span>
              <br />
              Fax:
              <span>(123) 123-456</span>
              <br />
              E-Mail:
              <span> office@example.com </span>
              <br />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <div className="copyrights">© Copyright 2019 by JRK. All Rights Reserved.</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default footer;
