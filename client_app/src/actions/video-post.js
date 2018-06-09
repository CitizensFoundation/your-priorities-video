/**
@license
Copyright (c) 2018 Citizens Foundation Iceland. All rights reserved. AGPL license.
*/

export const REQUEST_POST = 'REQUEST_POST';
export const RECEIVE_POST = 'RECEIVE_POST';
export const FAIL_POST = 'FAIL_POST';

export const fetchPost = (id) => (dispatch, getState) => {
  dispatch(requestPost(id));
  const state = getState();
  const post = state.posts && state.posts.items && state.posts.items[id];
  if (post) {
    // post found in state.posts.items or state.favorites.items
    dispatch(receivePost(id));
    // let the calling code know there's nothing to wait for.
    return Promise.resolve();
  } else {
    // fetch post data given the post id.
    // also return a promise to wait for.
    return fetch(`/api/posts/${id}`)
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          dispatch(failPost(id));
        } else {
          dispatch(receivePost(id, data));
        }
      })
      .catch((e) => dispatch(failPost(id)));
  }
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

const failPost = (id) => {
  return {
    type: FAIL_POST,
    id
  };
};
