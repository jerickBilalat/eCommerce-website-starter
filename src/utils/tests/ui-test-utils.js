import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter } from 'react-router-dom';
import thunk from 'redux-thunk';
import { initialStore } from './mockData';
import reducers from '../../common/reducers';

const customRender = (
  ui,
  {
    initialState = initialStore,
    store = createStore(reducers, applyMiddleware(thunk)),
    ...renderOptions
  } = {}
) => {
  const AllTheProviders = ({ children }) => {
    return (
      <Provider store={store}>
        <BrowserRouter>{children}</BrowserRouter>
      </Provider>
    );
  };
  return rtlRender(ui, { wrapper: AllTheProviders, ...renderOptions });
};

export * from '@testing-library/react';

export { customRender };
