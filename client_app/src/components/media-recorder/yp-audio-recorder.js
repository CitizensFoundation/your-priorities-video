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
import { YpMediaRecorder} from './yp-media-recorder';

class YpAudioRecorder extends YpMediaRecorder {
  _getVideoProps() {
    return {
      controls: true,
      width: 600,
      height: 300,
      fluid: false,
      plugins: {
          wavesurfer: {
              src: "live",
              waveColor: "#36393b",
              progressColor: "black",
              debug: true,
              cursorWidth: 1,
              msDisplayMax: 20,
              hideScrollbar: true
          },
          record: {
              audio: true,
              video: false,
              maxLength: 15,
              debug: true
          }
        }
      }
  }
}

window.customElements.define('yp-audio-recorder', YpVideoRecorder);
