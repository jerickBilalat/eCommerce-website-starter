import {
  GET_PRODUCTS_TO_SHOP,
  ADD_PRODUCT,
  CLEAR_PRODUCT,
  GET_PRODUCT_DETAIL,
  CLEAR_PRODUCT_DETAIL,
  FETCH_PRODUCTS_FAILED,
  FETCH_PRODUCTS_SUCCEEDED,
  FETCH_PRODUCTS_STARTED,
  FLASH_MESSAGE
} from '../actions/types';

const initialState = { toShop: [], prodDetail: null };

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_PRODUCTS_STARTED:
      return {
        ...state,
        isLoading: true
      };
    case FETCH_PRODUCTS_SUCCEEDED:
      return {
        ...state,
        toShop: action.payload.products,
        toShopSize: action.payload.size,
        isLoading: false
      };
    case FETCH_PRODUCTS_FAILED:
      return {
        ...state,
        error: action.payload.error
      };
    case FLASH_MESSAGE:
      return { ...state, flashMessage: action.payload };
    case GET_PRODUCTS_TO_SHOP:
      return {
        ...state,
        toShop: action.payload.articles,
        toShopSize: action.payload.size
      };
    case ADD_PRODUCT:
      return { ...state, addProduct: action.payload };
    case CLEAR_PRODUCT:
      return { ...state, addProduct: action.payload };
    case GET_PRODUCT_DETAIL:
      return { ...state, prodDetail: action.payload };
    case CLEAR_PRODUCT_DETAIL:
      return { ...state, prodDetail: action.payload };
    default:
      return state;
  }
}
