/**
@license
Copyright (c) 2018 Citizens Foundation Iceland. All rights reserved. AGPL license.
*/

export const REQUEST_POST = 'REQUEST_POST';
export const RECEIVE_POST = 'RECEIVE_POST';
export const FAIL_POST = 'FAIL_POST';
export const ADD_POST = 'ADD_POST';
export const HAVE_ADDED_POST = 'HAVE_ADDED_POST';
export const FAIL_ADD_POST = 'FAIL_ADD_POST';

export const fetchPost = (id) => (dispatch, getState) => {
  dispatch(requestPost(id));
  const state = getState();
  const post = state.post && state.post.id === id ? state.post : null;
  if (post) {
    dispatch(receivePost(id));
    return Promise.resolve();
  } else {
    return fetch(`/api/posts/${id}`)
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          dispatch(failPost(id));
        } else {
          dispatch(receivePost(id, data));
        }
      })
      .catch((e) => {
        console.error(e);
        dispatch(failPost(id))
      });
  }
};

export const postPost = (postData) => (dispatch, getState) => {
  dispatch(addPost());
  const state = getState();
  return fetch(`/api/posts/${id}`)
    .then(res => res.json())
    .then(data => {
      if (data.error) {
        dispatch(failAddPost(data.error));
      } else {
        dispatch(haveAddedPost(id, data));
      }
    })
    .catch((e) => {
      console.error(e);
      dispatch(failAddPost())
    });
};

const requestPost = (id) => {
  return {
    type: REQUEST_POST,
    id
  };
};

const receivePost = (id, item) => {
  return {
    type: RECEIVE_POST,
    id,
    item
  };
};

const failPost = (id, error) => {
  return {
    type: FAIL_POST,
    id,
    error
  };
};

const addPost = (postData) => {
  return {
    type: ADD_POST,
    postData
  };
};

const haveAddedPost = (id, item) => {
  return {
    type: HAVE_ADDED_POST,
    id,
    item
  };
};

const failAddPost = (id, error) => {
  return {
    type: FAIL_ADD_POST,
    id,
    error
  };
};
