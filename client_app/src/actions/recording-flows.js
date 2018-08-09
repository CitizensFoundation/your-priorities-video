/**
@license
Copyright (c) 2018 Citizens Foundation Iceland. All rights reserved. AGPL license.
*/

export const SET_VIDEO_RECORD = 'SET_VIDEO_RECORD';
export const SET_VIDEO_PREVIEW = 'SET_VIDEO_PREVIEW';
export const SET_VIDEO_POSTVIEW = 'SET_VIDEO_POSTVIEW';
export const SET_VIDEO_EDIT_POST_DETAIL = 'SET_VIDEO_EDIT_POST_DETAIL';
export const SET_VIDEO_UPLOAD = 'SET_VIDEO_UPLOAD';
export const SET_VIDEO_FLOW_COMPLETED = 'SET_VIDEO_FLOW_COMPLETED';

export const SET_AUDIO_RECORD = 'SET_AUDIO_RECORD';
export const SET_AUDIO_PREVIEW = 'SET_AUDIO_PREVIEW';
export const SET_AUDIO_POSTVIEW = 'SET_AUDIO_POSTVIEW';
export const SET_AUDIO_EDIT_POST_DETAIL = 'SET_AUDIO_EDIT_POST_DETAIL';
export const SET_AUDIO_UPLOAD = 'SET_AUDIO_UPLOAD';
export const SET_AUDIO_FLOW_COMPLETED = 'SET_AUDIO_FLOW_COMPLETED';

export const setRecordingVideoFlowToPreview = () => (dispatch) => {
  dispatch(recordingVideoFlowToPreview());
};

export const setRecordingVideoFlowToRecord = () => (dispatch) => {
  dispatch(recordingVideoFlowToRecord());
};

export const setRecordingVideoFlowToPostview = () => (dispatch) => {
  dispatch(recordingVideoFlowToPostview());
};

export const setRecordingVideoFlowEditPostDetail = () => (dispatch) => {
  dispatch(recordingVideoFlowEditPostDetail());
};

export const setRecordingVideoFlowUpload = () => (dispatch) => {
  dispatch(recordingVideoFlowUpload());
};

export const setRecordingVideoFlowCompleted= () => (dispatch) => {
  dispatch(recordingVideoFlowCompleted());
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

export const setRecordingAudioFlowEditPostDetail = () => (dispatch) => {
  dispatch(recordingAudioFlowEditPostDetail());
};

export const setRecordingAudioFlowUpload = () => (dispatch) => {
  dispatch(recordingAudioFlowUpload());
};

export const setRecordingAudioFlowCompleted= () => (dispatch) => {
  dispatch(recordingAudioFlowCompleted());
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

const recordingVideoFlowEditPostDetail = () => {
  return {
    type: SET_VIDEO_EDIT_POST_DETAIL
  };
};

const recordingVideoFlowUpload = () => {
  return {
    type: SET_VIDEO_UPLOAD
  };
};

const recordingVideoFlowCompleted = () => {
  return {
    type: SET_VIDEO_FLOW_COMPLETED
  };
};

const recordingAudioFlowToPreview = () => {
  return {
    type: SET_AUDIO_PREVIEW
  };
};

const recordingAudioFlowToRecord = () => {
  return {
    type: SET_AUDIO_RECORD
  };
};

const recordingAudioFlowToPostview = () => {
  return {
    type: SET_AUDIO_POSTVIEW
  };
};

const recordingAudioFlowEditPostDetail = () => {
  return {
    type: SET_AUDIO_EDIT_POST_DETAIL
  };
};

const recordingAudioFlowUpload = () => {
  return {
    type: SET_AUDIO_UPLOAD
  };
};

const recordingAudioFlowCompleted = () => {
  return {
    type: SET_AUDIO_FLOW_COMPLETED
  };
};
