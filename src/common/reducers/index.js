import { combineReducers } from 'redux';
import products from './productReducer';
import shopList from './shopListReducer';
import cart from './cartReducer';

const rootReducer = combineReducers({
  products,
  cart,
  shopList
});

export default rootReducer;
