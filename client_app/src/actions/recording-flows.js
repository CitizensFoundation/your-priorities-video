/**
@license
Copyright (c) 2018 Citizens Foundation Iceland. All rights reserved. AGPL license.
*/

export const SET_VIDEO_RECORD = 'SET_VIDEO_RECORD';
export const SET_VIDEO_PREVIEW = 'SET_VIDEO_PREVIEW';
export const SET_VIDEO_POSTVIEW = 'SET_VIDEO_POSTVIEW';

export const SET_AUDIO_RECORD = 'SET_AUDIO_RECORD';
export const SET_AUDIO_PREVIEW = 'SET_AUDIO_PREVIEW';
export const SET_AUDIO_POSTVIEW = 'SET_AUDIO_POSTVIEW';

export const SET_EDIT_POST_DETAIL = 'SET_EDIT_POST_DETAIL';

export const setRecordingVideoFlowToPreview = () => (dispatch) => {
  dispatch(recordingVideoFlowToPreview());
};

export const setRecordingVideoFlowToRecord = () => (dispatch) => {
  dispatch(recordingVideoFlowToRecord());
};

export const setRecordingVideoFlowToPostview = () => (dispatch) => {
  dispatch(recordingVideoFlowToPostview());
};

export const setRecordingAudioFlowToPreview = () => (dispatch) => {
  dispatch(recordingAudioFlowToPreview());
};

export const setRecordingAudioFlowToRecord = () => (dispatch) => {
  dispatch(recordingAudioFlowToRecord());
};

export const setRecordingAudioFlowToPostview = () => (dispatch) => {
  dispatch(recordingAudioFlowToPostview());
};

export const setRecordingVideoFlowEditPostDetail = () => (dispatch) => {
  dispatch(recordingVideoFlowEditPostDetail());
};

const recordingVideoFlowToPreview = () => {
  return {
    type: SET_VIDEO_PREVIEW
  };
};

const recordingVideoFlowToRecord = () => {
  return {
    type: SET_VIDEO_RECORD
  };
};

const recordingVideoFlowToPostview = () => {
  return {
    type: SET_VIDEO_POSTVIEW
  };
};

const recordingVideoFlowToPreview = () => {
  return {
    type: SET_AUDIO_PREVIEW
  };
};

const recordingVideoFlowToRecord = () => {
  return {
    type: SET_AUDIO_RECORD
  };
};

const recordingVideoFlowToPostview = () => {
  return {
    type: SET_AUDIO_POSTVIEW
  };
};

const recordingVideoFlowEditPostDetail = () => {
  return {
    type: SET_EDIT_POST_DETAIL
  };
};

