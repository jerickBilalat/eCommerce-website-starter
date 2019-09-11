import React from 'react';
import { hydrate } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import configureStore from '../common/store/configureStore';
import Routes from '../Routes';

const store = configureStore(window.__PRELOADED_STATE__); // eslint-disable-line

hydrate(
  <Provider store={store}>
    <BrowserRouter>
      <div>{renderRoutes(Routes)}</div>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept('../common/containers/App', () => {
    hydrate(
      <Provider store={store}>
        <BrowserRouter>
          <div>{renderRoutes(Routes)}</div>
        </BrowserRouter>
      </Provider>,
      document.getElementById('root')
    );
  });
}
