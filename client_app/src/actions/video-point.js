/**
@license
Copyright (c) 2018 Citizens Foundation Iceland. All rights reserved. AGPL license.
*/

export const REQUEST_POINTS = 'REQUEST_POINTS';
export const RECEIVE_POINTS = 'RECEIVE_POINTS';
export const ADD_POINT = 'ADD_POINT';
export const HAVE_ADDED_POINT = 'HAVE_ADDED_POINT';
export const DELETE_POINT = 'DELETE_POINT';
export const HAVE_DELETED_POINT = 'HAVE_DELETED_POINT';
export const UPDATE_POINT = 'UPDATE_POINT';
export const HAVE_UPDATED_POINT = 'HAVE_UPDATED_POINT';
export const FAIL_POINT = 'FAIL_POINT';

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
          dispatch(failPoint(postId));
        } else {
          dispatch(receivePoints(postId, data));
        }
      })
      .catch((e) => {
        console.error(e);
        dispatch(failPoint(postId))
      });
  }
};

export const addPoint = (postId, pointData) => (dispatch, getState) => {
  dispatch(addPointRequest());
  const state = getState();
  return fetch(`/api/points/${postId}`, { method: 'POST' })
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

export const deletePoint = (pointData) => (dispatch, getState) => {
  dispatch(deletePointRequest());
  const state = getState();
  return fetch(`/api/points/${pointData.id}`, { method: 'DELETE' })
    .then(res => res.json())
    .then(data => {
      if (data.error) {
        dispatch(failPoint(data.error));
      } else {
        dispatch(haveDeletedPoint(id));
      }
    })
    .catch((e) => {
      console.error(e);
      dispatch(failPoint())
    });
};

export const updatePoint = (pointData) => (dispatch, getState) => {
  dispatch(updatePointRequest());
  const state = getState();
  return fetch(`/api/points/${pointData.id}`, { method: 'PUT' })
    .then(res => res.json())
    .then(data => {
      if (data.error) {
        dispatch(failPoint(data.error));
      } else {
        dispatch(haveUpdatedPoint(pointData.id, data));
      }
    })
    .catch((e) => {
      console.error(e);
      dispatch(failPoint())
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

const addPointRequest = (pointData) => {
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

const failPoint = (id, error) => {
  return {
    type: FAIL_POINT,
    id,
    error
  };
};

const deletePointRequest = (pointData) => {
  return {
    type: DELETE_POINT,
    pointData
  };
};

const haveDeletedPoint = (id) => {
  return {
    type: HAVE_DELETED_POINT,
    id
  };
};

const updatePointRequest = (pointData) => {
  return {
    type: UPDATE_POINT,
    pointData
  };
};

const haveUpdatedPoint = (id, item) => {
  return {
    type: HAVE_UPDATED_POINT,
    id,
    item
  };
};
