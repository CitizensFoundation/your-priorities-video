import { createSelector } from 'reselect';

import {
  REQUEST_POINTS, RECEIVE_POINTS, FAIL_REQUEST_POINTS,
  ADD_POINT, HAVE_ADDED_POINT, FAIL_ADD_POINT
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
    case FAIL_REQUEST_POINTS:
      return {
        ...state,
        failure: true,
        isFetching: false,
        error: action.error
      };
    case ADD_POINT:
      return {
        ...state,
        failure: false,
        isPosting: true
      };
    case HAVE_ADDED_POINT:
      return {
        ...state,
        item: action.item,
        failure: false,
        isPosting: false
      };
    case FAIL_ADD_POINT:
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

export const itemsSelector = state => state.pointss && state.points.items;

export const itemListSelector = createSelector(
  itemsSelector,
  (items) => {
    return items ? Object.keys(items).map(key => items[key]) : [{},{},{},{},{}];
  }
);