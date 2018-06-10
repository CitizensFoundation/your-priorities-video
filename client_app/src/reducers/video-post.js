import { createSelector } from 'reselect';

import {
  REQUEST_POST, RECEIVE_POST, FAIL_POST
} from '../actions/post.js';

export const post = (state = {}, action) => {
  switch (action.type) {
    case REQUEST_POST:
      return {
        ...state,
        id: action.id,
        failure: false,
        isFetching: true
      };
    case RECEIVE_POST:
      return {
        ...state,
        item: action.item,
        failure: false,
        isFetching: false
      };
    case FAIL_POST:
      return {
        ...state,
        failure: true,
        isFetching: false
      };
    default:
      return state;
  }
}

const idSelector = state => state.post.id;
const itemSelector = state => state.post.item;

export const postSelector = createSelector(
  idSelector,
  itemsSelector,
  itemSelector,
  (id, items, item) => {
    return items && items[id] || item;
  }
);

export const itemsSelector = state => state.posts && state.posts.items;

export const itemListSelector = createSelector(
  itemsSelector,
  (items) => {
    return items ? Object.keys(items).map(key => items[key]) : [{},{},{},{},{}];
  }
);