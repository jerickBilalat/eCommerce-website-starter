import currency from 'currency.js';
import { MODIFY_SHOPLIST_SUCCEEDED, FLASH_MESSAGE } from '../actions/types';

const initialState = {
  listItems: [],
  isLoading: false,
  error: null,
  flashMessage: ''
};

export default function(state = initialState, action) {
  switch (action.type) {
    case MODIFY_SHOPLIST_SUCCEEDED:
      return {
        ...state,
        listItems: action.payload
      };
    case 'MODIFY_ITEM_QNTY': {
      const listItemIds = state.listItems.map(item => item.id);
      const updatedListItems = state.listItems.map(item => item);
      if (listItemIds.includes(action.payload.id)) {
        const itemIndex = state.listItems.map(item => item.id).indexOf(action.payload.id);
        updatedListItems.splice(itemIndex, 1, action.payload);
      } else {
        updatedListItems.push(action.payload);
      }

      return {
        ...state,
        listItems: updatedListItems
      };
    }
    case 'DELETE_ITEM':
      return {
        ...state,
        listItems: state.listItems.filter(item => item.id !== action.payload)
      };

    case FLASH_MESSAGE:
      return { ...state, flashMessage: action.payload };
    default:
      return state;
  }
}

// Selectors
const reducer = function reduceListItemPrices(accumulator, currentValue) {
  const value = currency(accumulator).add(currentValue);
  return value.format();
};
export function getSubTotal(state) {
  return state.shopList.listItems.map(item => item.value.toString()).reduce(reducer, '0');
}

export function getShippingTotal(state) {
  return '0';
}

export function getTotal() {}
