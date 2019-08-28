import { combineReducers } from 'redux';
import products from './productReducer';
import shopList from './shopListReducer';

const rootReducer = combineReducers({
  products,
  shopList
});

export default rootReducer;
