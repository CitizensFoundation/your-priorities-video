import { createSelector } from 'reselect';

import {
  REQUEST_POINTS, RECEIVE_POINTS, FAIL_POINT,
  ADD_POINT, HAVE_ADDED_POINT, UPDATE_POINT, HAVE_UPDATED_POINT,
  DELETE_POINT, HAVE_DELETED_POINT
} from '../actions/points.js';

export const points = (state = {}, action) => {
  switch (action.type) {
    case REQUEST_POINTS:
      return {
        ...state,
        postId: action.postId,
        failure: false,
        items: null,
        isFetching: true
      };
    case RECEIVE_POINTS:
      return {
        ...state,
        items: action.items,
        failure: false,
        isFetching: false
      };
    case ADD_POINT:
    case DELETE_POINT:
    case UPDATE_POINT:
    case HAVE_DELETED_POINT:
      return {
        ...state,
        failure: false,
        isPosting: true
      };
    case HAVE_ADDED_POINT:
    case HAVE_UPDATED_POINT:
      return {
        ...state,
        item: action.item,
        failure: false,
        isPosting: false
      };
    case FAIL_POINT:
      return {
        ...state,
        failure: true,
        isPosting: false,
        error: action.error
      };
    default:
      return state;
  }
}

const idSelector = state => state.points.id;
const itemsSelector = state => state.points.items;

export const pointsSelector = createSelector(
  idSelector,
  itemsSelector,
  itemSelector,
  (id, items, item) => {
    return items && items[id] || item;
  }
);

export const itemsSelector = state => state.points && state.points.items;

export const itemListSelector = createSelector(
  itemsSelector,
  (items) => {
    return items ? Object.keys(items).map(key => items[key]) : [{},{},{},{},{}];
  }
);