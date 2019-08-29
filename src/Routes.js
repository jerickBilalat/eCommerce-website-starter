import ProductListPage from './common/containers/plp';
import PrdouctDetailPage from './common/containers/pdp';
import ShoppingListPage from './common/containers/slp';
import NotFoundPage from './common/containers/NotFoundPage';
import App from './common/containers/App';

export default [
  {
    ...App,
    routes: [
      {
        ...ProductListPage,
        path: '/',
        exact: true
      },
      {
        ...PrdouctDetailPage,
        path: '/product_detail/:id',
        exact: true
      },
      {
        ...ShoppingListPage,
        path: '/shoppinglist',
        exact: true
      },
      {
        ...NotFoundPage
      }
    ]
  }
];
