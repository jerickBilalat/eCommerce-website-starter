import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import currency from 'currency.js';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { getSubTotal, getShippingTotal } from '../../reducers/cartReducer';
import FlashMessage from '../../components/FlashMessage';
import {
  clearCart,
  flashMessage,
  syncCart,
  deleteCartItem,
  increaseCartItemQuantity,
  decreaseCartItemQuantity
} from '../../actions/cartActions';
import { fetchProducts } from '../../actions/productActions';
import ScrollTo from '../../components/ScrollTo';

import Cart from './cart';
import OrderConfirm from './orderConfirm';

class CartPage extends Component {
  state = {
    showOrderConfirm: false,
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
    dispatch(syncCart());
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

    if (!this.orderFromIsValid()) {
      return toast.error('Form is not valid');
    }
    if (state.formFields.message === '') {
      const formFields = { ...state.formFields };
      this.setState({ formFields });
    }
    this.setState({ showOrderConfirm: true });
    return window.scrollTo(0, 140);
  };

  submitOrderForm = event => {
    const { dispatch, history } = this.props;
    event.preventDefault();
    dispatch(clearCart());
    dispatch(flashMessage(null));
    toast.success('Order submitted');
    this.setState({ showOrderConfirm: false });
    history.push('/');
  };

  orderFromIsValid = () => {
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

  doDeleteCartItem = id => {
    const { dispatch } = this.props;
    dispatch(deleteCartItem(id));
  };

  increaseQuantity = (productDetials, differential) => {
    const { dispatch } = this.props;
    dispatch(increaseCartItemQuantity(productDetials, differential));
  };

  decreaseQuantity = (productDetials, differential) => {
    const { dispatch } = this.props;
    dispatch(decreaseCartItemQuantity(productDetials, differential));
  };

  renderContent = () => {
    const { props, state } = this;

    if (state.showOrderConfirm)
      return (
        <Fragment>
          <OrderConfirm
            formFields={state.formFields}
            cartItems={props.cart.cartItems}
            subTotal={props.subTotal}
            shippingTotal={props.shippingTotal}
            total={props.total}
            doGoBackToCart={() => this.setState({ showOrderConfirm: false })}
            submitOrderForm={this.submitOrderForm}
          />
        </Fragment>
      );
    return (
      <Fragment>
        <ScrollTo />
        <Cart
          formFields={state.formFields}
          updateFormState={this.updateFormState}
          formErrors={state.formErrors}
          submitForm={this.submitForm}
          cartItems={props.cart.cartItems}
          products={props.toShop}
          subTotal={props.subTotal}
          shippingTotal={props.shippingTotal}
          total={props.total}
          deleteCartItem={this.doDeleteCartItem}
          doRenderOrderConfirm={() => this.setState({ showOrderConfirm: true })}
          increaseQuantity={this.increaseQuantity}
          decreaseQuantity={this.decreaseQuantity}
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
        <div className="row">
          <div id="titlebar">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <h2>Cart</h2>

                  <nav id="breadcrumbs">
                    <ul>
                      <li>
                        <Link to="/">Home</Link>
                      </li>
                      <li>
                        <Link to="/shop">Shop</Link>
                      </li>
                      <li>Cart</li>
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
  const subTotal = getSubTotal(state);
  const shippingTotal = getShippingTotal(state);
  const total = currency(subTotal)
    .add(shippingTotal)
    .format();
  return {
    cart: state.cart,
    flashMessage: state.cart.flashMessage,
    subTotal,
    shippingTotal,
    total,
    toShop: state.products.toShop
  };
}

export default {
  component: connect(mapStateToProps)(CartPage)
};
