/**
@license
Copyright (c) 2018 Citizens Foundation Iceland. All rights reserved. AGPL license.
*/

export const REQUEST_POINTS = 'REQUEST_POINTS';
export const RECEIVE_POINTS = 'RECEIVE_POINTS';
export const FAIL_REQUEST_POINTS = 'FAIL_REQUEST_POINTS';
export const ADD_POINT = 'ADD_POINT';
export const HAVE_ADDED_POINT = 'HAVE_ADDED_POINT';
export const FAIL_ADD_POINT = 'FAIL_ADD_POINT';

export const fetchPoints = (postId) => (dispatch, getState) => {
  dispatch(requestPoints(postId));
  const state = getState();
  const points = state.points && state.points.post_id == postId ? state.points : null;
  if (points) {
    dispatch(receivePoint(postId));
    return Promise.resolve();
  } else {
    return fetch(`/api/post/${postId}/points`)
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          dispatch(failRequestPoints(postId));
        } else {
          dispatch(receivePoints(postId, data));
        }
      })
      .catch((e) => {
        console.error(e);
        dispatch(failRequestPoint(postId))
      });
  }
};

export const postPoint = (pointData) => (dispatch, getState) => {
  dispatch(addPoint());
  const state = getState();
  return fetch(`/api/points/${id}`)
    .then(res => res.json())
    .then(data => {
      if (data.error) {
        dispatch(failAddPoint(data.error));
      } else {
        dispatch(haveAddedPoint(id, data));
      }
    })
    .catch((e) => {
      console.error(e);
      dispatch(failAddPoint())
    });
};

const requestPoint = (id) => {
  return {
    type: REQUEST_POINTS,
    id
  };
};

const receivePoint = (id, item) => {
  return {
    type: RECEIVE_POINTS,
    id,
    item
  };
};

const failPoint = (id, error) => {
  return {
    type: FAIL_REQUEST_POINTS,
    id,
    error
  };
};

const addPoint = (pointData) => {
  return {
    type: ADD_POINT,
    pointData
  };
};

const haveAddedPoint = (id, item) => {
  return {
    type: HAVE_ADDED_POINT,
    id,
    item
  };
};

const failAddPoint = (id, error) => {
  return {
    type: FAIL_ADD_POINT,
    id,
    error
  };
};
