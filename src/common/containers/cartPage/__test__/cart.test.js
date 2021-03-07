import '@testing-library/jest-dom';
import { render as rtlRender, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import * as React from 'react';
import Cart from '../cart';

describe('Cart', () => {
  // arrange
  const cartItems = [
    {
      id: '5e55781771992d0017bb41cd',
      name: 'American classic',
      price: '1499',
      quantity: 1,
      value: '1,499.00'
    }
  ];
  const formFields = {
    name: '',
    email: '',
    phone: '',
    message: ''
  };
  const formErrors = {
    name: '',
    email: '',
    phone: '',
    message: ''
  };
  const updateFormState = () => {};

  it('display cart items', () => {
    const props = { cartItems, formFields, formErrors, updateFormState };
    const { getAllByText } = rtlRender(
      <BrowserRouter>
        <Cart {...props} />
      </BrowserRouter>
    );
    const elements = getAllByText(/american classic/i);
    // assert
    expect(elements[0]).toBeInTheDocument();
  });
  it('display cart totals information', () => {
    // arrange
    const props = {
      cartItems,
      formFields,
      formErrors,
      updateFormState,
      subTotal: '56',
      total: '89',
      shippingTotal: '87'
    };
    const { getByText } = rtlRender(
      <BrowserRouter>
        <Cart {...props} />
      </BrowserRouter>
    );
    // assert
    expect(getByText(/56/i)).toBeInTheDocument();
    expect(getByText(/89/i)).toBeInTheDocument();
    expect(getByText(/87/i)).toBeInTheDocument();
  });
  it('display message when on items in cart', () => {
    // arrange
    const props = { cartItems: [], formFields, formErrors, updateFormState };
    const { getAllByText } = rtlRender(
      <BrowserRouter>
        <Cart {...props} />
      </BrowserRouter>
    );
    // assert
    const elements = getAllByText(/no items in cart/i);
    expect(elements[0]).toBeInTheDocument();
  });
  it('submits customer information form', () => {
    const props = { cartItems, formFields, formErrors, updateFormState, submitForm: jest.fn() };
    const { getByText } = rtlRender(
      <BrowserRouter>
        <Cart {...props} />
      </BrowserRouter>
    );
    const confirmButton = getByText(/confirm orders/i);
    fireEvent.click(confirmButton);
    expect(props.submitForm).toHaveBeenCalled();
  });
});
