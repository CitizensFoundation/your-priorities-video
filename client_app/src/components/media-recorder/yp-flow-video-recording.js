/**
@license
Copyright (c) 2018 Citizens Foundation. All rights reserved. AGPL License.
*/

import { YpFlow } from 'yp-flow'
import 'helium-animated-pages/helium-animated-pages';

import './yp-video-recorder';

class YpFlowVideoRecording extends YpFlow {

  constructor() {
    this._stateFlowName = "videoRecordingFlow";
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
}

window.customElements.define('yp-flow-video-recording', YpFlowVideoRecording);
