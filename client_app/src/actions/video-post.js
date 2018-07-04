/**
@license
Copyright (c) 2018 Citizens Foundation Iceland. All rights reserved. AGPL license.
*/

export const REQUEST_POST = 'REQUEST_POST';
export const RECEIVE_POST = 'RECEIVE_POST';
export const FAIL_POST = 'FAIL_POST';
export const ADD_POST = 'ADD_POST';
export const HAVE_ADDED_POST = 'HAVE_ADDED_POST';
export const UPDATE_POST = 'UPDATE_POST';
export const HAVE_UPDATED_POST = 'HAVE_UPDATED_POST';
export const DELETE_POST = 'DELETE_POST';
export const HAVE_DELETED_POST = 'HAVE_DELETED_POST';

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

export const postPost = (groupId, postData) => (dispatch, getState) => {
  dispatch(addPostRequest());
  const state = getState();
  return fetch(`/api/posts/${groupId}`, { method: 'POST'}) 
    .then(res => res.json())
    .then(data => {
      if (data.error) {
        dispatch(failPost(data.error));
      } else {
        dispatch(haveAddedPost(data.id, data));
      }
    })
    .catch((e) => {
      console.error(e);
      dispatch(failPost())
    });
};

export const updatePost = (postData) => (dispatch, getState) => {
  dispatch(updatePostRequest());
  const state = getState();
  return fetch(`/api/posts/${postData.id}`, { method: 'PUT'}) 
    .then(res => res.json())
    .then(data => {
      if (data.error) {
        dispatch(failPost(data.error));
      } else {
        dispatch(haveUpdatedPost(postData.id, data));
      }
    })
    .catch((e) => {
      console.error(e);
      dispatch(failPost())
    });
};

export const deletePost = (postData) => (dispatch, getState) => {
  dispatch(deletePostRequests());
  const state = getState();
  return fetch(`/api/posts/${postData.id}`, { method: 'DELETE'}) 
    .then(res => res.json())
    .then(data => {
      if (data.error) {
        dispatch(failPost(data.error));
      } else {
        dispatch(haveDeletedPost(postData.id));
      }
    })
    .catch((e) => {
      console.error(e);
      dispatch(failPost())
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

const addPostRequest = (postData) => {
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

const updatePostRequest = (postData) => {
  return {
    type: UPDATE_POST,
    postData
  };
};

const haveUpdatedPost = (id) => {
  return {
    type: HAVE_UPDATED_POST,
    id
  };
};

const deletePostRequest = (postData) => {
  return {
    type: DELETE_POST,
    postData
  };
};

const haveDeletedPost = (id) => {
  return {
    type: HAVE_DELETED_POST,
    id
  };
};
