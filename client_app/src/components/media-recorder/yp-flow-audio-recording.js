/**
@license
Copyright (c) 2018 Citizens Foundation. All rights reserved. AGPL License.
*/

import { YpFlow } from 'yp-flow';

import 'helium-animated-pages/helium-animated-pages';
import './yp-audio-recorder';

class YpFlowAudioRecording extends YpFlow {

  constructor() {
    this._stateFlowName = "audioRecordingFlow";
    super();
  }

  _render({_stageName}) {
    return html`
        <helium-animated-pages id="stages" attrForSelected="name" selected="${_stageName}">
          <yp-audio-preview name="audio-preview"></yp-audio-preview>
          <yp-audio-recorder name="audio-recorder"></yp-audio-recorder>
          <yp-audio-postview name="audio-postview"></yp-audio-postview>
          <yp-edit-story-details name="edit-story-details"></yp-edit-story-details>
        </helium-animated-pages>
      `
  }
}

window.customElements.define('yp-flow-audio-recording', YpFlowAudioRecording);
