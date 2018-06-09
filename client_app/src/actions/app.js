/**
@license
Copyright (c) 2018 Citizens Fondation Iceland. All rights reserved. AGPL License.
*/

export const UPDATE_PAGE = 'UPDATE_PAGE';
export const RECEIVE_LAZY_RESOURCES = 'RECEIVE_LAZY_RESOURCES';
export const UPDATE_OFFLINE = 'UPDATE_OFFLINE';
export const UPDATE_WIDE_LAYOUT = 'UPDATE_WIDE_LAYOUT';
export const UPDATE_DRAWER_STATE = 'UPDATE_DRAWER_STATE';
export const OPEN_SNACKBAR = 'OPEN_SNACKBAR';
export const CLOSE_SNACKBAR = 'CLOSE_SNACKBAR';
export const UPDATE_SUBTITLE = 'UPDATE_SUBTITLE';

export const navigate = (location) => (dispatch) => {
  const pathname = location.pathname;
  const parts = pathname.slice(1).split('/');
  const page = parts[0] || 'home';
  // post id is in the path: /video-post/{postId}
  const postId = parts[1];
  // query is extracted from the search string: /explore?q={query}
  const match = RegExp('[?&]q=([^&]*)').exec(location.search);
  const query = match && decodeURIComponent(match[1].replace(/\+/g, ' '))

  dispatch(loadPage(page, query, postId));
};

const loadPage = (page, query, postId) => async (dispatch, getState) => {
  let module;
  switch(page) {
    case 'home':
      break;
    case 'video-post':
      module = await import('../components/yp-video-post.js');
      await dispatch(module.fetchPost(postId));

      if (isFetchPostFailed(getState().post)) {
        page = '404';
      }
      break;
    case 'video-recorder':
      module = await import('../components/yp-video-recorder.js');
      dispatch(updateSubTitle('Recorder'));
      break;
    default:
      // Nothing matches, set page to '404'.
      page = '404';
  }

  if (page === '404') {
    import('../components/post-404.js');
  }

  dispatch(updatePage(page));

  const lazyLoadComplete = getState().app.lazyResourcesLoaded;
  // load lazy resources after render and set `lazyLoadComplete` when done.
  if (!lazyLoadComplete) {
    requestAnimationFrame(async () => {
      await import('../components/lazy-resources.js');
      dispatch({
        type: RECEIVE_LAZY_RESOURCES
      });
    });
  }
}

export const refreshPage = () => (dispatch, getState) => {
  const state = getState();
  // load page using the current state
  dispatch(loadPage(state.app.page, state.posts && state.posts.query, state.post && state.post.id));
}

const updatePage = (page) => {
  return {
    type: UPDATE_PAGE,
    page
  };
}

const isFetchPostFailed = (post) => {
  return !post.isFetching && post.failure;
}

let snackbarTimer;

export const showSnackbar = () => (dispatch) => {
  dispatch({
    type: OPEN_SNACKBAR
  });
  clearTimeout(snackbarTimer);
  snackbarTimer = setTimeout(() =>
    dispatch({ type: CLOSE_SNACKBAR }), 3000);
};

export const updateOffline = (offline) => (dispatch, getState) => {
  const prev = getState().app.offline;
  dispatch({
    type: UPDATE_OFFLINE,
    offline
  });
  if (prev !== undefined) {
    dispatch(showSnackbar());
  }
  //  automatically refresh when you come back online (offline was true and now is false)
  if (prev === true && offline === false) {
    dispatch(refreshPage());
  }
};

export const updateLayout = (wide) => (dispatch, getState) => {
  dispatch({
    type: UPDATE_WIDE_LAYOUT,
    wide
  });
  if (getState().app.drawerOpened) {
    dispatch(updateDrawerState(false));
  }
}

export const updateDrawerState = (opened) => (dispatch, getState) => {
  if (getState().app.drawerOpened !== opened) {
    dispatch({
      type: UPDATE_DRAWER_STATE,
      opened
    });
  }
}

export const updateSubTitle = (subTitle) => {
  return {
    type: UPDATE_SUBTITLE,
    subTitle
  }
}

export const updateLocationURL = (url) => (dispatch) => {
  window.history.pushState({}, '', url);
  dispatch(navigate(window.location));
}