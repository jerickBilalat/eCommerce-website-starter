import { matchRoutes } from 'react-router-config';
import express from 'express';
import Routes from '../Routes';
import createStore from '../common/store/configureStore';
import renderHTML from '../utils/renderHTML';

const server = express();

server
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .get('*', (req, res) => {
    const productID = req.params[0].split('/')[2];

    const store = createStore();

    const branch = matchRoutes(Routes, req.path);

    const routesPromises = branch
      .map(({ route }) => {
        return route.loadData ? route.loadData(store, productID) : null;
      })
      .map(promise => {
        if (promise) {
          const wrappedPromise = new Promise((resolve, reject) => {
            promise.then(resolve).catch(resolve);
          });
          return wrappedPromise;
        }
        return null;
      });

    // resolve all route promises to finish building the preloaded application state
    Promise.all(routesPromises).then(() => {
      const context = {};
      // pass final preloaded application state as the store for the HTML markup
      const content = renderHTML(req, store, context);

      if (context.notFound) {
        res.status(404);
      }

      res.send(content);
    });
  });

export default server;
