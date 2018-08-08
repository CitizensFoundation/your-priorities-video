/**
@license
Copyright (c) 2018 Citizens Foundation. All rights reserved. AGPL License.
*/

import { LitElement, html } from '@polymer/lit-element';

import { connect } from 'pwa-helpers/connect-mixin';

// This element is connected to the redux store.
import { store } from '../store.js';
import { removeFromCart } from '../actions/shop.js';

import { videojs } from '../../node_modules/video.js/dist/video.es';
import { RecordRTC } from '../../node_modules/recordrtc/RecordRTC';
import { Record } from 'videojs-record/src/js/videojs.record';
import { YpMediaRecorder} from './yp-media-recorder.js';

class YpVideoRecorder extends YpMediaRecorder {
  _getVideoProps() {
    return {
      controls: true,
      width: 320,
      height: 240,
      fluid: false,
      plugins: {
          record: {
              audio: true,
              video: true,
              maxLength: this.maxLength,
              debug: true
          }
      }
  }
}

window.customElements.define('yp-video-recorder', YpVideoRecorder);
