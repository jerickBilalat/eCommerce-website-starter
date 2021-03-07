/* eslint-disable one-var */
import '@testing-library/jest-dom';
import { render as rtlRender, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import * as React from 'react';
import CartCard from '../cartCard';

describe('Cart Card component', () => {
  const name = 'prodName',
    price = '999',
    value = '1000';
  it('renders all informantion about the product', () => {
    const props = { name, price, value };

    const { getAllByText } = rtlRender(
      <BrowserRouter>
        <CartCard {...props} />
      </BrowserRouter>
    );

    expect(getAllByText(/prodName/i)[0]).toBeInTheDocument();
    expect(getAllByText(/999/i)[0]).toBeInTheDocument();
    expect(getAllByText(/1000/i)[0]).toBeInTheDocument();
  });
  it('deletes card', () => {
    const props = { id: 'fakeId', name, price, value, deleteCartItem: jest.fn() };

    const { getByTestId } = rtlRender(
      <BrowserRouter>
        <CartCard {...props} />
      </BrowserRouter>
    );
    const deleteButton = getByTestId('deletebutton');
    fireEvent.click(deleteButton);

    expect(props.deleteCartItem).toHaveBeenCalledWith(props.id);
  });
  it('increases quantity when add button is pressed', () => {
    const props = { id: 'fakeId', name, price, value, increaseQuantity: jest.fn() };

    const { getByTestId } = rtlRender(
      <BrowserRouter>
        <CartCard {...props} />
      </BrowserRouter>
    );
    const addQuantityButton = getByTestId('addQuantity');
    fireEvent.click(addQuantityButton);

    expect(props.increaseQuantity).toHaveBeenCalledWith(
      { id: props.id, name: props.name, price },
      1
    );
  });
  it('decreases quantity when delete button is pressed', () => {
    const props = { id: 'fakeId', name, price, value, decreaseQuantity: jest.fn() };

    const { getByTestId } = rtlRender(
      <BrowserRouter>
        <CartCard {...props} />
      </BrowserRouter>
    );
    const decreaseQuantity = getByTestId('decreaseQuantity');
    fireEvent.click(decreaseQuantity);

    expect(props.decreaseQuantity).toHaveBeenCalledWith(
      { id: props.id, name: props.name, price },
      -1
    );
  });
});
