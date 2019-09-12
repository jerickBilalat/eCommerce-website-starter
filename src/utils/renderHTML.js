import React from 'react';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { renderToString } from 'react-dom/server';
import serialize from 'serialize-javascript';
import Routes from '../Routes';

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST); // eslint-disable-line

export default function(req, store, context) {
  const contentMarkup = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.path} context={context}>
        <div>{renderRoutes(Routes)}</div>
      </StaticRouter>
    </Provider>
  );

  const finalState = store.getState();

  return `<!doctype html>
    <html lang="">
      <head>
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta charSet='utf-8' />
          <title>eCommerce Website Starter</title>
          <meta name="viewport" content="width=device-width, initial-scale=1">
          ${assets.client.css ? `<link rel="stylesheet" href="${assets.client.css}">` : ''}
            ${
              process.env.NODE_ENV === 'production'
                ? `<script src="${assets.client.js}" defer></script>`
                : `<script src="${assets.client.js}" defer crossorigin></script>`
            }
      </head>
      <body>
          <div id="root">${contentMarkup}</div>
          <script>
            window.__PRELOADED_STATE__ = ${serialize(finalState)}
          </script>
      </body>
    </html>`;
}
