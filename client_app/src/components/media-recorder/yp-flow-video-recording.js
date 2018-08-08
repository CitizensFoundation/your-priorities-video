/**
@license
Copyright (c) 2018 Citizens Foundation. All rights reserved. AGPL License.
*/

import 'helium-animated-pages/helium-animated-pages';

import { connect } from 'pwa-helpers/connect-mixin';

// This element is connected to the redux store.
import { store } from '../store.js';

import { PageViewElement } from './page-view-element.js';

class YpFlowVideoRecording extends connect(store)(PageViewElement) {
  
  static get properties() { return {
    _stageName: String
  }}

  constructor() {
    super();
  }

  _render({_stageName}) {
    return html`
        <helium-animated-pages id="stages" attrForSelected="name" selected="${_stageName}">
          <yp-video-preview name="video-preview"></yp-video-preview>
          <yp-video-recorder name="video-recorder"></yp-video-recorder>
          <yp-video-postview name="video-postview"></yp-video-postview>
          <yp-edit-story-details name="edit-story-details"></yp-edit-story-details>
        </helium-animated-pages>
      `
  }

  _stateChanged(state) {
    if (this._stageName!=state.videoRecordingFlow.stageName) {
      this._stageName = state.videoRecordingFlow.stageName
    }
  }
}

window.customElements.define('yp-flow-video-recorder', YpFlowVideoRecording);
