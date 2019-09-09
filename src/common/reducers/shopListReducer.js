import {
  MODIFY_SHOPLIST_SUCCEEDED,
  FLASH_MESSAGE,
  DELETE_SHOPLIST_ITEM,
  ADD_ITEM_TO_SHOPLIST
} from '../actions/types';

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
    case ADD_ITEM_TO_SHOPLIST: {
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
    case DELETE_SHOPLIST_ITEM:
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
