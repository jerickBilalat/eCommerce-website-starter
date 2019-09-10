import HomePage from './common/containers/homepage';
import ProductListPage from './common/containers/plp';
import PrdouctDetailPage from './common/containers/pdp';
import ShoppingListPage from './common/containers/slp';
import CartPage from './common/containers/cartPage';
import NotFoundPage from './common/containers/NotFoundPage';
import App from './common/containers/App';

export default [
  {
    ...App,
    routes: [
      {
        ...HomePage,
        path: '/',
        exact: true
      },
      {
        ...ProductListPage,
        path: '/shop',
        exact: true
      },
      {
        ...PrdouctDetailPage,
        path: '/product_detail/:id',
        exact: true
      },
      {
        ...ShoppingListPage,
        path: '/shop_list',
        exact: true
      },
      {
        ...CartPage,
        path: '/cart',
        exact: true
      },
      {
        ...NotFoundPage
      }
    ]
  }
];
