import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import FlashMessage from '../../components/FlashMessage';
import {
  clearShopList,
  flashMessage,
  getLocalShopListToStore,
  deleteLocalShopListItem
} from '../../actions/shopListActions';
import { fetchProducts } from '../../actions/productActions';
import { increaseCartItemQuantity, syncCart } from '../../actions/cartActions';
import ScrollTo from '../../components/ScrollTo';

import ShopList from './ShopList';
import Header from '../header';

class ShopListPage extends Component {
  state = {
    formFields: {
      name: '',
      email: '',
      phone: '',
      message: ''
    },
    formErrors: {}
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchProducts(0, 1000, [], []));
    dispatch(getLocalShopListToStore());
  }

  updateFormState = event => {
    const { state } = this;
    if (!event.isTrusted) return;

    const field = event.target.name;
    const formFields = { ...state.formFields };
    formFields[field] = event.target.value;
    this.setState({ formFields });
  };

  submitForm = event => {
    const { state } = this;
    event.preventDefault();

    if (!this.courseFormIsValid()) {
      return toast.error('Form is not valid');
    }
    if (state.formFields.message === '') {
      const formFields = { ...state.formFields };
      this.setState({ formFields });
    }
    return window.scrollTo(0, 140);
  };

  submitOrderForm = event => {
    const { dispatch, history } = this.props;
    event.preventDefault();
    dispatch(clearShopList());
    dispatch(flashMessage(null));
    toast.success('Order submitted');
    history.push('/');
  };

  courseFormIsValid = () => {
    let isFormValid = true;
    const errors = {};
    const { formFields } = this.state;
    /* eslint-disable no-useless-escape */
    const validEmailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    /* eslint-enable no-useless-escape */

    if (formFields.name.length <= 0) {
      isFormValid = false;
      errors.name = 'Name is required';
    }

    if (formFields.email.length <= 0) {
      isFormValid = false;
      errors.email = 'Email is required';
    } else if (!validEmailPattern.test(String(formFields.email).toLowerCase())) {
      isFormValid = false;
      errors.email = 'Enter a valid email';
    }

    const phoneNumber = formFields.phone;
    if (phoneRegex.test(phoneNumber)) {
      const formattedPhoneNumber = phoneNumber.replace(phoneRegex, '($1) $2-$3');
      this.setState({ formFields: { phone: formattedPhoneNumber } });
    } else {
      isFormValid = false;
      errors.phone = 'Enter a valid phone number';
    }

    this.setState({ formErrors: errors });
    return isFormValid;
  };

  doDeleteShopListItem = id => {
    const { dispatch } = this.props;
    dispatch(deleteLocalShopListItem(id));
  };

  doAddToCart = (productDetials, differential) => {
    const { dispatch } = this.props;
    dispatch(increaseCartItemQuantity(productDetials, differential));
  };

  renderContent = () => {
    const { props, state } = this;
    return (
      <Fragment>
        <ScrollTo />
        <ShopList
          formFields={state.formFields}
          updateFormState={this.updateFormState}
          formErrors={state.formErrors}
          submitForm={this.submitForm}
          shopListItems={props.shopList.listItems}
          products={props.toShop}
          deleteShopListItem={this.doDeleteShopListItem}
          doAddToCart={this.doAddToCart}
        />
      </Fragment>
    );
  };

  renderFlashMessage = () => {
    const { props } = this;
    return (
      props.flashMessage && (
        <FlashMessage
          status={props.flashMessage.status}
          title={props.flashMessage.title}
          texts={props.flashMessage.texts}
        />
      )
    );
  };

  render() {
    return (
      <React.Fragment>
        <Header />
        <div className="row">
          <div id="titlebar">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <h2>Shopping List</h2>

                  <nav id="breadcrumbs">
                    <ul>
                      <li>
                        <Link to="/">Home</Link>
                      </li>
                      <li>
                        <Link to="/shop">Shop</Link>
                      </li>
                      <li>Shopping List</li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
        {this.renderFlashMessage()}
        {this.renderContent()}
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    shopList: { ...state.shopList },
    flashMessage: state.shopList.flashMessage,
    toShop: [...state.products.toShop]
  };
}

ShopListPage.propTypes = {
  toShop: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default {
  component: connect(mapStateToProps)(ShopListPage)
};
