/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

import { SET_VIDEO_RECORD, SET_VIDEO_PREVIEW,
         SET_VIDEO_POSTVIEW, SET_VIDEO_EDIT_POST_DETAIL, SET_AUDIO_PREVIEW, SET_AUDIO_RECORD,
         SET_AUDIO_POSTVIEW, SET_AUDIO_EDIT_POST_DETAIL} from '../actions/recording-flows.js';

const app = (state = {}, action) => {
  switch (action.type) {
    case SET_VIDEO_PREVIEW:
    return {
      ...state,
      videoRecordingFlow: { stageName: "video-preview" }
    };
    case SET_VIDEO_RECORD:
      return {
        ...state,
        videoRecordingFlow: { stageName: "video-record" }
      };
    case SET_VIDEO_POSTVIEW:
    return {
      ...state,
      videoRecordingFlow: { stageName: "video-postview" }
    };
    case SET_VIDEO_EDIT_POST_DETAIL:
    return {
      ...state,
      audioRecordingFlow: { stageName: "edit-post-detail" }
    };
    case SET_AUDIO_PREVIEW:
    return {
      ...state,
      audioRecordingFlow: { stageName: "audio-preview" }
    };
    case SET_AUDIO_RECORD:
    return {
      ...state,
      audioRecordingFlow: { stageName: "audio-record" }
    };
    case SET_AUDIO_POSTVIEW:
    return {
      ...state,
      audioRecordingFlow: { stageName: "audio-postview" }
    };
    case SET_AUDIO_EDIT_POST_DETAIL:
    return {
      ...state,
      audioRecordingFlow: { stageName: "edit-post-detail" }
    };
  default:
      return state;
  }
}

export default app;
