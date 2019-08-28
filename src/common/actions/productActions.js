import * as api from '../api';
import {
  GET_PRODUCT_DETAIL,
  CLEAR_PRODUCT_DETAIL,
  FETCH_PRODUCTS_FAILED,
  FETCH_PRODUCTS_SUCCEEDED,
  FETCH_PRODUCTS_STARTED
} from './types';

function fetchProductsSucceeded(data) {
  return {
    type: FETCH_PRODUCTS_SUCCEEDED,
    payload: {
      products: data.articles,
      size: data.size
    }
  };
}

function fetchProductsFailed(error) {
  return {
    type: FETCH_PRODUCTS_FAILED,
    payload: {
      error
    }
  };
}

function fetchProductsStarted() {
  return {
    type: FETCH_PRODUCTS_STARTED
  };
}

export function fetchProducts(skip = 0, limit = 3, filters = [], prevState = []) {
  return dispatch => {
    dispatch(fetchProductsStarted());

    return api
      .fetchProducts({ skip, limit, filters })
      .then(resp => {
        const data = {
          articles: [...prevState, ...resp.data.articles],
          size: resp.data.size
        };
        return dispatch(fetchProductsSucceeded(data));
      })
      .catch(err => {
        return dispatch(fetchProductsFailed(err.message));
      });
  };
}

export function getProductDetail(id) {
  return dispatch => {
    return api.fetchSingleFilteredProduct(id).then(res => {
      const product = res.data[0];
      return dispatch({
        type: GET_PRODUCT_DETAIL,
        payload: product
      });
    });
  };
}
export function clearProductDetail() {
  return {
    type: CLEAR_PRODUCT_DETAIL,
    payload: ''
  };
}
